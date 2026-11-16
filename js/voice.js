/* ===== Voix du Sensei (synthèse vocale) et effets sonores ===== */
const Voice = {
  supported: 'speechSynthesis' in window,
  voices: [], settings: { voice: true, pitch: 0.7, rate: 0.95, voiceName: '' },
  init() {
    if (!this.supported) return;
    const load = () => { this.voices = speechSynthesis.getVoices(); };
    load();
    speechSynthesis.onvoiceschanged = load;
  },
  frVoices() { return this.voices.filter(v => /^fr/i.test(v.lang)); },
  pickVoice(lang) {
    if (/^en/.test(lang)) return this.voices.find(v => /^en-GB/i.test(v.lang)) || this.voices.find(v => /^en/i.test(v.lang)) || null;
    const fr = this.frVoices();
    if (this.settings.voiceName) { const v = fr.find(x => x.name === this.settings.voiceName); if (v) return v; }
    return fr.find(v => /thomas|paul|henri|daniel|nicolas|mathieu|antoine|guillaume|homme|male/i.test(v.name)) || fr.find(v => /fr-FR/i.test(v.lang)) || fr[0] || null;
  },
  say(text, opts = {}) {
    if (!this.supported || (!this.settings.voice && !opts.force) || !text) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const lang = opts.lang || 'fr-FR';
      u.lang = lang;
      const v = this.pickVoice(lang); if (v) u.voice = v;
      u.pitch = opts.pitch ?? (/^en/.test(lang) ? 1 : this.settings.pitch);
      u.rate = opts.rate ?? (/^en/.test(lang) ? 0.85 : this.settings.rate);
      speechSynthesis.speak(u);
    } catch (e) { }
  },
  stop() { if (this.supported) try { speechSynthesis.cancel(); } catch (e) { } },
  line(kind, vars = {}) {
    const L = SENSEI_LINES[kind]; if (!L) return '';
    return U.pick(L).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
  }
};

const SENSEI_LINES = {
  welcome: ['Bienvenue au dojo, {name} ! Prêt pour l\'entraînement ?', 'Ah, {name} ! Le sensei t\'attendait.', 'Hai ! Content de te revoir, {name}. Que l\'entraînement commence !', 'Konnichiwa {name} ! Ton sabre de la connaissance est-il bien aiguisé ?'],
  newProfile: ['Bienvenue, {name} ! Je suis Maître Kuro, ton sensei. Ensemble, nous allons gagner toutes les ceintures !'],
  start: ['Concentre-toi, jeune ninja. Que l\'épreuve commence !', 'Respire… observe… et frappe juste !', 'Hai ! En garde, ninja !', 'Le silence avant l\'action. C\'est parti !'],
  correct: ['Hai ! Bien joué !', 'Excellent, jeune ninja !', 'Parfait ! Rapide comme l\'éclair.', 'Juste ! Ton esprit est affûté comme un sabre.', 'Bravo ! Le sensei est fier de toi.', 'Yoshi ! Bonne réponse !', 'Magnifique ! Un vrai coup de maître.'],
  combo: ['Combo de {n} ! Tu es inarrêtable !', 'Incroyable ! {n} bonnes réponses d\'affilée !', 'La force du ninja est en toi : combo de {n} !'],
  wrong: ['Hmm… même le plus grand ninja trébuche parfois.', 'Pas tout à fait. Observe bien la correction.', 'Raté ! Mais l\'erreur est le chemin de la sagesse.', 'Courage ! Un ninja se relève toujours.', 'Aïe ! Regarde bien la bonne réponse, tu l\'auras la prochaine fois.'],
  or: ['Médaille d\'or ! Tu es digne des plus grands maîtres !', 'Sensationnel ! L\'or brille sur ton kimono !'],
  argent: ['Médaille d\'argent ! Très beau travail, ninja !', 'L\'argent ! Encore un petit effort et l\'or sera à toi.'],
  bronze: ['Médaille de bronze ! Tu progresses sur la voie du ninja.', 'Le bronze est à toi ! Recommence pour viser plus haut.'],
  none: ['Pas de médaille cette fois. Un ninja s\'entraîne encore et encore !', 'Ne lâche rien ! Recommence et tu y arriveras.'],
  belt: ['Incroyable ! Tu obtiens la ceinture {belt} !', 'Le dojo s\'incline devant toi : voici ta ceinture {belt} !'],
  trophy: ['Nouvelle coupe gagnée : {t} !'],
  daily: ['Le défi du Sensei : dix questions de tous les dojos. Montre-moi ta valeur !']
};

/* Petits effets sonores synthétisés (aucun fichier audio) */
const Sfx = {
  ctx: null, enabled: true,
  c() { if (!this.ctx) { const A = window.AudioContext || window.webkitAudioContext; if (A) this.ctx = new A(); } if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); return this.ctx; },
  tone(freq, dur, type = 'sine', vol = 0.15, when = 0, slide = 0) {
    const c = this.c(); if (!c) return;
    const t = c.currentTime + when;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.05);
  },
  swoosh() {
    const c = this.c(); if (!c) return;
    const len = c.sampleRate * 0.25, buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / len);
    const s = c.createBufferSource(); s.buffer = buf;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.setValueAtTime(800, c.currentTime); f.frequency.exponentialRampToValueAtTime(4000, c.currentTime + 0.25);
    const g = c.createGain(); g.gain.value = 0.25;
    s.connect(f).connect(g).connect(c.destination); s.start();
  },
  play(kind) {
    if (!this.enabled) return;
    try {
      if (kind === 'correct') { this.swoosh(); this.tone(880, 0.12, 'triangle', 0.12, 0.05); this.tone(1320, 0.2, 'triangle', 0.12, 0.13); }
      else if (kind === 'wrong') { this.tone(220, 0.35, 'sawtooth', 0.06, 0, 110); }
      else if (kind === 'gong') { this.tone(110, 2.2, 'sine', 0.3); this.tone(165, 1.8, 'sine', 0.12); this.tone(277, 1.2, 'sine', 0.05); }
      else if (kind === 'click') { this.tone(600, 0.05, 'square', 0.04); }
      else if (kind === 'fanfare') { [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.3, 'triangle', 0.12, i * 0.12)); }
      else if (kind === 'swoosh') this.swoosh();
    } catch (e) { }
  }
};
