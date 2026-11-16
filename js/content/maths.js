/* ===== Dojo des Nombres : Mathématiques CM2 ===== */
(function () {
  const { rand, pick, shuffle, nf, qcm, input, near, round, frac, fromBank } = U;
  const B = s => `<b>${s}</b>`;

  /* ---------- 1. Grands nombres ---------- */
  function bigNum() {
    const m = rand(1, 999);
    const th = pick([0, rand(1, 999), rand(1, 99)]);
    const un = pick([0, rand(1, 999), rand(1, 9) * 100]);
    const big = Math.random() < 0.2 ? rand(1, 9) * 1e9 : 0;
    return big + m * 1e6 + th * 1e3 + un;
  }
  const RANKS = ['unités', 'dizaines', 'centaines', 'unités de mille', 'dizaines de mille', 'centaines de mille', 'unités de millions', 'dizaines de millions', 'centaines de millions'];
  function grandsNombres() {
    const t = rand(0, 5);
    if (t === 0 || t === 5) {
      const n = bigNum();
      const m = Math.floor(n / 1e6), th = Math.floor(n / 1e3) % 1000, un = n % 1000;
      const wr = U.uniq([m * 1e6 + un * 1e3 + th, m * 1e7 + th * 1e3 + un, m * 1e5 + th * 1e2 + un, m * 1e6 + th * 1e4 + un, m * 1e3 + th + un * 10, n + 1000]).filter(x => x !== n && x > 0);
      if (t === 0) return qcm(`Comment s'écrit en chiffres :<br>${B('« ' + NumFr(n) + ' »')} ?`, nf(n), wr.map(nf), `${NumFr(n)} = ${nf(n)}. Range les chiffres par classes de 3 : milliards, millions, mille, unités.`);
      return qcm(`Comment s'écrit en lettres le nombre ${B(nf(n))} ?`, NumFr(n), wr.map(NumFr), `${nf(n)} se lit : ${NumFr(n)}.`);
    }
    if (t === 1) {
      const n = rand(10000000, 999999999); const r = rand(0, String(n).length - 1);
      const d = Math.floor(n / 10 ** r) % 10;
      return input(`Dans le nombre ${B(nf(n))}, quel est le chiffre des ${B(RANKS[r])} ?`, d, `Le chiffre des ${RANKS[r]} de ${nf(n)} est ${d}.`);
    }
    if (t === 2) {
      const n = rand(1000000, 99999999); const unit = pick([[1000, 'milliers'], [100, 'centaines'], [1e6, 'millions']]);
      const a = Math.floor(n / unit[0]);
      return input(`Combien y a-t-il de ${B(unit[1])} dans ${B(nf(n))} ?`, a, `Dans ${nf(n)}, il y a ${nf(a)} ${unit[1]} (on garde tous les chiffres à gauche du rang).`);
    }
    if (t === 3) {
      const a = rand(1000000, 999999999);
      const s = String(a); const pos = rand(0, s.length - 1);
      let nd = (Number(s[pos]) + rand(1, 8)) % 10; if (pos === 0 && nd === 0) nd = 1;
      const b = Math.random() < 0.15 ? a : Number(s.slice(0, pos) + nd + s.slice(pos + 1));
      const sign = a > b ? '>' : a < b ? '<' : '=';
      return qcm(`Quel signe faut-il mettre ?<br>${B(nf(a))} … ${B(nf(b))}`, sign, ['<', '>', '='], `On compare les chiffres de gauche à droite : ${nf(a)} ${sign} ${nf(b)}.`);
    }
    const n = rand(1000000, 99999999);
    const r = Math.round(n / 1e6) * 1e6;
    return qcm(`Arrondis ${B(nf(n))} au ${B('million')} le plus proche.`, nf(r), [nf(Math.floor(n / 1e6) * 1e6 === r ? r + 1e6 : r - 1e6), nf(Math.round(n / 1e5) * 1e5), nf(Math.round(n / 1e7) * 1e7 || 1e7), nf(r * 10), nf(r / 10 >= 1e6 ? r / 10 : r + 2e6), nf(Math.floor(n / 1e5) * 1e5)], `On regarde le chiffre des centaines de mille : ${nf(n)} est plus proche de ${nf(r)}.`);
  }

  /* ---------- 2. Calcul mental ---------- */
  function calculMental() {
    const t = rand(0, 6);
    if (t === 0) { const a = rand(3, 12), b = rand(3, 12); return input(`Calcule : ${B(a + ' × ' + b)}`, a * b, `${a} × ${b} = ${a * b}. Révise ta table de ${a} !`); }
    if (t === 1) { const a = round(rand(11, 999) / pick([1, 10, 100]), 2); const k = pick([10, 100, 1000]); const r = round(a * k); return input(`Calcule : ${B(nf(a) + ' × ' + nf(k))}`, r, `Multiplier par ${nf(k)}, c'est décaler les chiffres de ${String(k).length - 1} rang(s) vers la gauche : ${nf(r)}.`); }
    if (t === 2) { const a = rand(1, 9999); const k = pick([10, 100]); const r = round(a / k); return input(`Calcule : ${B(nf(a) + ' ÷ ' + k)}`, r, `Diviser par ${k}, c'est décaler les chiffres de ${String(k).length - 1} rang(s) vers la droite : ${nf(r)}.`); }
    if (t === 3) { const a = rand(12, 499) * (Math.random() < .5 ? 1 : 2); const dbl = Math.random() < .5; const r = dbl ? a * 2 : a / 2; if (!Number.isInteger(r)) return calculMental(); return input(`${dbl ? 'Quel est le double' : 'Quelle est la moitié'} de ${B(nf(a))} ?`, r, `${dbl ? 'Le double' : 'La moitié'} de ${nf(a)} est ${nf(r)}.`); }
    if (t === 4) { const a = pick([99, 199, 299, 999, 98, 101]); const b = rand(23, 487); return input(`Calcule astucieusement : ${B(nf(b) + ' + ' + a)}`, a + b, `Astuce ninja : ajoute ${Math.round(a / 100) * 100} puis corrige de ${a - Math.round(a / 100) * 100}. Résultat : ${nf(a + b)}.`); }
    if (t === 5) { const a = rand(1, 99) * 5 + (Math.random() < .5 ? 0 : rand(1, 4)); return input(`Combien faut-il ajouter à ${B(nf(a))} pour obtenir ${B('1 000')} ?`, 1000 - a, `${nf(a)} + ${nf(1000 - a)} = 1 000.`); }
    const a = rand(2, 9) * 10, b = rand(2, 9); return input(`Calcule : ${B(a + ' × ' + b)}`, a * b, `${a} × ${b} = ${a / 10 * b} dizaines = ${a * b}.`);
  }

  /* ---------- 3. Opérations ---------- */
  function operations() {
    const t = rand(0, 5);
    if (t === 0) { const a = rand(1000, 99999), b = rand(1000, 99999); return input(`Pose et calcule : ${B(nf(a) + ' + ' + nf(b))}`, a + b, `${nf(a)} + ${nf(b)} = ${nf(a + b)}. N'oublie pas les retenues !`); }
    if (t === 1) { const a = rand(10000, 99999), b = rand(1000, a - 1); return input(`Pose et calcule : ${B(nf(a) + ' − ' + nf(b))}`, a - b, `${nf(a)} − ${nf(b)} = ${nf(a - b)}. Vérifie : ${nf(a - b)} + ${nf(b)} = ${nf(a)}.`); }
    if (t === 2) { const a = rand(100, 999), b = rand(11, 99); return input(`Pose et calcule : ${B(a + ' × ' + b)}`, a * b, `${a} × ${b} = ${a} × ${b % 10} + ${a} × ${b - b % 10} = ${nf(a * (b % 10))} + ${nf(a * (b - b % 10))} = ${nf(a * b)}.`); }
    if (t === 3 || t === 4) {
      const d = rand(3, 12), q = rand(20, 999), r = rand(0, d - 1), n = d * q + r;
      const askQ = t === 3;
      return input(`Dans la division de ${B(nf(n))} par ${B(d)}, quel est le ${B(askQ ? 'quotient' : 'reste')} ?`, askQ ? q : r, `${nf(n)} = (${d} × ${nf(q)}) + ${r}. Le quotient est ${nf(q)} et le reste ${r} (toujours plus petit que ${d}).`);
    }
    const a = round(rand(100, 9999) / 100, 2), b = round(rand(10, 999) / 10, 1);
    return input(`Pose et calcule : ${B(nf(a) + ' + ' + nf(b))}`, round(a + b, 2), `Aligne les virgules ! ${nf(a)} + ${nf(b)} = ${nf(round(a + b, 2))}.`);
  }

  /* ---------- 4. Fractions ---------- */
  function bar(k, d) {
    let s = '<div class="fbar no-say">';
    for (let i = 0; i < d; i++) s += `<span class="${i < k ? 'on' : ''}"></span>`;
    return s + '</div>';
  }
  function fractions() {
    const t = rand(0, 5);
    if (t === 0) {
      const d = pick([3, 4, 5, 6, 8, 10]), k = rand(1, d - 1);
      return qcm(`Quelle fraction de la barre est coloriée ?${bar(k, d)}`, frac(k, d), [frac(d - k, d), frac(k, d + 1), frac(d, k), frac(k + 1, d)].filter(x => x !== frac(k, d)), `${k} parts coloriées sur ${d} parts égales : ${k}/${d}.`);
    }
    if (t === 1) {
      const d = pick([2, 3, 4, 5, 10]), k = rand(1, d - 1), q = d * rand(2, 12);
      return input(`Combien font ${frac(k, d)} de ${B(q)} ?`, q / d * k, `${q} ÷ ${d} = ${q / d}, puis ${q / d} × ${k} = ${q / d * k}.`);
    }
    if (t === 2) {
      const d = pick([10, 100, 1000]), k = rand(1, d * 3 - 1);
      return input(`Écris ${frac(k, d)} sous forme d'un nombre décimal.`, round(k / d), `${k}/${d} = ${nf(round(k / d))}.`);
    }
    if (t === 3) {
      const d = rand(2, 9), k = pick([d, rand(1, d - 1), d + rand(1, 5)]);
      const a = k > d ? 'plus grande que 1' : k < d ? 'plus petite que 1' : 'égale à 1';
      return qcm(`La fraction ${frac(k, d)} est…`, a, ['plus grande que 1', 'plus petite que 1', 'égale à 1'], `Le numérateur (${k}) est ${k > d ? 'plus grand que' : k < d ? 'plus petit que' : 'égal à'} le dénominateur (${d}), donc la fraction est ${a}.`);
    }
    if (t === 4) {
      const d = rand(4, 12), a = rand(1, d - 2), b = rand(1, d - a);
      return qcm(`Calcule : ${frac(a, d)} + ${frac(b, d)}`, frac(a + b, d), [frac(a + b, d * 2), frac(a * b, d), frac(a + b + 1, d), frac(a + b, d + 1)], `Même dénominateur : on additionne les numérateurs. ${a} + ${b} = ${a + b}, donc ${a + b}/${d}.`);
    }
    const base = pick([[1, 2], [1, 3], [1, 4], [2, 3], [3, 4], [2, 5]]); const m = rand(2, 5);
    const good = frac(base[0] * m, base[1] * m);
    return qcm(`Quelle fraction est égale à ${frac(base[0], base[1])} ?`, good, [frac(base[0] + m, base[1] + m), frac(base[0] * m, base[1] * m + 1), frac(base[1], base[0]), frac(base[0] * m + 1, base[1] * m)], `On multiplie le numérateur et le dénominateur par ${m} : ${base[0]}/${base[1]} = ${base[0] * m}/${base[1] * m}.`);
  }

  /* ---------- 5. Décimaux ---------- */
  function decimaux() {
    const t = rand(0, 5);
    if (t === 0) {
      const e = rand(0, 20), a = round(e + rand(1, 9) / 10, 1), b = round(e + rand(11, 99) / 100, 2);
      const [x, y] = shuffle([a, b]); const s = x > y ? '>' : x < y ? '<' : '=';
      return qcm(`Quel signe faut-il mettre ?<br>${B(nf(x))} … ${B(nf(y))}`, s, ['<', '>', '='], `Attention au piège ! Compare les dixièmes d'abord : ${nf(x)} ${s} ${nf(y)}. (Astuce : ${nf(a)} = ${a.toFixed(2).replace('.', ',')})`);
    }
    if (t === 1) {
      const n = round(rand(1, 999) + rand(1, 999) / 1000, 3); const s = n.toFixed(3).split('.')[1];
      const r = rand(0, 2); const name = ['dixièmes', 'centièmes', 'millièmes'][r];
      return input(`Dans ${B(n.toFixed(3).replace('.', ','))}, quel est le chiffre des ${B(name)} ?`, Number(s[r]), `Après la virgule : dixièmes, centièmes, millièmes. Le chiffre des ${name} est ${s[r]}.`);
    }
    if (t === 2) {
      const e = rand(1, 9); const arr = U.uniq([round(e + rand(1, 9) / 10, 2), round(e + rand(10, 99) / 100, 2), round(e + rand(1, 9) / 100, 2), round(e + rand(100, 999) / 1000, 3)]);
      if (arr.length < 4) return decimaux();
      const min = Math.min(...arr);
      return qcm(`Quel est le ${B('plus petit')} nombre ?`, nf(min), arr.filter(x => x !== min).map(nf), `En rangeant : ${arr.slice().sort((a, b) => a - b).map(nf).join(' < ')}.`);
    }
    if (t === 3) {
      const a = round(rand(100, 9999) / 100, 2), b = round(rand(10, 999) / 100, 2);
      const add = Math.random() < .5 || b > a; const r = round(add ? a + b : a - b, 2);
      return input(`Calcule : ${B(nf(a) + (add ? ' + ' : ' − ') + nf(b))}`, r, `En alignant les virgules : ${nf(a)} ${add ? '+' : '−'} ${nf(b)} = ${nf(r)}.`);
    }
    if (t === 4) {
      const n = round(rand(100, 9999) / 100, 2); const r = Math.round(n);
      return input(`Arrondis ${B(nf(n))} à l'${B('unité')} la plus proche.`, r, `On regarde le chiffre des dixièmes : ${nf(n)} est plus proche de ${r}.`);
    }
    const n = round(rand(101, 9999) / 100, 2); if (Number.isInteger(n)) return decimaux();
    const f = Math.floor(n);
    return qcm(`Entre quels nombres entiers se trouve ${B(nf(n))} ?`, `${f} et ${f + 1}`, [`${f - 1} et ${f}`, `${f + 1} et ${f + 2}`, `${Math.floor(n * 10)} et ${Math.floor(n * 10) + 1}`], `${f} < ${nf(n)} < ${f + 1}.`);
  }

  /* ---------- 6. Proportionnalité ---------- */
  function proportionnalite() {
    const t = rand(0, 5);
    if (t === 0) {
      const p = rand(2, 9), n1 = rand(2, 6); let n2 = rand(3, 12); if (n2 === n1) n2++;
      const obj = pick(['bandeaux', 'shurikens en mousse', 'cahiers', 'bols de riz']);
      return input(`${n1} ${obj} coûtent ${n1 * p} €. Combien coûtent ${B(n2 + ' ' + obj)} ?`, n2 * p, `1 objet coûte ${n1 * p} ÷ ${n1} = ${p} €, donc ${n2} coûtent ${n2} × ${p} = ${n2 * p} €.`, { unit: '€' });
    }
    if (t === 1) {
      const per = pick([25, 50, 30, 100, 20]), ing = pick(['g de farine', 'g de riz', 'g de sucre', 'mL de lait']); const n2 = pick([2, 6, 8, 10, 12]);
      return input(`Pour 4 ninjas, le cuisinier utilise ${4 * per} ${ing}. Combien en faut-il pour ${B(n2 + ' ninjas')} ?`, per * n2, `Pour 1 ninja : ${4 * per} ÷ 4 = ${per}. Pour ${n2} : ${per} × ${n2} = ${per * n2}.`, { unit: ing.split(' ')[0] });
    }
    if (t === 2) {
      const pc = pick([10, 25, 50, 20]); const q = pick([40, 60, 80, 100, 120, 200, 300, 400]);
      return input(`Combien font ${B(pc + ' %')} de ${B(q)} ?`, q * pc / 100, `${pc} % = ${pc}/100. ${q} × ${pc} ÷ 100 = ${q * pc / 100}.`);
    }
    if (t === 3) {
      const v = rand(3, 12), h = rand(2, 6);
      return input(`Un ninja court ${v} km en 1 heure. Quelle distance parcourt-il en ${B(h + ' heures')} à la même vitesse ?`, v * h, `${v} × ${h} = ${v * h} km.`, { unit: 'km' });
    }
    if (t === 4) {
      const k = rand(2, 9), a = rand(2, 9); let b = rand(2, 12); if (b === a) b++;
      return input(`Ce tableau est un tableau de proportionnalité :<div class="ptable no-say"><table><tr><td>${a}</td><td>${b}</td></tr><tr><td>${a * k}</td><td>?</td></tr></table></div>Quel nombre remplace le « ? » ?`, b * k, `On multiplie par ${k} (car ${a} × ${k} = ${a * k}) : ${b} × ${k} = ${b * k}.`);
    }
    const e = pick([2, 5, 10, 50]), c = rand(2, 12);
    return input(`Sur une carte, ${B('1 cm')} représente ${B(e + ' km')}. Combien de km représentent ${B(c + ' cm')} ?`, e * c, `${c} × ${e} = ${e * c} km.`, { unit: 'km' });
  }

  /* ---------- 7. Mesures ---------- */
  const UNITS = {
    longueur: [['km', 3], ['m', 0], ['cm', -2], ['mm', -3]],
    masse: [['kg', 3], ['g', 0], ['mg', -3]],
    contenance: [['L', 0], ['dL', -1], ['cL', -2], ['mL', -3]]
  };
  function hm(m) { const h = Math.floor(m / 60) % 24, mi = m % 60; return `${h} h ${String(mi).padStart(2, '0')}`; }
  function mesures() {
    const t = rand(0, 6);
    if (t <= 2) {
      const fam = pick(Object.keys(UNITS)); const L = UNITS[fam];
      let i = rand(0, L.length - 1), j = rand(0, L.length - 1); if (i === j) j = (i + 1) % L.length;
      const from = L[i], to = L[j];
      const v = from[1] > to[1] ? pick([rand(1, 25), round(rand(11, 99) / 10, 1)]) : rand(1, 99) * 10 ** Math.min(3, from[1] - to[1] < 0 ? to[1] - from[1] : 1);
      const r = round(v * 10 ** (from[1] - to[1]), 6);
      return input(`Convertis : ${B(nf(v) + ' ' + from[0])} = ? ${B(to[0])}`, r, `1 ${from[0]} = ${nf(round(10 ** (from[1] - to[1]), 6))} ${to[0]}, donc ${nf(v)} ${from[0]} = ${nf(r)} ${to[0]}.`, { unit: to[0] });
    }
    if (t === 3) { const h = rand(1, 4), m = rand(1, 59); return input(`Combien de minutes font ${B(h + ' h ' + m + ' min')} ?`, h * 60 + m, `${h} h = ${h * 60} min, + ${m} min = ${h * 60 + m} min.`, { unit: 'min' }); }
    if (t === 4) {
      const s = rand(7 * 12, 18 * 12) * 5, d = rand(3, 30) * 5;
      return input(`Combien de minutes s'écoulent entre ${B(hm(s))} et ${B(hm(s + d))} ?`, d, `De ${hm(s)} à ${hm(s + d)}, il s'écoule ${d} minutes.`, { unit: 'min' });
    }
    if (t === 5) {
      const s = rand(8 * 12, 18 * 12) * 5, d = rand(6, 30) * 5; const e = s + d;
      return qcm(`Un entraînement ninja commence à ${B(hm(s))} et dure ${B(Math.floor(d / 60) ? Math.floor(d / 60) + ' h ' + (d % 60) + ' min' : d + ' min')}. À quelle heure se termine-t-il ?`, hm(e), [hm(e + 10), hm(e - 10), hm(e + 60), hm(s + (d % 60))].filter(x => x !== hm(e)), `${hm(s)} + ${d} min = ${hm(e)}.`);
    }
    const c = pick([['semaines', 7, 'jours'], ['siècles', 100, 'ans'], ['ans', 12, 'mois'], ['minutes', 60, 'secondes'], ['jours', 24, 'heures']]); const n = rand(2, 9);
    return input(`Combien y a-t-il de ${B(c[2])} dans ${B(n + ' ' + c[0])} ?`, n * c[1], `1 ${c[0].replace(/s$/, '')} = ${c[1]} ${c[2]}, donc ${n} × ${c[1]} = ${n * c[1]}.`, { unit: c[2] });
  }

  /* ---------- 8. Géométrie ---------- */
  const GEO = [
    ['Un polygone à 6 côtés est un…', 'hexagone', ['pentagone', 'octogone', 'heptagone']],
    ['Un polygone à 5 côtés est un…', 'pentagone', ['hexagone', 'quadrilatère', 'octogone']],
    ['Un polygone à 8 côtés est un…', 'octogone', ['hexagone', 'pentagone', 'décagone']],
    ['Combien de faces a un cube ?', '6', ['4', '8', '12']],
    ['Combien d\'arêtes a un cube ?', '12', ['6', '8', '10']],
    ['Combien de sommets a un cube ?', '8', ['6', '4', '12']],
    ['Un angle de 90° est un angle…', 'droit', ['aigu', 'obtus', 'plat']],
    ['Un angle plus petit qu\'un angle droit est un angle…', 'aigu', ['obtus', 'plat', 'droit']],
    ['Un angle plus grand qu\'un angle droit (mais moins de 180°) est un angle…', 'obtus', ['aigu', 'droit', 'nul']],
    ['Un triangle qui a 3 côtés de même longueur est…', 'équilatéral', ['isocèle', 'rectangle', 'quelconque']],
    ['Un triangle qui a 2 côtés de même longueur est…', 'isocèle', ['équilatéral', 'rectangle', 'quelconque']],
    ['Un triangle qui a un angle droit est un triangle…', 'rectangle', ['isocèle', 'équilatéral', 'obtus']],
    ['Un quadrilatère avec 4 angles droits et 4 côtés égaux est un…', 'carré', ['losange', 'trapèze', 'parallélogramme']],
    ['Un quadrilatère avec 4 côtés égaux (sans forcément d\'angle droit) est un…', 'losange', ['rectangle', 'trapèze', 'triangle']],
    ['Le segment qui relie le centre d\'un cercle à un point du cercle est le…', 'rayon', ['diamètre', 'périmètre', 'côté']],
    ['Le segment qui traverse le cercle en passant par son centre est le…', 'diamètre', ['rayon', 'périmètre', 'sommet']],
    ['Deux droites qui se coupent en formant un angle droit sont…', 'perpendiculaires', ['parallèles', 'identiques', 'courbes']],
    ['Deux droites qui ne se coupent jamais sont…', 'parallèles', ['perpendiculaires', 'sécantes', 'obliques']],
    ['Quel instrument sert à tracer un angle droit ?', 'l\'équerre', ['le compas', 'le rapporteur… de cantine', 'la gomme']],
    ['Quel instrument sert à tracer un cercle ?', 'le compas', ['l\'équerre', 'la règle', 'le crayon seul']]
  ];
  function geometrie() {
    const t = rand(0, 5);
    if (t === 0) { const L = rand(5, 30), l = rand(2, L - 1); return input(`Quel est le ${B('périmètre')} d'un rectangle de longueur ${L} cm et de largeur ${l} cm ?`, 2 * (L + l), `P = (L + l) × 2 = (${L} + ${l}) × 2 = ${2 * (L + l)} cm.`, { unit: 'cm' }); }
    if (t === 1) { const L = rand(3, 15), l = rand(2, 12); return input(`Quelle est l'${B('aire')} d'un rectangle de ${L} cm sur ${l} cm ?`, L * l, `A = L × l = ${L} × ${l} = ${L * l} cm².`, { unit: 'cm²' }); }
    if (t === 2) { const c = rand(2, 25); const per = Math.random() < .5; return input(`${per ? 'Quel est le ' + B('périmètre') : 'Quelle est l\'' + B('aire')} d'un carré de côté ${c} cm ?`, per ? 4 * c : c * c, per ? `P = côté × 4 = ${c} × 4 = ${4 * c} cm.` : `A = côté × côté = ${c} × ${c} = ${c * c} cm².`, { unit: per ? 'cm' : 'cm²' }); }
    if (t === 3) { const r = rand(2, 15); return input(`Le ${B('rayon')} d'un cercle mesure ${r} cm. Combien mesure son ${B('diamètre')} ?`, 2 * r, `Diamètre = 2 × rayon = ${2 * r} cm.`, { unit: 'cm' }); }
    return fromBank(pick(GEO));
  }

  /* ---------- 9. Problèmes ---------- */
  function problemes() {
    const t = rand(0, 8);
    if (t === 0) { const a = rand(12, 48), b = rand(4, 12); return input(`Le ninja Kenji lance ${a} shurikens à chaque entraînement. Il s'entraîne ${b} fois. Combien de shurikens lance-t-il en tout ?`, a * b, `${a} × ${b} = ${a * b} shurikens.`); }
    if (t === 1) { const a = rand(150, 600), b = rand(20, 150), c = rand(10, 140); return input(`Le dojo possède ${a} tatamis. On en achète ${b}, puis ${c} sont abîmés et jetés. Combien de tatamis reste-t-il ?`, a + b - c, `${a} + ${b} − ${c} = ${a + b - c}.`); }
    if (t === 2) { const n = rand(3, 9), q = rand(12, 45); return input(`Yuki partage ${n * q} onigiris équitablement entre ${n} ninjas. Combien chaque ninja en reçoit-il ?`, q, `${n * q} ÷ ${n} = ${q}.`); }
    if (t === 3) { const s = rand(25, 60), m = rand(8, 20), a = rand(2, 4), b = rand(2, 5); return input(`Un sabre en bois coûte ${s} € et un masque ${m} €. Le sensei achète ${a} sabres et ${b} masques. Combien paie-t-il ?`, a * s + b * m, `(${a} × ${s}) + (${b} × ${m}) = ${a * s} + ${b * m} = ${a * s + b * m} €.`, { unit: '€' }); }
    if (t === 4) { const tot = pick([200, 300, 500]), p = rand(15, 45), n = rand(2, Math.min(6, Math.floor((tot - 10) / p))); return input(`Le sensei a ${tot} €. Il achète ${n} kimonos à ${p} € chacun. Combien d'argent lui reste-t-il ?`, tot - n * p, `${n} × ${p} = ${n * p} €, puis ${tot} − ${n * p} = ${tot - n * p} €.`, { unit: '€' }); }
    if (t === 5) { const tour = pick([250, 400, 750, 600, 125]), n = rand(2, 8); return input(`Une course de ninjas fait ${n} tours de ${tour} m. Quelle est la distance totale en ${B('km')} ?`, round(n * tour / 1000, 3), `${n} × ${tour} = ${n * tour} m = ${nf(round(n * tour / 1000, 3))} km.`, { unit: 'km' }); }
    if (t === 6) { const e = rand(20, 60), p = pick([8, 9, 12, 15]); const r = Math.ceil(e / p); if (e % p === 0) return problemes(); return input(`Les ${e} élèves du dojo partent en sortie. Un minibus a ${p} places. Combien de minibus faut-il ${B('au minimum')} ?`, r, `${e} ÷ ${p} = ${Math.floor(e / p)} reste ${e % p} : il faut un minibus de plus pour les ${e % p} derniers, soit ${r}.`); }
    if (t === 7) { const y = rand(15, 60), k = rand(2, 5); return input(`Yuki a ${y} shurikens. Kenji en a ${k} fois plus. Combien en ont-ils ${B('ensemble')} ?`, y + y * k, `Kenji : ${y} × ${k} = ${y * k}. Ensemble : ${y} + ${y * k} = ${y * (k + 1)}.`); }
    const kg = rand(2, 5), g = pick([150, 200, 250, 300, 350]), j = rand(2, Math.floor(kg * 1000 / g)); return input(`Le cuisinier du dojo a un sac de ${kg} kg de riz. Il en utilise ${g} g par jour. Combien de grammes reste-t-il après ${j} jours ?`, kg * 1000 - g * j, `${kg} kg = ${kg * 1000} g. ${g} × ${j} = ${g * j} g. ${kg * 1000} − ${g * j} = ${kg * 1000 - g * j} g.`, { unit: 'g' });
  }

  DOJOS.push({
    id: 'maths', name: 'Dojo des Nombres', subject: 'Mathématiques', icon: '🔢', color: '#e63946',
    missions: [
      { id: 'grands-nombres', title: 'Les grands nombres', icon: '🏔️', desc: 'Lire, écrire, comparer jusqu\'aux milliards', gen: grandsNombres },
      { id: 'calcul-mental', title: 'Calcul mental éclair', icon: '⚡', desc: 'Tables, ×10, ×100, astuces', gen: calculMental },
      { id: 'operations', title: 'Les opérations', icon: '➗', desc: 'Addition, soustraction, multiplication, division', gen: operations },
      { id: 'fractions', title: 'Les fractions', icon: '🍙', desc: 'Lire, comparer, additionner les fractions', gen: fractions },
      { id: 'decimaux', title: 'Les nombres décimaux', icon: '🎯', desc: 'Comparer, ranger, calculer, arrondir', gen: decimaux },
      { id: 'proportionnalite', title: 'Proportionnalité', icon: '⚖️', desc: 'Recettes, prix, pourcentages, échelles', gen: proportionnalite },
      { id: 'mesures', title: 'Mesures et durées', icon: '⏳', desc: 'Conversions de longueurs, masses, durées', gen: mesures },
      { id: 'geometrie', title: 'Géométrie', icon: '📐', desc: 'Figures, périmètres, aires, angles', gen: geometrie },
      { id: 'problemes', title: 'Problèmes de ninja', icon: '🧠', desc: 'Résoudre des problèmes en plusieurs étapes', gen: problemes }
    ]
  });
})();
