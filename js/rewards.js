/* ===== Ceintures, médailles et coupes ===== */
const BELTS = [
  { name: 'blanche', xp: 0, color: '#f4f4f4' },
  { name: 'jaune', xp: 150, color: '#ffd60a' },
  { name: 'orange', xp: 400, color: '#fb8500' },
  { name: 'verte', xp: 800, color: '#2a9d8f' },
  { name: 'bleue', xp: 1400, color: '#3a86ff' },
  { name: 'violette', xp: 2200, color: '#8338ec' },
  { name: 'marron', xp: 3200, color: '#8d5524' },
  { name: 'noire', xp: 4500, color: '#111111' }
];
function beltFor(xp) {
  let i = 0; BELTS.forEach((b, k) => { if (xp >= b.xp) i = k; });
  const b = BELTS[i], next = BELTS[i + 1] || null;
  const pct = next ? Math.round((xp - b.xp) / (next.xp - b.xp) * 100) : 100;
  return Object.assign({ index: i, next, pct }, b);
}
const MEDALS = {
  or: { label: 'Or', icon: '🥇', rank: 3, bonus: 50 },
  argent: { label: 'Argent', icon: '🥈', rank: 2, bonus: 30 },
  bronze: { label: 'Bronze', icon: '🥉', rank: 1, bonus: 15 }
};
function medalFor(score, total) {
  const r = score / total;
  if (r >= 0.9) return 'or'; if (r >= 0.7) return 'argent'; if (r >= 0.5) return 'bronze'; return null;
}
function medalRank(m) { return m ? MEDALS[m].rank : 0; }

function streakOf(days) {
  if (!days || !days.length) return 0;
  const set = new Set(days); let n = 0; const d = new Date();
  if (!set.has(U.today(d))) d.setDate(d.getDate() - 1);
  while (set.has(U.today(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function medalCount(p, kind, dojoId) {
  return Object.entries(p.missions).filter(([k, v]) => (!dojoId || k.startsWith(dojoId + '.')) && (kind ? medalRank(v.medal) >= MEDALS[kind].rank : v.medal)).length;
}
function dojoComplete(p, dojo, kind) { return dojo.missions.every(m => { const r = p.missions[dojo.id + '.' + m.id]; return r && medalRank(r.medal) >= MEDALS[kind].rank; }); }

/* Liste des coupes (trophées) */
function buildTrophies() {
  const T = [
    { id: 'first', icon: '🎌', name: 'Premier pas', desc: 'Termine ta première mission', test: p => p.stats.missionsPlayed >= 1 },
    { id: 'first-gold', icon: '🥇', name: 'Éclat d\'or', desc: 'Gagne ta première médaille d\'or', test: p => medalCount(p, 'or') >= 1 },
    { id: 'perfect', icon: '💯', name: 'Sans faute', desc: 'Réussis une mission avec 10/10', test: p => p.stats.perfects >= 1 },
    { id: 'perfect5', icon: '🌟', name: 'Maître de la perfection', desc: '5 missions sans faute', test: p => p.stats.perfects >= 5 },
    { id: 'combo5', icon: '🔥', name: 'Enchaînement', desc: '5 bonnes réponses d\'affilée', test: p => p.stats.bestCombo >= 5 },
    { id: 'c100', icon: '🌀', name: 'Cent shurikens', desc: '100 bonnes réponses', test: p => p.stats.correct >= 100 },
    { id: 'c500', icon: '🎯', name: 'Tireur d\'élite', desc: '500 bonnes réponses', test: p => p.stats.correct >= 500 },
    { id: 'c1000', icon: '🐉', name: 'Souffle du dragon', desc: '1 000 bonnes réponses', test: p => p.stats.correct >= 1000 },
    { id: 'm10', icon: '🎖️', name: 'Collectionneur', desc: 'Obtiens 10 médailles', test: p => medalCount(p) >= 10 },
    { id: 'g10', icon: '👑', name: 'Trésor doré', desc: 'Obtiens 10 médailles d\'or', test: p => medalCount(p, 'or') >= 10 },
    { id: 'explorer', icon: '🧭', name: 'Explorateur', desc: 'Joue dans les 6 dojos', test: p => Object.keys(p.stats.dojosPlayed).length >= 6 },
    { id: 'improve', icon: '📈', name: 'Persévérance', desc: 'Améliore ta médaille sur une mission', test: p => p.stats.improved >= 1 },
    { id: 'streak3', icon: '📅', name: 'Régularité', desc: 'Joue 3 jours de suite', test: p => streakOf(p.stats.days) >= 3 },
    { id: 'streak7', icon: '🗓️', name: 'Discipline du ninja', desc: 'Joue 7 jours de suite', test: p => streakOf(p.stats.days) >= 7 },
    { id: 'daily1', icon: '⛩️', name: 'Défi relevé', desc: 'Termine un défi du Sensei', test: p => Object.keys(p.daily).length >= 1 },
    { id: 'daily10', icon: '🏮', name: 'Disciple fidèle', desc: 'Termine 10 défis du Sensei', test: p => Object.keys(p.daily).length >= 10 },
    { id: 'night', icon: '🌙', name: 'Ninja de l\'ombre', desc: 'Termine une mission après 19 h', test: (p, ctx) => ctx && ctx.hour >= 19 },
    { id: 'belt-green', icon: '🟢', name: 'Ceinture verte', desc: 'Atteins la ceinture verte', test: p => beltFor(p.xp).index >= 3 },
    { id: 'belt-black', icon: '⚫', name: 'Ceinture noire', desc: 'Atteins la ceinture noire', test: p => beltFor(p.xp).index >= 7 }
  ];
  DOJOS.forEach(d => {
    T.push({ id: 'cup-' + d.id, icon: '🏆', name: 'Coupe : ' + d.subject, desc: 'Une médaille dans toutes les missions du ' + d.name, test: p => dojoComplete(p, d, 'bronze'), dojo: d.id });
    T.push({ id: 'gold-' + d.id, icon: '🏆', gold: true, name: 'Coupe d\'or : ' + d.subject, desc: 'L\'or dans toutes les missions du ' + d.name, test: p => dojoComplete(p, d, 'or'), dojo: d.id });
  });
  T.push({ id: 'grand-master', icon: '🏯', gold: true, name: 'Grand Maître du CM2', desc: 'Toutes les coupes d\'or des 6 dojos', test: p => DOJOS.every(d => dojoComplete(p, d, 'or')) });
  return T;
}
function checkTrophies(p, ctx) {
  const got = [];
  TROPHIES.forEach(t => { if (!p.trophies[t.id] && t.test(p, ctx)) { p.trophies[t.id] = Date.now(); got.push(t); } });
  return got;
}
let TROPHIES = [];
