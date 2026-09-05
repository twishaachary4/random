const METHODS = ["Bisection", "Newton-Raphson"];
let currentMethod = METHODS[0];

const PARAM_CONFIG = {
  "Bisection": [
    { id: "a", label: "a (lower)", value: "1" },
    { id: "b", label: "b (upper)", value: "2" },
    { id: "tol", label: "tolerance", value: "0.0001" },
    { id: "maxIter", label: "max iterations", value: "30" }
  ],
  "Newton-Raphson": [
    { id: "x0", label: "x₀ (initial guess)", value: "1.5", full: true },
    { id: "tol", label: "tolerance", value: "0.0001" },
    { id: "maxIter", label: "max iterations", value: "30" }
  ]
};

function renderPins() {
  const pins = document.getElementById('methodPins');
  pins.innerHTML = '';
  METHODS.forEach(m => {
    const btn = document.createElement('button');
    btn.className = 'pin' + (m === currentMethod ? ' active' : '');
    btn.textContent = m;
    btn.onclick = () => {
      if (m === currentMethod) return;
      currentMethod = m;
      renderPins();
      renderParams();
      clearOutput();
    };
    pins.appendChild(btn);
  });
}

function renderParams() {
  const grid = document.getElementById('paramGrid');
  grid.innerHTML = '';
  PARAM_CONFIG[currentMethod].forEach(p => {
    const wrap = document.createElement('div');
    wrap.className = 'field' + (p.full ? ' full' : '');
    wrap.innerHTML = `<label>${p.label}</label><input type="text" id="p_${p.id}" value="${p.value}">`;
    grid.appendChild(wrap);
  });
}

function clearOutput() {
  document.getElementById('result').innerHTML = '';
  document.getElementById('tableWrap').innerHTML = '';
}

function getParam(id) {
  return parseFloat(document.getElementById(`p_${id}`).value);
}

function showError(msg) {
  document.getElementById('result').innerHTML = `<div class="error-msg">${msg} 💔</div>`;
  document.getElementById('tableWrap').innerHTML = '';
}

function showResult(root, iterations, converged) {
  const label = converged
    ? `converged in ${iterations} iteration${iterations === 1 ? '' : 's'}`
    : `stopped after ${iterations} iterations (no full convergence)`;
  document.getElementById('result').innerHTML = `
    <div class="root-value">x ≈ ${root.toFixed(6)}</div>
    <div class="root-label">${label} 🎀</div>
  `;
}

function renderTable(rows, headers) {
  const wrap = document.getElementById('tableWrap');
  let html = '<table><thead><tr>';
  headers.forEach(h => html += `<th>${h}</th>`);
  html += '</tr></thead><tbody>';
  rows.forEach((row, i) => {
    const isLast = i === rows.length - 1;
    html += `<tr class="${isLast ? 'final-row' : ''}">`;
    row.forEach(cell => html += `<td>${cell}</td>`);
    html += '</tr>';
  });
  html += '</tbody></table>';
  wrap.innerHTML = html;
}

function solveBisection(fxStr) {
  const f = math.compile(fxStr);
  const a0 = getParam('a');
  const b0 = getParam('b');
  const tol = getParam('tol');
  const maxIter = getParam('maxIter');

  if ([a0, b0, tol, maxIter].some(isNaN)) {
    showError("please fill in all fields with numbers");
    return;
  }

  let a = a0, b = b0;
  const fa0 = f.evaluate({ x: a });
  const fb0 = f.evaluate({ x: b });
  if (fa0 * fb0 > 0) {
    showError("f(a) and f(b) must have opposite signs");
    return;
  }

  const rows = [];
  let c, fc;
  let converged = false;
  let iter = 0;

  for (iter = 1; iter <= maxIter; iter++) {
    c = (a + b) / 2;
    fc = f.evaluate({ x: c });
    const err = Math.abs(b - a) / 2;
    rows.push([iter, a.toFixed(6), b.toFixed(6), c.toFixed(6), fc.toFixed(6), err.toFixed(6)]);

    if (Math.abs(fc) < tol || err < tol) {
      converged = true;
      break;
    }
    const fa = f.evaluate({ x: a });
    if (fa * fc < 0) b = c; else a = c;
  }

  renderTable(rows, ["iter", "a", "b", "c", "f(c)", "error"]);
  showResult(c, iter, converged);
}

function solveNewton(fxStr) {
  const fNode = math.parse(fxStr);
  const f = fNode.compile();
  const fPrimeNode = math.derivative(fNode, 'x');
  const fPrime = fPrimeNode.compile();

  const x0 = getParam('x0');
  const tol = getParam('tol');
  const maxIter = getParam('maxIter');

  if ([x0, tol, maxIter].some(isNaN)) {
    showError("please fill in all fields with numbers");
    return;
  }

  const rows = [];
  let x = x0;
  let converged = false;
  let iter = 0;

  for (iter = 1; iter <= maxIter; iter++) {
    const fx = f.evaluate({ x });
    const fpx = fPrime.evaluate({ x });

    if (Math.abs(fpx) < 1e-12) {
      showError("derivative too close to zero, try a different x₀");
      return;
    }

    const xNext = x - fx / fpx;
    const err = Math.abs(xNext - x);
    rows.push([iter, x.toFixed(6), fx.toFixed(6), fpx.toFixed(6), xNext.toFixed(6), err.toFixed(6)]);

    x = xNext;
    if (err < tol) {
      converged = true;
      break;
    }
  }

  renderTable(rows, ["iter", "xₙ", "f(xₙ)", "f'(xₙ)", "xₙ₊₁", "error"]);
  showResult(x, iter, converged);
}

document.getElementById('solveBtn').addEventListener('click', () => {
  const fxStr = document.getElementById('fx').value.trim();
  if (!fxStr) {
    showError("enter a function first");
    return;
  }
  try {
    if (currentMethod === "Bisection") {
      solveBisection(fxStr);
    } else {
      solveNewton(fxStr);
    }
  } catch (e) {
    showError("couldn't parse that function — check the syntax");
  }
});

renderPins();
renderParams();