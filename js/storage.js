/* ===== Gestion des comptes et sauvegardes ===== */
const Store = {
  KEY: 'ninjaNoa.v1',
  mem: null,
  hash(pin, salt) {
    let h = 5381; const s = salt + ':' + pin + ':ninja';
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return h.toString(36);
  },
  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      const db = raw ? JSON.parse(raw) : null;
      if (db && db.profiles) return db;
    } catch (e) { /* stockage indisponible */ }
    return this.mem || { version: 1, profiles: {}, last: null };
  },
  save(db) {
    this.mem = db;
    try { localStorage.setItem(this.KEY, JSON.stringify(db)); return true; } catch (e) { return false; }
  },
  requestPersist() {
    try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { }
  },
  newProfile(name, color, pin) {
    const id = 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    return {
      id, name, color, pinHash: pin ? this.hash(pin, id) : null,
      createdAt: Date.now(), updatedAt: Date.now(),
      xp: 0, missions: {}, trophies: {}, daily: {},
      stats: { answered: 0, correct: 0, bestCombo: 0, perfects: 0, missionsPlayed: 0, days: [], dojosPlayed: {}, improved: 0 },
      settings: { voice: true, autoRead: false, sound: true, unlockAll: false, voiceName: '', pitch: 0.7, rate: 0.95 }
    };
  },
  fixProfile(p) {
    const base = this.newProfile(p.name || 'Ninja', p.color || '#e63946', null);
    p.stats = Object.assign(base.stats, p.stats || {});
    p.settings = Object.assign(base.settings, p.settings || {});
    ['missions', 'trophies', 'daily'].forEach(k => { p[k] = p[k] || {}; });
    p.xp = p.xp || 0;
    return p;
  },
  /* Export d'un profil : fichier JSON */
  exportData(profile) {
    return JSON.stringify({ app: 'ninja-noa', version: 1, exportedAt: new Date().toISOString(), profile }, null, 1);
  },
  exportCode(profile) {
    const json = JSON.stringify({ app: 'ninja-noa', version: 1, profile });
    return 'NINJA-' + btoa(unescape(encodeURIComponent(json)));
  },
  parseImport(text) {
    text = String(text).trim();
    let obj;
    if (text.startsWith('NINJA-')) obj = JSON.parse(decodeURIComponent(escape(atob(text.slice(6).replace(/\s/g, '')))));
    else obj = JSON.parse(text);
    if (!obj || obj.app !== 'ninja-noa' || !obj.profile || !obj.profile.id) throw new Error('Fichier de sauvegarde invalide');
    return this.fixProfile(obj.profile);
  },
  download(filename, text) {
    const blob = new Blob([text], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
};
