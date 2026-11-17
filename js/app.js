/* ===== Ninja Noa : application principale ===== */
const $app = document.getElementById('app');
const QUIZ_LEN = 10;
const COLORS = ['#e63946', '#3a86ff', '#2a9d8f', '#ffb703', '#8338ec', '#ef476f', '#06d6a0', '#fb8500'];

const App = {
  db: null, p: null, quiz: null, screen: null,
  init() {
    TROPHIES = buildTrophies();
    this.db = Store.load();
    Object.values(this.db.profiles).forEach(p => Store.fixProfile(p));
    Voice.init();
    Store.requestPersist();
    document.addEventListener('click', e => {
      const el = e.target.closest('[data-go]');
      if (el) { e.preventDefault(); Sfx.play('click'); this.go(el.dataset.go, el.dataset.arg); }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' && this.screen === 'quiz' && this.quiz && this.quiz.locked) { e.preventDefault(); nextQuestion(); }
    });
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => { });
    const profs = Object.values(this.db.profiles).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    if (profs.length) this.login(profs[0]); else this.go('welcome');
  },
  go(screen, arg) {
    if (screen !== 'quiz') Voice.stop();
    this.screen = screen;
    (Screens[screen] || Screens.home)(arg);
    window.scrollTo(0, 0);
  },
  save() {
    if (!this.p) return;
    this.p.updatedAt = Date.now();
    this.db.profiles[this.p.id] = this.p;
    this.db.last = this.p.id;
    if (!Store.save(this.db)) toast('⚠️ Impossible d\'enregistrer sur cet appareil (navigation privée ?). Pense à exporter ta sauvegarde.', 5000);
  },
  login(p, isNew) {
    p.name = 'Noa';
    this.p = p;
    this.applySettings();
    const t = U.today();
    if (!p.stats.days.includes(t)) { p.stats.days.push(t); p.stats.days = p.stats.days.slice(-400); }
    this.save();
    this.go('home', isNew ? 'new' : 'welcome');
  },
  applySettings() {
    const s = this.p ? this.p.settings : {};
    Voice.settings = { voice: s.voice !== false, pitch: s.pitch ?? 0.7, rate: s.rate ?? 0.95, voiceName: s.voiceName || '' };
    Sfx.enabled = s.sound !== false;
  }
};

/* ---------- Petits outils d'interface ---------- */
function render(html) { $app.innerHTML = html; }
function on(sel, ev, fn) { $app.querySelectorAll(sel).forEach(el => el.addEventListener(ev, fn)); }
function toast(html, ms = 3000) {
  const z = document.getElementById('toast-zone');
  const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = html;
  z.appendChild(t); setTimeout(() => t.classList.add('out'), ms); setTimeout(() => t.remove(), ms + 500);
}
function modal(html, cls = '') {
  const m = document.createElement('div'); m.className = 'modal-bg';
  m.innerHTML = `<div class="modal ${cls}">${html}</div>`;
  document.body.appendChild(m);
  m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-close]')) m.remove(); });
  return m;
}
function confirmBox(text, okLabel, cb) {
  const m = modal(`<p>${text}</p><div class="row"><button class="btn ghost" data-close>Annuler</button><button class="btn danger" id="ok">${okLabel}</button></div>`);
  m.querySelector('#ok').onclick = () => { m.remove(); cb(); };
}
function confetti(n = 70) {
  const box = document.createElement('div'); box.className = 'confetti';
  for (let i = 0; i < n; i++) {
    const s = document.createElement('i');
    s.style.left = Math.random() * 100 + '%'; s.style.background = U.pick(['#ffd166', '#e63946', '#3a86ff', '#06d6a0', '#ef476f', '#fff']);
    s.style.animationDelay = Math.random() * 0.8 + 's'; s.style.animationDuration = 2 + Math.random() * 1.5 + 's';
    if (Math.random() < .3) { s.className = 'star'; s.textContent = '✦'; s.style.background = 'none'; s.style.color = '#ffd166'; }
    box.appendChild(s);
  }
  document.body.appendChild(box); setTimeout(() => box.remove(), 4000);
}
function avatar(p, size = 'sm', mood = 'normal') {
  return `<span class="avatar ${size}">${mascotSVG({ color: p.color, belt: beltFor(p.xp).color, mood })}</span>`;
}
function topbar(back) {
  const p = App.p, b = beltFor(p.xp);
  return `<header class="topbar">
    ${back ? `<button class="icon-btn" data-go="${back}" aria-label="Retour">←</button>` : `<button class="avatar-btn" data-go="account" aria-label="Paramètres">${avatar(p)}</button>`}
    <div class="tb-info">
      <div class="tb-name">${U.esc(p.name)} <span class="belt-chip" style="--belt:${b.color}">Ceinture ${b.name}</span></div>
      <div class="xpbar"><i style="width:${b.pct}%"></i></div>
      <small>${p.xp} XP ${b.next ? '· encore ' + (b.next.xp - p.xp) + ' XP pour la ceinture ' + b.next.name : '· Grand maître !'}</small>
    </div>
    <button class="icon-btn" data-go="trophies" aria-label="Trophées">🏆</button>
    <button class="icon-btn" data-go="account" aria-label="Paramètres">⚙️</button>
  </header>`;
}
function isUnlocked(p, dojo, idx) {
  if (idx === 0 || p.settings.unlockAll) return true;
  const prev = p.missions[dojo.id + '.' + dojo.missions[idx - 1].id];
  return !!(prev && prev.medal);
}
function makeQuestions(mission, n = QUIZ_LEN) {
  if (mission.bank) return U.shuffle(mission.bank).slice(0, n).map(U.fromBank);
  const out = [], seen = new Set(); let g = 0;
  while (out.length < n && g++ < 300) {
    const q = mission.gen(); const key = q.q + '|' + (q.answer || q.display);
    if (seen.has(key)) continue; seen.add(key); out.push(q);
  }
  return out;
}

