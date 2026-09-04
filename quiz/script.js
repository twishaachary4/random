const QUESTIONS = {
  "Numerical Methods": [
    {
      q: "Which method requires two initial guesses that bracket the root and always converges if a valid bracket is chosen?",
      options: ["Newton-Raphson", "Bisection", "Secant", "Gauss-Seidel"],
      correct: 1,
      note: "Bisection halves the bracketing interval each iteration, so it's guaranteed to converge, though slowly, as long as the root is bracketed."
    },
    {
      q: "Newton-Raphson requires which of the following at each step?",
      options: ["Two previous guesses only", "The function's derivative", "A bracketing interval", "A matrix inverse"],
      correct: 1,
      note: "Newton-Raphson uses the tangent line at the current guess, so it needs f'(x) at each step."
    },
    {
      q: "Gauss-Seidel and Jacobi's method are both used to solve what kind of problem?",
      options: ["Single nonlinear equations", "Systems of linear equations", "Differential equations", "Root bracketing"],
      correct: 1,
      note: "Both are iterative methods for solving systems of linear equations, with Gauss-Seidel using updated values immediately within each iteration."
    },
    {
      q: "In LU decomposition, a matrix A is factored into:",
      options: ["A = L + U", "A = LU, lower and upper triangular matrices", "A = L / U", "A = U - L"],
      correct: 1,
      note: "LU decomposition writes A as the product of a lower triangular matrix L and an upper triangular matrix U, which simplifies solving Ax = b."
    },
    {
      q: "Compared to Newton-Raphson, the Secant method's key difference is that it:",
      options: ["Needs the derivative explicitly", "Approximates the derivative using two prior points", "Only works on linear systems", "Always converges in one step"],
      correct: 1,
      note: "The Secant method replaces the derivative with a finite-difference approximation using the two most recent guesses, avoiding the need for an analytic derivative."
    }
  ],
  "AI & Applications": [
    {
      q: "Naïve Bayes classifiers are called 'naïve' because they assume:",
      options: ["All features are equally important", "Features are conditionally independent given the class", "The data is linearly separable", "There is only one class label"],
      correct: 1,
      note: "The 'naïve' assumption is that features contribute independently to the outcome, which rarely holds exactly in practice but works well anyway."
    },
    {
      q: "KNN (K-Nearest Neighbors) classifies a new point based on:",
      options: ["A learned decision boundary equation", "The majority class among its closest neighbors", "Maximizing distance from all points", "A probability distribution over classes"],
      correct: 1,
      note: "KNN looks at the K closest labeled points and assigns the class that appears most often among them."
    },
    {
      q: "Which heuristic search algorithm uses both path cost and estimated distance to the goal?",
      options: ["Breadth-first search", "Depth-first search", "A* search", "Random search"],
      correct: 2,
      note: "A* combines g(n), the cost so far, with h(n), a heuristic estimate to the goal, to guide search efficiently."
    },
    {
      q: "SVM (Support Vector Machine) aims to find a decision boundary that:",
      options: ["Minimizes the number of support vectors", "Maximizes the margin between classes", "Groups points into unlabeled clusters", "Ignores outliers entirely"],
      correct: 1,
      note: "SVM finds the hyperplane that maximizes the margin, the distance to the closest points of each class (the support vectors)."
    },
    {
      q: "Clustering, unlike classification, is typically:",
      options: ["Supervised with labeled data", "Unsupervised, grouping data without predefined labels", "Only usable on numeric text data", "A search algorithm, not a learning method"],
      correct: 1,
      note: "Clustering methods like K-means group similar data points together without using labeled examples."
    }
  ],
  "Python": [
    {
      q: "Which data type in Python is ordered but immutable?",
      options: ["List", "Dictionary", "Tuple", "Set"],
      correct: 2,
      note: "Tuples preserve order like lists but cannot be modified after creation, unlike lists."
    },
    {
      q: "What does NumPy primarily add to Python?",
      options: ["Web scraping tools", "Efficient array operations and numerical computing", "Built-in GUI creation", "Automatic exception handling"],
      correct: 1,
      note: "NumPy provides fast, vectorized array operations that are far more efficient than plain Python lists for numerical work."
    },
    {
      q: "In Python OOP, what does 'self' refer to inside a method?",
      options: ["The class itself", "The specific instance calling the method", "A global variable", "The parent class"],
      correct: 1,
      note: "'self' is a reference to the particular object instance the method is being called on."
    },
    {
      q: "Which keyword is used to catch an exception in Python?",
      options: ["catch", "except", "rescue", "handle"],
      correct: 1,
      note: "Python uses try/except blocks, where 'except' catches the specified exception type."
    },
    {
      q: "What's the main difference between a list and a dictionary in Python?",
      options: ["Lists can't be modified, dictionaries can", "Dictionaries store key-value pairs, lists store ordered items by index", "Lists can only hold numbers", "Dictionaries are always faster"],
      correct: 1,
      note: "Dictionaries map keys to values for fast lookup, while lists store items in order accessed by index."
    }
  ],
  "Mechanical Engineering": [
    {
      q: "Powder bed fusion is a process most associated with:",
      options: ["Traditional casting", "Additive manufacturing (3D printing)", "Sheet metal stamping", "Injection molding"],
      correct: 1,
      note: "Powder bed fusion selectively fuses layers of powder using a heat source, making it a core additive manufacturing technique."
    },
    {
      q: "In a hydraulic power steering system, what provides the assist force?",
      options: ["An electric motor directly on the wheel", "Pressurized hydraulic fluid from a pump", "A second steering wheel", "Compressed air only"],
      correct: 1,
      note: "A belt-driven pump pressurizes hydraulic fluid, which assists the driver's steering input through a hydraulic cylinder."
    },
    {
      q: "Gear trains are primarily used to:",
      options: ["Store electrical energy", "Change speed, torque, or direction of rotational motion", "Convert AC to DC current", "Reduce vehicle weight"],
      correct: 1,
      note: "Gear trains transmit rotational motion between shafts while changing speed and torque according to the gear ratio."
    },
    {
      q: "Compared to hydraulic power steering, electric power steering (EPS) generally offers:",
      options: ["Lower fuel efficiency", "No steering assist at all", "Better energy efficiency since it only draws power when needed", "Assist only at high speeds"],
      correct: 2,
      note: "EPS uses an electric motor that only consumes power during steering input, unlike hydraulic pumps that run continuously off the engine."
    },
    {
      q: "In a simple gear train, if a small gear drives a larger gear, the output:",
      options: ["Speeds up and torque decreases", "Slows down and torque increases", "Speed and torque stay the same", "Direction reverses only, nothing else changes"],
      correct: 1,
      note: "A larger driven gear rotates slower than the smaller driving gear but produces more torque, since gear ratio trades speed for torque."
    }
  ]
};

