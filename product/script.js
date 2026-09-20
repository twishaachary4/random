document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Watch dial: generate 12 tick marks ---------- */
  const ticksGroup = document.getElementById('ticks');
  if (ticksGroup) {
    const cx = 210, cy = 210, outerR = 122, innerR = 108, minorInnerR = 114;
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30) * (Math.PI / 180);
      const isTwelve = i === 0;
      const rInner = isTwelve ? innerR - 8 : minorInnerR;
      const x1 = cx + outerR * Math.sin(angle);
      const y1 = cy - outerR * Math.cos(angle);
      const x2 = cx + rInner * Math.sin(angle);
      const y2 = cy - rInner * Math.cos(angle);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1.toFixed(2));
      line.setAttribute('y1', y1.toFixed(2));
      line.setAttribute('x2', x2.toFixed(2));
      line.setAttribute('y2', y2.toFixed(2));
      if (isTwelve) line.classList.add('tick-12');
      ticksGroup.appendChild(line);
    }
  }

  /* ---------- Hero reveal on load (one orchestrated sequence) ---------- */
  requestAnimationFrame(() => {
    document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('in'));
  });

  /* ---------- Craft bars: animate in when scrolled into view ---------- */
  const craftVisual = document.querySelector('.craft-visual');
  if (craftVisual && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          craftVisual.querySelectorAll('.craft-bar').forEach(bar => bar.classList.add('in'));
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    observer.observe(craftVisual);
  } else if (craftVisual) {
    craftVisual.querySelectorAll('.craft-bar').forEach(bar => bar.classList.add('in'));
  }

  /* ---------- Waitlist form validation ---------- */
  const form = document.getElementById('waitlistForm');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const confirm = document.getElementById('waitlistConfirm');

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = emailInput.value.trim();

      if (!value) {
        showError('Enter your email to join the waitlist.');
        return;
      }
      if (!isValidEmail(value)) {
        showError('That email address doesn\u2019t look right.');
        return;
      }

      clearError();
      form.reset();
      confirm.textContent = `You're on the list \u2014 we'll email ${value} before the first run opens.`;
      confirm.classList.add('show');
    });

    emailInput.addEventListener('input', clearError);
  }

  function showError(message) {
    emailError.textContent = message;
    emailInput.classList.add('invalid');
    confirm.classList.remove('show');
  }

  function clearError() {
    emailError.textContent = '';
    emailInput.classList.remove('invalid');
  }

});