/* ---------- Écrans ---------- */
const Screens = {
  welcome() {
    let color = COLORS[0];
    render(`<div class="screen login">
      <div class="brand"><div class="logo-star">✦</div><h1>Ninja <span>Noa</span></h1><p>Le dojo secret du CM2</p></div>
      <div class="hero-mascot" id="prev">${mascotSVG({ color, mood: 'happy' })}</div>
      <div class="bubble">Bienvenue au dojo, Noa ! Je suis Maître Kuro, ton sensei. Choisis la couleur de ton bandeau :</div>
      <div class="colors">${COLORS.map((c, i) => `<button class="swatch ${i ? '' : 'on'}" data-c="${c}" style="background:${c}" aria-label="couleur"></button>`).join('')}</div>
      <div class="start-wrap"><button class="btn primary big" id="go">⚔️ Commencer l'aventure</button></div>
      <button class="btn ghost small" id="imp">📥 J'ai déjà une sauvegarde</button>
    </div>`);
    on('.swatch', 'click', e => {
      color = e.currentTarget.dataset.c;
      $app.querySelectorAll('.swatch').forEach(x => x.classList.toggle('on', x === e.currentTarget));
      document.getElementById('prev').innerHTML = mascotSVG({ color, mood: 'happy' });
      Sfx.play('swoosh');
    });
    on('#go', 'click', () => {
      const p = Store.newProfile('Noa', color, null);
      App.db.profiles = { [p.id]: p };
      Sfx.play('gong');
      App.login(p, true);
    });
    on('#imp', 'click', importDialog);
  },

  home(arg) {
    const p = App.p, b = beltFor(p.xp);
    const greet = arg === 'new' ? Voice.line('newProfile', { name: p.name }) : arg === 'welcome' ? Voice.line('welcome', { name: p.name }) : U.pick(['Choisis un dojo pour t\'entraîner.', 'Quel dojo vas-tu conquérir ?', 'Un ninja s\'entraîne chaque jour !']);
    const dailyDone = p.daily[U.today()] !== undefined;
    const streak = streakOf(p.stats.days);
    render(`<div class="screen home">
      ${topbar()}
      <section class="hero">
        <div class="hero-mascot sm">${mascotSVG({ color: p.color, belt: b.color, mood: 'happy' })}</div>
        <div class="bubble left">${U.esc(greet)}<button class="say-btn" id="sayg" aria-label="Écouter">🔊</button></div>
      </section>
      <div class="chips"><span>🔥 Série : ${streak} jour${streak > 1 ? 's' : ''}</span><span>🎖️ ${medalCount(p)} médailles</span><span>🏆 ${TROPHIES.filter(t => p.trophies[t.id]).length}/${TROPHIES.length} coupes</span></div>
      <button class="daily ${dailyDone ? 'done' : ''}" id="daily">
        <span class="d-icon">⛩️</span>
        <span><b>Défi du Sensei</b><small>${dailyDone ? `Réussi aujourd'hui : ${p.daily[U.today()]}/10 — tu peux rejouer !` : '10 questions de tous les dojos · +50 XP bonus'}</small></span>
        <span class="go">➜</span>
      </button>
      <h3 class="section">Les dojos</h3>
      <div class="dojos">
        ${DOJOS.map(d => {
          const done = medalCount(p, null, d.id), gold = medalCount(p, 'or', d.id);
          return `<button class="dojo-card" data-go="dojo" data-arg="${d.id}" style="--c:${d.color}">
            <span class="d-emoji">${d.icon}</span><b>${d.name}</b><small>${d.subject}</small>
            <span class="d-prog"><i style="width:${Math.round(done / d.missions.length * 100)}%"></i></span>
            <small class="d-count">${done}/${d.missions.length} missions · ${gold} 🥇 ${p.trophies['gold-' + d.id] ? '🏆' : p.trophies['cup-' + d.id] ? '🏆' : ''}</small>
          </button>`;
        }).join('')}
      </div>
    </div>`);
    if (arg === 'welcome' || arg === 'new') setTimeout(() => Voice.say(greet), 300);
    on('#sayg', 'click', () => Voice.say(greet, { force: true }));
    on('#daily', 'click', startDaily);
  },

  dojo(id) {
    const p = App.p, d = DOJOS.find(x => x.id === id);
    render(`<div class="screen dojo" style="--c:${d.color}">
      ${topbar('home')}
      <div class="dojo-banner"><span>${d.icon}</span><div><h2>${d.name}</h2><p>${d.subject} · ${medalCount(p, null, d.id)}/${d.missions.length} missions réussies</p></div></div>
      <div class="missions">
        ${d.missions.map((m, i) => {
          const r = p.missions[d.id + '.' + m.id]; const open = isUnlocked(p, d, i);
          return `<button class="mission ${open ? '' : 'locked'}" data-i="${i}" ${open ? '' : 'disabled'}>
            <span class="m-num">${i + 1}</span><span class="m-icon">${open ? m.icon : '🔒'}</span>
            <span class="m-txt"><b>${m.title}</b><small>${m.desc}</small>${r ? `<small class="best">Meilleur score : ${r.best}/10 · ${r.plays} partie${r.plays > 1 ? 's' : ''}</small>` : ''}</span>
            <span class="m-medal">${r && r.medal ? MEDALS[r.medal].icon : open ? '<span class="go">➜</span>' : ''}</span>
          </button>`;
        }).join('')}
      </div>
      <p class="hint">🥉 5/10 · 🥈 7/10 · 🥇 9/10 — Une médaille débloque la mission suivante.</p>
    </div>`);
    on('.mission:not(.locked)', 'click', e => startQuiz(d, d.missions[Number(e.currentTarget.dataset.i)]));
  },

  quiz() { renderQuestion(); },
  results(r) { renderResults(r); },

  trophies() {
    const p = App.p, b = beltFor(p.xp);
    render(`<div class="screen trophies">
      ${topbar('home')}
      <h2>🏯 Salle des trophées</h2>
      <h3 class="section">Ceintures</h3>
      <div class="belts">${BELTS.map((x, i) => `<div class="belt ${i <= b.index ? 'on' : ''}"><span style="--belt:${x.color}"></span><small>${x.name}</small><small class="xp">${x.xp} XP</small></div>`).join('')}</div>
      <h3 class="section">Médailles</h3>
      <div class="medal-table">
        ${DOJOS.map(d => {
          const c = k => Object.entries(p.missions).filter(([key, v]) => key.startsWith(d.id + '.') && v.medal === k).length;
          return `<div class="mt-row"><span>${d.icon} ${d.subject}</span><span>🥇 ${c('or')}</span><span>🥈 ${c('argent')}</span><span>🥉 ${c('bronze')}</span></div>`;
        }).join('')}
      </div>
      <h3 class="section">Coupes et exploits <small>${TROPHIES.filter(t => p.trophies[t.id]).length}/${TROPHIES.length}</small></h3>
      <div class="cups">
        ${TROPHIES.map(t => { const got = p.trophies[t.id]; return `<div class="cup ${got ? 'on' : ''} ${t.gold ? 'gold' : ''}"><span class="c-icon">${t.icon}</span><b>${t.name}</b><small>${t.desc}</small>${got ? `<small class="date">${new Date(got).toLocaleDateString('fr-FR')}</small>` : ''}</div>`; }).join('')}
      </div>
    </div>`);
  },

  account() {
    const p = App.p, s = p.settings, st = p.stats;
    const pct = st.answered ? Math.round(st.correct / st.answered * 100) : 0;
    const fr = Voice.frVoices();
    render(`<div class="screen account">
      ${topbar('home')}
      <div class="acc-head">${avatar(p, 'lg')}<div><h2>${U.esc(p.name)}</h2><p>Ninja depuis le ${new Date(p.createdAt).toLocaleDateString('fr-FR')}</p></div></div>
      <div class="stats">
        <div><b>${st.answered}</b><small>questions</small></div>
        <div><b>${pct} %</b><small>de réussite</small></div>
        <div><b>${st.bestCombo}</b><small>meilleur combo</small></div>
        <div><b>${st.days.length}</b><small>jours d'entraînement</small></div>
        <div><b>${st.missionsPlayed}</b><small>missions jouées</small></div>
        <div><b>${st.perfects}</b><small>sans-fautes</small></div>
      </div>
      <h3 class="section">🔊 Voix du sensei et sons</h3>
      <div class="card settings">
        ${Voice.supported ? '' : '<p class="warn">La synthèse vocale n\'est pas disponible sur ce navigateur.</p>'}
        <label class="switch"><input type="checkbox" id="s-voice" ${s.voice ? 'checked' : ''}><span></span> Voix ninja du sensei</label>
        <label class="switch"><input type="checkbox" id="s-auto" ${s.autoRead ? 'checked' : ''}><span></span> Lire les questions à voix haute</label>
        <label class="switch"><input type="checkbox" id="s-sound" ${s.sound ? 'checked' : ''}><span></span> Effets sonores</label>
        ${fr.length ? `<label>Voix<select id="s-vname"><option value="">Automatique</option>${fr.map(v => `<option ${v.name === s.voiceName ? 'selected' : ''}>${U.esc(v.name)}</option>`).join('')}</select></label>` : ''}
        <label>Voix grave ⟷ aiguë<input type="range" id="s-pitch" min="0.1" max="1.5" step="0.1" value="${s.pitch}"></label>
        <label>Lente ⟷ rapide<input type="range" id="s-rate" min="0.6" max="1.4" step="0.05" value="${s.rate}"></label>
        <button class="btn ghost small" id="s-test">▶️ Tester la voix</button>
      </div>
      <h3 class="section">👨‍👩‍👧 Espace parents</h3>
      <div class="card settings">
        <label class="switch"><input type="checkbox" id="s-unlock" ${s.unlockAll ? 'checked' : ''}><span></span> Débloquer toutes les missions</label>
        <label>Couleur du bandeau</label>
        <div class="colors left">${COLORS.map(c => `<button class="swatch ${c === p.color ? 'on' : ''}" data-c="${c}" style="background:${c}" aria-label="couleur"></button>`).join('')}</div>
      </div>
      <h3 class="section">💾 Sauvegarde</h3>
      <div class="card settings">
        <p class="small">La progression est enregistrée automatiquement sur cet appareil. Pour la garder en sécurité ou la transférer sur un autre appareil, exporte-la :</p>
        <button class="btn primary" id="exp">📤 Télécharger ma sauvegarde (fichier)</button>
        <button class="btn ghost" id="code">🔑 Afficher mon code de sauvegarde</button>
        <button class="btn ghost" id="imp">📥 Importer une sauvegarde</button>
      </div>
      <div class="row wrap">
        <button class="btn danger" id="del">🗑️ Tout recommencer à zéro</button>
      </div>
    </div>`);
    const upd = (k, v) => { p.settings[k] = v; App.applySettings(); App.save(); };
    on('#s-voice', 'change', e => upd('voice', e.target.checked));
    on('#s-auto', 'change', e => upd('autoRead', e.target.checked));
    on('#s-sound', 'change', e => upd('sound', e.target.checked));
    on('#s-unlock', 'change', e => upd('unlockAll', e.target.checked));
    on('#s-vname', 'change', e => upd('voiceName', e.target.value));
    on('#s-pitch', 'change', e => upd('pitch', Number(e.target.value)));
    on('#s-rate', 'change', e => upd('rate', Number(e.target.value)));
    on('#s-test', 'click', () => Voice.say(`Hai ! Je suis Maître Kuro, le sensei de Noa. Prêt pour l'entraînement ?`, { force: true }));
    on('#exp', 'click', () => {
      Store.download(`ninja-noa-${p.name.replace(/[^\w-]/g, '')}-${U.today()}.json`, Store.exportData(p));
      toast('📤 Sauvegarde téléchargée !');
    });
    on('#code', 'click', () => {
      const m = modal(`<h3>🔑 Code de sauvegarde</h3><p class="small">Copie ce code et garde-le précieusement (par exemple dans un e-mail ou une note). Il permet de retrouver la progression sur n'importe quel appareil.</p><textarea readonly rows="6">${Store.exportCode(p)}</textarea><div class="row"><button class="btn ghost" data-close>Fermer</button><button class="btn primary" id="cp">Copier</button></div>`);
      m.querySelector('#cp').onclick = () => { const ta = m.querySelector('textarea'); ta.select(); try { navigator.clipboard.writeText(ta.value); } catch (e) { document.execCommand('copy'); } toast('Code copié !'); };
    });
    on('#imp', 'click', importDialog);
    on('.swatch', 'click', e => { p.color = e.currentTarget.dataset.c; App.save(); Sfx.play('swoosh'); App.go('account'); });
    on('#del', 'click', () => {
      const a = U.rand(12, 29), b = U.rand(12, 29);
      const m = modal(`<h3>⚠️ Tout recommencer</h3><p>Toute la progression de Noa (XP, ceintures, médailles, coupes) sera effacée.<br><small>Astuce : télécharge d'abord une sauvegarde.</small></p><p>Question pour un parent : combien font <b>${a} × ${b}</b> ?</p><input id="pa" inputmode="numeric"><div class="row"><button class="btn ghost" data-close>Annuler</button><button class="btn danger" id="ok">Effacer</button></div>`);
      m.querySelector('#ok').onclick = () => {
        if (Number(m.querySelector('#pa').value) !== a * b) return toast('Ce n\'est pas la bonne réponse.');
        App.db.profiles = {}; App.p = null; Store.save(App.db); m.remove(); toast('Progression effacée.'); App.go('welcome');
      };
    });
  }
};

/* ---------- Import ---------- */
function importDialog() {
  const m = modal(`<h3>📥 Importer une sauvegarde</h3>
    <p class="small">Choisis un fichier de sauvegarde (.json) ou colle un code de sauvegarde.</p>
    <input type="file" id="f" accept=".json,application/json">
    <textarea id="t" rows="4" placeholder="NINJA-…"></textarea>
    <div class="row"><button class="btn ghost" data-close>Annuler</button><button class="btn primary" id="ok">Importer</button></div>`);
  const doImport = text => {
    let prof;
    try { prof = Store.parseImport(text); } catch (e) { return toast('❌ Sauvegarde invalide.'); }
    const finish = () => { prof.name = 'Noa'; App.db.profiles = { [prof.id]: prof }; Store.save(App.db); m.remove(); toast('✅ Sauvegarde importée !'); App.login(prof); };
    const cur = Object.values(App.db.profiles)[0];
    if (cur) confirmBox(`Remplacer la progression actuelle (${cur.xp} XP) par celle de la sauvegarde (${prof.xp} XP) ?`, 'Remplacer', finish);
    else finish();
  };
  m.querySelector('#ok').onclick = () => {
    const f = m.querySelector('#f').files[0];
    if (f) { const r = new FileReader(); r.onload = () => doImport(r.result); r.readAsText(f); }
    else if (m.querySelector('#t').value.trim()) doImport(m.querySelector('#t').value);
    else toast('Choisis un fichier ou colle un code.');
  };
}

/* ---------- Quiz ---------- */
function startQuiz(dojo, mission) {
  App.quiz = { dojo, mission, questions: makeQuestions(mission), i: 0, correct: 0, combo: 0, best: 0, xp: 0, results: [], locked: false };
  Voice.say(Voice.line('start'));
  Sfx.play('gong');
  App.go('quiz');
}
function startDaily() {
  const p = App.p; const pool = [];
  DOJOS.forEach(d => d.missions.forEach((m, i) => { if (isUnlocked(p, d, i)) pool.push([d, m]); }));
  const picks = []; let guard = 0;
  while (picks.length < QUIZ_LEN && guard++ < 100) {
    const [d, m] = U.pick(pool); const q = makeQuestions(m, 1)[0];
    if (q && !picks.some(x => x.q === q.q)) { q.src = d.icon + ' ' + m.title; picks.push(q); }
  }
  App.quiz = { daily: true, dojo: { id: 'daily', name: 'Défi du Sensei', color: '#ffb703', icon: '⛩️' }, mission: { id: 'daily', title: 'Défi du Sensei' }, questions: picks, i: 0, correct: 0, combo: 0, best: 0, xp: 0, results: [], locked: false };
  Voice.say(Voice.line('daily')); Sfx.play('gong');
  App.go('quiz');
}
function renderQuestion() {
  const Q = App.quiz, q = Q.questions[Q.i], p = App.p;
  Q.locked = false;
  const prog = Q.questions.map((_, k) => `<i class="${k < Q.i ? (Q.results[k] ? 'ok' : 'ko') : k === Q.i ? 'cur' : ''}">✦</i>`).join('');
  render(`<div class="screen quiz" style="--c:${Q.dojo.color}">
    <header class="quiz-top">
      <button class="icon-btn" id="quit" aria-label="Quitter">✕</button>
      <div class="qprog">${prog}</div>
      <span class="combo ${Q.combo >= 2 ? 'show' : ''}">🔥 x${Q.combo}</span>
    </header>
    <div class="q-head"><span class="q-mascot">${mascotSVG({ color: p.color, belt: beltFor(p.xp).color })}</span>
      <div class="q-meta"><small>${Q.dojo.icon} ${Q.mission.title}${q.src ? ' · ' + q.src : ''}</small><small>Question ${Q.i + 1} / ${Q.questions.length}</small></div></div>
    <div class="q-card">
      <div class="q-text">${q.q}</div>
      <div class="q-tools">
        <button class="say-btn" id="sayq" aria-label="Lire la question">🔊 Écouter</button>
        ${q.say ? `<button class="say-btn en" id="sayen">🇬🇧 Prononciation</button>` : ''}
      </div>
    </div>
    <div class="answers">
      ${q.kind === 'qcm'
        ? `<div class="choices ${q.choices.some(c => U.speakable(c).length > 28) ? 'long' : ''}">${q.choices.map((c, k) => `<button class="choice" data-k="${k}"><span class="key">${'ABCD'[k]}</span><span>${c}</span></button>`).join('')}</div>`
        : `<form class="input-row" id="f"><input id="ans" ${q.numeric ? 'inputmode="decimal"' : ''} autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${q.placeholder || 'Ta réponse'}">${q.unit ? `<span class="unit">${q.unit}</span>` : ''}<button class="btn primary">Valider</button></form>`}
    </div>
    <div class="feedback" id="fb"></div>
  </div>`);
  const qtext = U.speakable(q.q);
  if (p.settings.autoRead) setTimeout(() => Voice.say(qtext), Q.i === 0 ? 1600 : 200);
  on('#sayq', 'click', () => Voice.say(qtext, { force: true }));
  on('#sayen', 'click', () => Voice.say(q.say.text, { lang: q.say.lang, force: true }));
  on('#quit', 'click', () => confirmBox('Quitter la mission ? Ta progression dans cette mission sera perdue (l\'XP gagnée est conservée).', 'Quitter', () => { App.p.xp += Q.xp; App.save(); App.go(Q.daily ? 'home' : 'dojo', Q.dojo.id); }));
  if (q.kind === 'qcm') {
    on('.choice', 'click', e => {
      if (Q.locked) return;
      const btn = e.currentTarget, c = q.choices[Number(btn.dataset.k)];
      const ok = c === q.answer;
      $app.querySelectorAll('.choice').forEach(b => { b.disabled = true; if (q.choices[Number(b.dataset.k)] === q.answer) b.classList.add('right'); });
      if (!ok) btn.classList.add('wrong');
      answer(ok);
    });
  } else {
    const inp = document.getElementById('ans');
    setTimeout(() => inp.focus(), 50);
    on('#f', 'submit', e => {
      e.preventDefault(); if (Q.locked) return;
      if (!inp.value.trim()) return inp.focus();
      const ok = U.checkInput(q, inp.value);
      inp.disabled = true; inp.classList.add(ok ? 'right' : 'wrong');
      $app.querySelector('#f button').disabled = true;
      answer(ok);
    });
  }
}
function answer(ok) {
  const Q = App.quiz, q = Q.questions[Q.i], p = App.p;
  Q.locked = true; Q.results.push(ok);
  p.stats.answered++;
  let gain = 0;
  if (ok) {
    p.stats.correct++; Q.correct++; Q.combo++; Q.best = Math.max(Q.best, Q.combo);
    p.stats.bestCombo = Math.max(p.stats.bestCombo, Q.combo);
    gain = 10 + (Q.combo >= 3 ? 5 : 0); Q.xp += gain;
    Sfx.play('correct');
    Voice.say([3, 5, 7, 10].includes(Q.combo) ? Voice.line('combo', { n: Q.combo }) : Voice.line('correct'));
  } else {
    Q.combo = 0; Sfx.play('wrong'); Voice.say(Voice.line('wrong'));
  }
  App.save();
  const m = $app.querySelector('.q-mascot'); m.innerHTML = mascotSVG({ color: p.color, belt: beltFor(p.xp).color, mood: ok ? 'happy' : 'sad' }); m.classList.add(ok ? 'jump' : 'shake');
  const c = $app.querySelector('.combo'); c.textContent = '🔥 x' + Q.combo; c.classList.toggle('show', Q.combo >= 2);
  const last = Q.i === Q.questions.length - 1;
  const fb = document.getElementById('fb');
  fb.className = 'feedback show ' + (ok ? 'ok' : 'ko');
  fb.innerHTML = `<div class="fb-title">${ok ? `✅ Bravo ! <span class="gain">+${gain} XP</span>` : '❌ Pas tout à fait…'}</div>
    ${ok ? '' : `<div class="fb-answer">Bonne réponse : <b>${q.kind === 'qcm' ? q.answer : U.esc(q.display) + (q.unit ? ' ' + q.unit : '')}</b></div>`}
    ${q.explain ? `<div class="fb-explain">💡 ${q.explain}</div>` : ''}
    <button class="btn primary big" id="next">${last ? 'Voir le résultat 🏁' : 'Continuer ➜'}</button>`;
  on('#next', 'click', nextQuestion);
  setTimeout(() => { const n = document.getElementById('next'); if (n) { n.focus({ preventScroll: true }); fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } }, 80);
}
function nextQuestion() {
  const Q = App.quiz; if (!Q || !Q.locked) return;
  Q.i++;
  if (Q.i >= Q.questions.length) return finishQuiz();
  renderQuestion();
}
function finishQuiz() {
  const Q = App.quiz, p = App.p, total = Q.questions.length, score = Q.correct;
  const medal = medalFor(score, total);
  let bonus = 0, prevMedal = null, newRecord = false;
  if (!Q.daily) {
    const key = Q.dojo.id + '.' + Q.mission.id;
    const rec = p.missions[key] || { best: 0, medal: null, plays: 0 };
    prevMedal = rec.medal; rec.plays++;
    if (score > rec.best) { newRecord = rec.plays > 1; rec.best = score; }
    if (medalRank(medal) > medalRank(rec.medal)) {
      bonus += (medal ? MEDALS[medal].bonus : 0) - (rec.medal ? MEDALS[rec.medal].bonus : 0);
      if (rec.medal) p.stats.improved++;
      rec.medal = medal;
    }
    rec.last = Date.now(); p.missions[key] = rec;
    p.stats.dojosPlayed[Q.dojo.id] = (p.stats.dojosPlayed[Q.dojo.id] || 0) + 1;
  } else {
    const t = U.today();
    if (p.daily[t] === undefined) bonus += 50;
    p.daily[t] = Math.max(p.daily[t] || 0, score);
  }
  if (score === total) p.stats.perfects++;
  p.stats.missionsPlayed++;
  const t = U.today(); if (!p.stats.days.includes(t)) p.stats.days.push(t);
  const beltBefore = beltFor(p.xp).index;
  p.xp += Q.xp + bonus;
  const belt = beltFor(p.xp);
  const newTrophies = checkTrophies(p, { hour: new Date().getHours() });
  App.save();
  App.go('results', { score, total, medal, prevMedal, bonus, xp: Q.xp + bonus, beltUp: belt.index > beltBefore ? belt : null, newTrophies, newRecord });
}
function renderResults(r) {
  const Q = App.quiz, p = App.p, b = beltFor(p.xp);
  const md = r.medal ? MEDALS[r.medal] : null;
  let nextM = null;
  if (!Q.daily) {
    const idx = Q.dojo.missions.indexOf(Q.mission);
    if (idx < Q.dojo.missions.length - 1 && isUnlocked(p, Q.dojo, idx + 1)) nextM = Q.dojo.missions[idx + 1];
  }
  const recap = Q.questions.map((q, k) => `<li class="${Q.results[k] ? 'ok' : 'ko'}">${Q.results[k] ? '✅' : '❌'} <span>${U.speakable(q.q).slice(0, 90)}</span>${Q.results[k] ? '' : `<small>→ ${q.kind === 'qcm' ? q.answer : U.esc(q.display) + (q.unit ? ' ' + q.unit : '')}</small>`}</li>`).join('');
  render(`<div class="screen results" style="--c:${Q.dojo.color}">
    <div class="res-card">
      <small>${Q.dojo.icon} ${Q.mission.title}</small>
      <div class="medal-big ${r.medal || 'none'}">${md ? md.icon : '🎋'}</div>
      <h2>${md ? 'Médaille ' + (r.medal === 'or' ? 'd\'or' : r.medal === 'argent' ? 'd\'argent' : 'de bronze') + ' !' : 'Continue l\'entraînement !'}</h2>
      <div class="score">${r.score} <small>/ ${r.total}</small></div>
      ${r.newRecord ? '<div class="tag">🎉 Nouveau record !</div>' : ''}
      <div class="xp-gain">+${r.xp} XP ${r.bonus ? `<small>(dont ${r.bonus} XP de bonus)</small>` : ''}</div>
      <div class="xpbar big"><i style="width:${b.pct}%"></i></div>
      <small>Ceinture ${b.name} · ${p.xp} XP${b.next ? ' / ' + b.next.xp : ''}</small>
      ${r.newTrophies.length ? `<div class="new-trophies"><h3>Nouvelles coupes !</h3>${r.newTrophies.map(t => `<div class="cup on ${t.gold ? 'gold' : ''} pop"><span class="c-icon">${t.icon}</span><b>${t.name}</b><small>${t.desc}</small></div>`).join('')}</div>` : ''}
      <div class="row wrap">
        <button class="btn ghost" id="again">🔁 Rejouer</button>
        ${nextM ? `<button class="btn primary" id="nextm">Mission suivante ➜</button>` : ''}
        <button class="btn ghost" data-go="${Q.daily ? 'home' : 'dojo'}" data-arg="${Q.dojo.id}">${Q.daily ? '🏠 Accueil' : '🏯 Retour au dojo'}</button>
      </div>
    </div>
    <details class="recap"><summary>Revoir mes réponses</summary><ul>${recap}</ul></details>
  </div>`);
  let speech = Voice.line(r.medal || 'none');
  if (r.beltUp) speech += ' ' + Voice.line('belt', { belt: r.beltUp.name });
  if (r.newTrophies.length) speech += ' ' + Voice.line('trophy', { t: r.newTrophies.map(t => t.name).join(', ') });
  setTimeout(() => { Sfx.play(r.medal ? 'fanfare' : 'gong'); Voice.say(speech); }, 250);
  if (r.medal === 'or' || r.beltUp) confetti();
  if (r.beltUp) setTimeout(() => beltCeremony(r.beltUp), 900);
  on('#again', 'click', () => Q.daily ? startDaily() : startQuiz(Q.dojo, Q.mission));
  on('#nextm', 'click', () => startQuiz(Q.dojo, nextM));
}
function beltCeremony(belt) {
  confetti(100); Sfx.play('gong');
  modal(`<div class="ceremony"><div class="hero-mascot">${mascotSVG({ color: App.p.color, belt: belt.color, mood: 'happy' })}</div>
    <h2>Nouvelle ceinture !</h2><div class="belt-big" style="--belt:${belt.color}">Ceinture ${belt.name}</div>
    <p>Le dojo tout entier s'incline devant toi, ${U.esc(App.p.name)} !</p><button class="btn primary big" data-close>Hai ! 🙇</button></div>`, 'center');
}

App.init();