const TOPICS = Object.keys(QUESTIONS);
let currentTopic = TOPICS[0];
let order = [];
let idx = 0;
let score = 0;
let answered = false;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderPins() {
  const pins = document.getElementById('pins');
  pins.innerHTML = '';
  TOPICS.forEach(topic => {
    const btn = document.createElement('button');
    btn.className = 'pin' + (topic === currentTopic ? ' active' : '');
    btn.textContent = topic;
    btn.onclick = () => {
      if (topic === currentTopic) return;
      currentTopic = topic;
      startQuiz();
    };
    pins.appendChild(btn);
  });
}

function heartsRow() {
  const total = QUESTIONS[currentTopic].length;
  let out = '';
  for (let i = 0; i < total; i++) {
    out += i < score ? '💗' : '🤍';
  }
  return out;
}

function startQuiz() {
  order = shuffle(QUESTIONS[currentTopic].map((_, i) => i));
  idx = 0;
  score = 0;
  renderPins();
  renderQuestion();
}

function renderQuestion() {
  const card = document.getElementById('card');
  answered = false;

  if (idx >= order.length) {
    card.innerHTML = `
      <div class="done">
        <div class="result-emoji">🎀</div>
        <div class="result">${score}/${order.length}</div>
        <div class="result-label">on ${currentTopic}</div>
        <button class="restart-btn" id="restartBtn">Play again</button>
      </div>
    `;
    document.getElementById('restartBtn').onclick = startQuiz;
    return;
  }

  const q = QUESTIONS[currentTopic][order[idx]];

  card.innerHTML = `
    <div class="q-meta">✎ question ${idx + 1} of ${order.length}</div>
    <div class="q-prompt">${q.q}</div>
    <div class="options" id="options"></div>
    <div class="feedback" id="feedback"></div>
    <div class="foot-row">
      <span class="hearts" id="hearts">${heartsRow()}</span>
      <button class="next-btn" id="nextBtn">Next ✿</button>
    </div>
  `;

  const optionsEl = document.getElementById('options');
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = `option opt-${i}`;
    btn.innerHTML = `<span class="bullet">•</span><span>${opt}</span>`;
    btn.onclick = () => selectAnswer(i, q);
    optionsEl.appendChild(btn);
  });

  document.getElementById('nextBtn').onclick = nextQuestion;
}

function selectAnswer(i, q) {
  if (answered) return;
  answered = true;
  const buttons = document.querySelectorAll('.option');
  buttons.forEach((b, bi) => {
    b.disabled = true;
    if (bi === q.correct) b.classList.add('correct');
    else if (bi === i) b.classList.add('wrong');
  });
  if (i === q.correct) score++;
  document.getElementById('feedback').textContent = q.note;
  document.getElementById('nextBtn').classList.add('show');
  document.getElementById('hearts').textContent = heartsRow();
}

function nextQuestion() {
  idx++;
  renderQuestion();
}

renderPins();
startQuiz();