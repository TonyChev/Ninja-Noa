/* Outils communs */
const U = {
  rand(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; },
  pick(a) { return a[Math.floor(Math.random() * a.length)]; },
  shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  },
  round(x, d = 4) { return Number(Math.round(Number(x + 'e' + d)) + 'e-' + d); },
  /* Formatage français : 1 234 567,89 */
  nf(n) {
    n = U.round(n, 6);
    const neg = n < 0; const s = String(Math.abs(n)).split('.');
    s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return (neg ? '-' : '') + s.join(',');
  },
  today(d = new Date()) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  },
  esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); },
  uniq(a) { return [...new Set(a)]; },
  /* Fraction affichée joliment (et lisible par la voix) */
  frac(n, d) { return `<span class="frac" data-say="${n} sur ${d}"><span>${n}</span><span>${d}</span></span>`; },
  /* Question à choix multiples */
  qcm(q, answer, wrongs, explain, extra = {}) {
    answer = String(answer);
    const w = U.uniq(wrongs.map(String)).filter(x => x !== answer);
    const choices = U.shuffle([answer, ...U.shuffle(w).slice(0, 3)]);
    return Object.assign({ kind: 'qcm', q, answer, choices, explain }, extra);
  },
  /* Question à saisir. answer : valeur ou tableau de valeurs acceptées */
  input(q, answer, explain, extra = {}) {
    const answers = (Array.isArray(answer) ? answer : [answer]);
    const numeric = answers.every(a => typeof a === 'number');
    return Object.assign({ kind: 'input', q, answers, numeric, display: numeric ? U.nf(answers[0]) : String(answers[0]), explain }, extra);
  },
  /* Entrée de banque : [question, bonne réponse, [mauvaises], explication] */
  fromBank(e) { return U.qcm(e[0], e[1], e[2], e[3] || ''); },
  /* Nombres faux mais plausibles */
  near(n, count = 3, spread = null) {
    const out = new Set();
    const s = spread || Math.max(1, Math.round(Math.abs(n) * 0.1));
    let guard = 0;
    while (out.size < count && guard++ < 100) {
      const k = n + U.pick([-1, 1]) * U.rand(1, s);
      if (k !== n && k >= 0) out.add(k);
    }
    return [...out];
  },
  normText(s) {
    return String(s).toLowerCase().trim().replace(/[’`]/g, "'").replace(/\s+/g, ' ').replace(/[.!]+$/, '');
  },
  parseNum(s) {
    s = String(s).replace(/[\s  ]/g, '').replace(',', '.').replace(/[^\d.\-]/g, '');
    if (s === '' || s === '.' || s === '-') return NaN;
    return Number(s);
  },
  checkInput(q, value) {
    if (q.numeric) {
      const v = U.parseNum(value);
      return q.answers.some(a => Math.abs(a - v) < 1e-9);
    }
    const v = U.normText(value);
    return q.answers.some(a => U.normText(a) === v);
  },
  /* Texte lisible par la synthèse vocale à partir de HTML */
  speakable(html) {
    const d = document.createElement('div');
    d.innerHTML = html;
    d.querySelectorAll('.frac').forEach(f => f.replaceWith(' ' + f.dataset.say + ' '));
    d.querySelectorAll('.no-say').forEach(f => f.remove());
    return d.textContent.replace(/_{2,}/g, ' blanc ').replace(/…/g, ', ').replace(/\s+/g, ' ').trim();
  }
};

/* Nombres en lettres (orthographe traditionnelle) */
const NumFr = (() => {
  const u = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize'];
  const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante'];
  function b100(n, final) {
    if (n < 17) return u[n];
    if (n < 20) return 'dix-' + u[n - 10];
    const t = Math.floor(n / 10), r = n % 10;
    if (t < 7) { if (r === 0) return tens[t]; if (r === 1) return tens[t] + ' et un'; return tens[t] + '-' + u[r]; }
    if (t === 7) return r === 1 ? 'soixante et onze' : 'soixante-' + b100(10 + r);
    if (n === 80) return final ? 'quatre-vingts' : 'quatre-vingt';
    return 'quatre-vingt-' + b100(n - 80);
  }
  function b1000(n, final) {
    const h = Math.floor(n / 100), r = n % 100;
    if (h === 0) return b100(r, final);
    const head = h === 1 ? 'cent' : u[h] + ' cent';
    if (r === 0) return head + (h > 1 && final ? 's' : '');
    return head + ' ' + b100(r, final);
  }
  return function (n) {
    if (n === 0) return 'zéro';
    const parts = [];
    const mds = Math.floor(n / 1e9), mil = Math.floor(n / 1e6) % 1000, th = Math.floor(n / 1000) % 1000, r = n % 1000;
    if (mds) parts.push(b1000(mds, true) + ' milliard' + (mds > 1 ? 's' : ''));
    if (mil) parts.push(b1000(mil, true) + ' million' + (mil > 1 ? 's' : ''));
    if (th) parts.push(th === 1 ? 'mille' : b1000(th, false) + ' mille');
    if (r) parts.push(b1000(r, true));
    return parts.join(' ');
  };
})();

window.DOJOS = [];
