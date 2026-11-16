/* ===== Dojo des Mots : Français CM2 ===== */
(function () {
  const { rand, pick, shuffle, qcm, input, fromBank } = U;

  /* ---------- Conjugueur ---------- */
  const PRON = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];
  const PRON_LBL = ['je', 'tu', 'il / elle', 'nous', 'vous', 'ils / elles'];
  const TENSES = { pres: 'présent', imp: 'imparfait', fut: 'futur', pc: 'passé composé', ps: 'passé simple', cond: 'conditionnel présent' };
  const AU = t => (t === 'imp' ? "à l'" : 'au ') + TENSES[t];
  const E_IMP = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'];
  const E_FUT = ['ai', 'as', 'a', 'ons', 'ez', 'ont'];
  const IRR = {
    'être': { pres: 'suis es est sommes êtes sont', imp: 'ét', fut: 'ser', ps: 'fus fus fut fûmes fûtes furent', pp: 'été', aux: 'avoir' },
    'avoir': { pres: 'ai as a avons avez ont', imp: 'av', fut: 'aur', ps: 'eus eus eut eûmes eûtes eurent', pp: 'eu', aux: 'avoir' },
    'aller': { pres: 'vais vas va allons allez vont', imp: 'all', fut: 'ir', ps: 'allai allas alla allâmes allâtes allèrent', pp: 'allé', aux: 'être' },
    'faire': { pres: 'fais fais fait faisons faites font', imp: 'fais', fut: 'fer', ps: 'fis fis fit fîmes fîtes firent', pp: 'fait', aux: 'avoir' },
    'prendre': { pres: 'prends prends prend prenons prenez prennent', imp: 'pren', fut: 'prendr', ps: 'pris pris prit prîmes prîtes prirent', pp: 'pris', aux: 'avoir' },
    'venir': { pres: 'viens viens vient venons venez viennent', imp: 'ven', fut: 'viendr', ps: 'vins vins vint vînmes vîntes vinrent', pp: 'venu', aux: 'être' },
    'pouvoir': { pres: 'peux peux peut pouvons pouvez peuvent', imp: 'pouv', fut: 'pourr', ps: 'pus pus put pûmes pûtes purent', pp: 'pu', aux: 'avoir' },
    'voir': { pres: 'vois vois voit voyons voyez voient', imp: 'voy', fut: 'verr', ps: 'vis vis vit vîmes vîtes virent', pp: 'vu', aux: 'avoir' },
    'dire': { pres: 'dis dis dit disons dites disent', imp: 'dis', fut: 'dir', ps: 'dis dis dit dîmes dîtes dirent', pp: 'dit', aux: 'avoir' },
    'vouloir': { pres: 'veux veux veut voulons voulez veulent', imp: 'voul', fut: 'voudr', ps: 'voulus voulus voulut voulûmes voulûtes voulurent', pp: 'voulu', aux: 'avoir' }
  };
  const G1 = ['chanter', 'jouer', 'danser', 'parler', 'marcher', 'sauter', 'grimper', 'regarder', 'écouter', 'aimer', 'trouver', 'cacher'];
  const G2 = ['finir', 'choisir', 'grandir', 'réussir', 'bondir', 'obéir'];
  const ALL = [...G1, ...G2, ...Object.keys(IRR)];

  function pc(aux, pp) {
    const a = aux === 'être' ? ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'] : ['ai', 'as', 'a', 'avons', 'avez', 'ont'];
    return a.map((x, i) => x + ' ' + pp + (aux === 'être' && i >= 3 ? 's' : ''));
  }
  function conj(v, t) {
    if (IRR[v]) {
      const x = IRR[v];
      return { pres: () => x.pres.split(' '), imp: () => E_IMP.map(e => x.imp + e), fut: () => E_FUT.map(e => x.fut + e), cond: () => E_IMP.map(e => x.fut + e), ps: () => x.ps.split(' '), pc: () => pc(x.aux, x.pp) }[t]();
    }
    const r = v.slice(0, -2);
    if (v.endsWith('er')) {
      return { pres: () => ['e', 'es', 'e', 'ons', 'ez', 'ent'].map(e => r + e), imp: () => E_IMP.map(e => r + e), fut: () => E_FUT.map(e => v + e), cond: () => E_IMP.map(e => v + e), ps: () => ['ai', 'as', 'a', 'âmes', 'âtes', 'èrent'].map(e => r + e), pc: () => pc('avoir', r + 'é') }[t]();
    }
    return { pres: () => ['is', 'is', 'it', 'issons', 'issez', 'issent'].map(e => r + e), imp: () => E_IMP.map(e => r + 'iss' + e), fut: () => E_FUT.map(e => v + e), cond: () => E_IMP.map(e => v + e), ps: () => ['is', 'is', 'it', 'îmes', 'îtes', 'irent'].map(e => r + e), pc: () => pc('avoir', r + 'i') }[t]();
  }
  function wp(i, f) { return i === 0 && /^[aeiouyéèêh]/i.test(f) ? "j'" + f : PRON[i] + ' ' + f; }
  function table(v, t) { return conj(v, t).map((f, i) => wp(i, f)).join(', '); }

  function conjQ(tenses, allowInput = true) {
    const t = pick(tenses);
    const pool = t === 'ps' ? [...G1, ...G2, 'être', 'avoir', 'aller', 'faire', 'prendre', 'venir', 'dire', 'voir'] : ALL;
    const v = pick(pool);
    const i = t === 'ps' ? pick([2, 5]) : rand(0, 5);
    const forms = conj(v, t);
    const ans = wp(i, forms[i]);
    const explain = `${v} ${AU(t)} : ${table(v, t)}.`;
    if (allowInput && Math.random() < 0.3 && !IRR[v]) {
      return input(`Écris le verbe <b>${v}</b> ${AU(t)} :<br><b>${i === 0 && /^[aeiouyéèêh]/i.test(forms[i]) ? "j'" : PRON_LBL[i]}</b> …`, [ans, forms[i]], explain, { placeholder: 'Écris le verbe conjugué' });
    }
    const wrongs = [];
    forms.forEach((f, j) => { if (j !== i) wrongs.push(wp(i, f)); });
    Object.keys(TENSES).forEach(o => { if (o !== t) wrongs.push(wp(i, conj(v, o)[i])); });
    const w = U.uniq(wrongs).filter(x => x !== ans);
    // garder 1 mauvaise terminaison + 2 autres temps pour plus de variété
    const sameT = shuffle(w.slice(0, 5)), other = shuffle(w.slice(5));
    return qcm(`Conjugue le verbe <b>${v}</b> ${AU(t)} avec « <b>${PRON_LBL[i]}</b> ».`, ans, [sameT[0], other[0], other[1], sameT[1]].filter(Boolean), explain);
  }

  function quelTemps() {
    for (let g = 0; g < 40; g++) {
      const v = pick(ALL), i = rand(0, 5), t = pick(Object.keys(TENSES));
      if (t === 'ps' && ![2, 5].includes(i)) continue;
      const f = conj(v, t)[i];
      const amb = Object.keys(TENSES).some(o => o !== t && conj(v, o)[i] === f);
      if (amb) continue;
      return qcm(`À quel temps est conjugué le verbe : « <b>${wp(i, f)}</b> » ?`, TENSES[t], Object.keys(TENSES).filter(o => o !== t).map(o => TENSES[o]), `« ${wp(i, f)} » : verbe ${v} ${AU(t)}.`);
    }
    return conjQ(['pres']);
  }

  /* ---------- Banques ---------- */
  const NATURE = [
    ['« Le ninja <b>agile</b> saute sur le toit. »<br>Quelle est la nature de « agile » ?', 'adjectif', ['nom', 'verbe', 'adverbe'], '« agile » précise le nom « ninja » : c\'est un adjectif qualificatif.'],
    ['« Kenji court <b>rapidement</b>. »<br>Quelle est la nature de « rapidement » ?', 'adverbe', ['adjectif', 'verbe', 'préposition'], 'Il modifie le verbe et il est invariable : c\'est un adverbe.'],
    ['« <b>Les</b> shurikens brillent. »<br>Quelle est la nature de « Les » ?', 'déterminant', ['pronom', 'nom', 'adjectif'], '« Les » est placé devant le nom « shurikens » : c\'est un déterminant (article défini).'],
    ['« <b>Elle</b> prépare son sabre. »<br>Quelle est la nature de « Elle » ?', 'pronom personnel', ['déterminant', 'nom propre', 'adverbe'], '« Elle » remplace un nom : c\'est un pronom personnel.'],
    ['« Le dojo est <b>sous</b> la colline. »<br>Quelle est la nature de « sous » ?', 'préposition', ['adverbe', 'conjonction', 'déterminant'], '« sous » introduit un complément : c\'est une préposition.'],
    ['« Il s\'entraîne <b>mais</b> il est fatigué. »<br>Quelle est la nature de « mais » ?', 'conjonction de coordination', ['préposition', 'adverbe', 'pronom'], 'mais, ou, et, donc, or, ni, car : les conjonctions de coordination.'],
    ['« Le maître <b>enseigne</b> la patience. »<br>Quelle est la nature de « enseigne » ?', 'verbe', ['nom', 'adjectif', 'adverbe'], 'On peut le conjuguer (j\'enseigne, il enseignait) : c\'est un verbe.'],
    ['« La <b>montagne</b> est enneigée. »<br>Quelle est la nature de « montagne » ?', 'nom commun', ['adjectif', 'verbe', 'nom propre'], 'Il est précédé d\'un déterminant (la) : c\'est un nom commun.'],
    ['« <b>Kyoto</b> est une ville du Japon. »<br>Quelle est la nature de « Kyoto » ?', 'nom propre', ['nom commun', 'adjectif', 'verbe'], 'Il commence par une majuscule et désigne une ville précise : nom propre.'],
    ['« <b>Ce</b> masque est noir. »<br>Quelle est la nature de « Ce » ?', 'déterminant démonstratif', ['pronom personnel', 'adjectif', 'déterminant possessif'], 'ce, cet, cette, ces : déterminants démonstratifs.'],
    ['« <b>Mon</b> bandeau est rouge. »<br>Quelle est la nature de « Mon » ?', 'déterminant possessif', ['déterminant démonstratif', 'pronom', 'adjectif'], 'mon, ton, son, notre… indiquent à qui appartient l\'objet.'],
    ['« Le sensei <b>le</b> regarde. »<br>Quelle est la nature de « le » ?', 'pronom personnel', ['déterminant', 'nom', 'adverbe'], 'Ici « le » est devant un verbe et remplace un nom : c\'est un pronom.'],
    ['« Il marche <b>très</b> lentement. »<br>Quelle est la nature de « très » ?', 'adverbe', ['adjectif', 'préposition', 'déterminant'], '« très » modifie l\'adverbe « lentement » : c\'est un adverbe.'],
    ['Quel mot est un <b>adjectif</b> ?', 'silencieux', ['silence', 'silencieusement', 'se taire'], '« silencieux » qualifie un nom (un ninja silencieux).'],
    ['Quel mot est un <b>verbe</b> à l\'infinitif ?', 'bondir', ['bond', 'vif', 'bondissement'], 'bondir se termine par -ir et se conjugue.'],
    ['Quel mot est un <b>adverbe</b> ?', 'doucement', ['doux', 'douceur', 'adoucir'], 'Beaucoup d\'adverbes se terminent par -ment.']
  ];
  const FONCTION = [
    ['« <b>Le jeune ninja</b> grimpe au mur. »<br>Quelle est la fonction du groupe en gras ?', 'sujet', ['COD', 'COI', 'complément circonstanciel'], 'Qui est-ce qui grimpe ? Le jeune ninja → sujet.'],
    ['« Kenji lance <b>un shuriken</b>. »<br>Quelle est la fonction du groupe en gras ?', 'COD', ['sujet', 'COI', 'attribut du sujet'], 'Kenji lance quoi ? un shuriken → complément d\'objet direct.'],
    ['« Yuki parle <b>à son maître</b>. »<br>Quelle est la fonction du groupe en gras ?', 'COI', ['COD', 'sujet', 'complément du nom'], 'Yuki parle à qui ? à son maître → complément d\'objet indirect (avec « à »).'],
    ['« <b>Le soir</b>, les ninjas s\'entraînent. »<br>Quelle est la fonction du groupe en gras ?', 'complément circonstanciel de temps', ['complément circonstanciel de lieu', 'COD', 'sujet'], 'Quand ? Le soir → CC de temps (on peut le déplacer ou le supprimer).'],
    ['« Ils se cachent <b>dans la forêt</b>. »<br>Quelle est la fonction du groupe en gras ?', 'complément circonstanciel de lieu', ['complément circonstanciel de temps', 'COI', 'attribut du sujet'], 'Où ? dans la forêt → CC de lieu.'],
    ['« Le ninja avance <b>sans bruit</b>. »<br>Quelle est la fonction du groupe en gras ?', 'complément circonstanciel de manière', ['complément circonstanciel de lieu', 'COD', 'sujet'], 'Comment ? sans bruit → CC de manière.'],
    ['« Le sensei est <b>sage</b>. »<br>Quelle est la fonction du mot en gras ?', 'attribut du sujet', ['COD', 'complément du nom', 'sujet'], 'Après le verbe « être », l\'adjectif qui décrit le sujet est attribut du sujet.'],
    ['« Dans le jardin chantent <b>les oiseaux</b>. »<br>Quelle est la fonction du groupe en gras ?', 'sujet', ['COD', 'complément circonstanciel de lieu', 'COI'], 'Qui est-ce qui chante ? les oiseaux : sujet inversé (placé après le verbe).'],
    ['Quel est le <b>verbe conjugué</b> dans : « Les élèves du dojo écoutent le sensei » ?', 'écoutent', ['élèves', 'dojo', 'sensei'], '« écoutent » est le verbe conjugué au présent.'],
    ['« Yuki <b>lui</b> offre un cadeau. »<br>Quelle est la fonction du pronom en gras ?', 'COI', ['COD', 'sujet', 'attribut du sujet'], 'Yuki offre un cadeau à qui ? à lui → COI.'],
    ['« Kenji <b>la</b> prend. »<br>Quelle est la fonction du pronom en gras ?', 'COD', ['COI', 'sujet', 'complément du nom'], 'Kenji prend quoi ? la (la boîte, par exemple) → COD.'],
    ['« Le dojo <b>de mon oncle</b> est grand. »<br>Quelle est la fonction du groupe en gras ?', 'complément du nom', ['COI', 'complément circonstanciel de lieu', 'sujet'], 'Il complète le nom « dojo » : complément du nom.'],
    ['Quelle phrase est une <b>phrase complexe</b> ?', 'Le ninja saute quand le gong sonne.', ['Le ninja saute.', 'Saute !', 'Quel beau saut !'], 'Une phrase complexe contient plusieurs verbes conjugués (saute, sonne).'],
    ['Quelle est la forme de la phrase : « Le ninja ne dort jamais. » ?', 'négative', ['affirmative', 'interrogative', 'exclamative'], '« ne… jamais » : c\'est la forme négative.'],
    ['« Que ce dojo est beau ! » est une phrase…', 'exclamative', ['interrogative', 'déclarative', 'impérative'], 'Elle exprime une émotion et se termine par « ! ».'],
    ['« Range ton sabre. » est une phrase…', 'injonctive (impérative)', ['interrogative', 'exclamative', 'déclarative'], 'Elle donne un ordre : phrase injonctive.']
  ];
  const HOMO = [
    ['Complète : « Kenji ___ un sabre en bois. »', 'a', ['à'], 'On peut dire « avait » → a (verbe avoir).'],
    ['Complète : « Le ninja va ___ Kyoto. »', 'à', ['a'], 'On ne peut pas dire « avait » → à (préposition).'],
    ['Complète : « Le dojo ___ grand ___ calme. »', 'est … et', ['et … est', 'est … est', 'et … et'], 'est = était (verbe être) ; et = et puis (liaison).'],
    ['Complète : « Les ninjas ___ partis à l\'aube. »', 'sont', ['son'], 'On peut dire « étaient » → sont (verbe être).'],
    ['Complète : « Yuki range ___ masque. »', 'son', ['sont'], 'On peut dire « mon masque » → son (déterminant possessif).'],
    ['Complète : « Le sensei regarde ___ élèves : ce sont les siens. »', 'ses', ['ces', 'c\'est', 's\'est'], 'Ce sont les siens : ses (possessif).'],
    ['Complète : « Regarde ___ montagnes, là-bas ! »', 'ces', ['ses', 'c\'est', 's\'est'], 'On les montre du doigt : ces (démonstratif).'],
    ['Complète : « Il ___ cache derrière l\'arbre. »', 'se', ['ce'], 'Devant un verbe pronominal (se cacher) : se.'],
    ['Complète : « ___ dojo est très ancien. »', 'Ce', ['Se'], 'Devant un nom : ce (déterminant démonstratif).'],
    ['Complète : « ___ part en mission ce soir. »', 'On', ['Ont'], 'On peut remplacer par « il » → on.'],
    ['Complète : « Les élèves ___ réussi l\'épreuve. »', 'ont', ['on'], 'On peut dire « avaient » → ont (verbe avoir).'],
    ['Complète : « Tu préfères le sabre ___ le bâton ? »', 'ou', ['où'], 'On peut dire « ou bien » → ou (sans accent).'],
    ['Complète : « ___ se cache le trésor ? »', 'Où', ['Ou'], 'Il s\'agit d\'un lieu → où (avec accent).'],
    ['Complète : « ___ un grand maître. »', 'C\'est', ['S\'est', 'Ces', 'Ses'], 'On peut dire « cela est » → c\'est.'],
    ['Complète : « Le ninja ___ blessé en tombant. »', 's\'est', ['c\'est', 'ses', 'ces'], 'Verbe pronominal « se blesser » → s\'est.'],
    ['Complète : « Les maîtres donnent ___ conseils aux élèves. »', 'leurs', ['leur'], 'Devant un nom pluriel (conseils) : leurs.'],
    ['Complète : « Le sensei ___ parle doucement. »', 'leur', ['leurs'], 'Devant un verbe, « leur » est un pronom : il ne prend jamais de s.'],
    ['Complète : « Il ne mange ___ ne boit pendant l\'entraînement. »', 'ni', ['n\'y'], 'ni… ni… : négation.'],
    ['Complète : « Je ___ vais jamais seul. »', 'n\'y', ['ni'], 'On peut dire « je ne vais jamais là-bas » → n\'y.'],
    ['Complète : « ___ sont mes amis. »', 'Ce', ['Se'], 'Ce sont = cela sont → ce.']
  ];
  const ACCORDS = [
    ['Quel est le pluriel de « un cheval » ?', 'des chevaux', ['des chevals', 'des chevaus', 'des chevauxs'], 'Les noms en -al font -aux au pluriel (sauf bal, carnaval, festival, chacal…).'],
    ['Quel est le pluriel de « un bijou » ?', 'des bijoux', ['des bijous', 'des bijou', 'des bijoues'], 'bijou, caillou, chou, genou, hibou, joujou, pou prennent un x.'],
    ['Quel est le pluriel de « un trou » ?', 'des trous', ['des troux', 'des trou', 'des trouts'], 'Les noms en -ou prennent un s… sauf les 7 exceptions (bijou, caillou…).'],
    ['Quel est le pluriel de « un festival » ?', 'des festivals', ['des festivaux', 'des festivales', 'des festival'], 'festival fait partie des exceptions : des festivals.'],
    ['Quel est le pluriel de « un travail » ?', 'des travaux', ['des travails', 'des travailx', 'des travals'], 'travail → travaux (comme corail, émail, vitrail).'],
    ['Quel est le pluriel de « un œil » ?', 'des yeux', ['des œils', 'des œuils', 'des yeuxs'], 'Pluriel irrégulier : un œil, des yeux.'],
    ['Quel est le pluriel de « un jeu » ?', 'des jeux', ['des jeus', 'des jeu', 'des jeuxs'], 'Les noms en -eu prennent un x (sauf pneu, bleu…).'],
    ['Quel est le pluriel de « un pneu » ?', 'des pneus', ['des pneux', 'des pneu', 'des pneuz'], 'pneu est une exception : des pneus.'],
    ['Quel est le pluriel de « un bateau » ?', 'des bateaux', ['des bateaus', 'des bateau', 'des bateals'], 'Les noms en -eau prennent un x.'],
    ['Complète : « Des ceintures ___ » (noir)', 'noires', ['noir', 'noirs', 'noire'], 'Ceintures est féminin pluriel → noires.'],
    ['Complète : « Les ninjas sont ___ » (prêt)', 'prêts', ['prêt', 'prêtes', 'prête'], 'Masculin pluriel → prêts.'],
    ['Complète : « Les filles sont ___ à l\'aube. » (partir)', 'parties', ['parti', 'partis', 'partie'], 'Avec être, le participe passé s\'accorde avec le sujet (féminin pluriel).'],
    ['Complète : « Yuki et Kenji sont ___ » (content)', 'contents', ['content', 'contentes', 'contente'], 'Un nom masculin + un féminin → masculin pluriel.'],
    ['Complète : « Une ___ lumière » (beau)', 'belle', ['beau', 'belles', 'bel'], 'Au féminin, beau devient belle.'],
    ['Complète : « Les ninjas ___ dans la nuit. » (avancer, présent)', 'avancent', ['avance', 'avances', 'avançent'], 'Sujet pluriel (ils) → terminaison -ent.'],
    ['Complète : « Tu ___ très vite. » (courir, présent)', 'cours', ['court', 'coure', 'courts'], 'Avec « tu », le verbe se termine par -s.'],
    ['Complète : « Elles ont ___ le dojo. » (nettoyer)', 'nettoyé', ['nettoyées', 'nettoyer', 'nettoyés'], 'Avec avoir, le participe passé ne s\'accorde pas avec le sujet.'],
    ['Complète : « Le ninja va ___ par-dessus le mur. » (sauter)', 'sauter', ['sauté', 'sautez', 'sautait'], 'Après « va », on met l\'infinitif (on peut dire « va mordre »).'],
    ['Complète : « Le ninja a ___ par-dessus le mur. » (sauter)', 'sauté', ['sauter', 'sautez', 'sautés'], 'Après « a », on met le participe passé (on peut dire « a mordu »).']
  ];
  const VOCAB = [
    ['Quel est un <b>synonyme</b> de « rapide » ?', 'vif', ['lent', 'lourd', 'calme'], 'Synonyme = mot de même sens.'],
    ['Quel est le <b>contraire</b> de « courageux » ?', 'peureux', ['brave', 'hardi', 'fort'], 'Antonyme = mot de sens contraire.'],
    ['Quel est un <b>synonyme</b> de « silencieux » ?', 'discret', ['bruyant', 'sonore', 'bavard'], 'Un ninja discret ne fait pas de bruit.'],
    ['Quel est le <b>préfixe</b> de « impossible » ?', 'im-', ['-ible', 'poss-', 'impo-'], 'Le préfixe se place au début du mot. « im- » veut dire « pas ».'],
    ['Quel mot est de la même <b>famille</b> que « terre » ?', 'terrain', ['tasse', 'tête', 'tard'], 'terre, terrain, terrier, enterrer… ont le même radical.'],
    ['Quel est le <b>suffixe</b> de « jardinier » ?', '-ier', ['jard-', 'jardin-', '-er'], 'Le suffixe se place à la fin du mot : jardin + ier.'],
    ['Que signifie « avoir le cœur sur la main » ?', 'être généreux', ['avoir mal au cœur', 'être très fort', 'applaudir'], 'C\'est une expression au sens figuré.'],
    ['Que signifie « poser un lapin » ?', 'ne pas venir à un rendez-vous', ['offrir un animal', 'faire une blague', 'courir très vite'], 'Expression familière au sens figuré.'],
    ['Quel mot est un <b>homophone</b> de « vert » (se prononce pareil) ?', 'ver', ['vent', 'vrai', 'voir'], 'vert, ver, verre, vers, vair se prononcent de la même façon.'],
    ['« rose, tulipe, marguerite » sont des…', 'fleurs', ['arbres', 'fruits', 'légumes'], '« fleur » est le mot générique (le mot-étiquette).'],
    ['Dans le dictionnaire, quel mot vient en <b>premier</b> ?', 'maître', ['marche', 'masque', 'matin'], 'On compare la 3e lettre : mai < mar < mas < mat.'],
    ['Quel est le <b>contraire</b> de « monter » ?', 'descendre', ['grimper', 'escalader', 'sauter'], 'monter ≠ descendre.'],
    ['Quel est un <b>synonyme</b> de « commencer » ?', 'débuter', ['terminer', 'arrêter', 'finir'], 'commencer = débuter.'],
    ['Quel mot est de la même <b>famille</b> que « dent » ?', 'dentiste', ['danse', 'dans', 'dindon'], 'dent, dentiste, dentition, dentifrice…'],
    ['Quel mot est employé au <b>sens figuré</b> ?', 'Il a une mémoire d\'éléphant.', ['L\'éléphant boit dans la rivière.', 'Le ninja mange une pomme.', 'Le chat dort au soleil.'], 'Il n\'a pas vraiment une mémoire d\'éléphant : cela veut dire qu\'il a une très bonne mémoire.'],
    ['Quel est le <b>contraire</b> de « visible » ?', 'invisible', ['lisible', 'impossible', 'vision'], 'Le préfixe « in- » donne le contraire.']
  ];

  DOJOS.push({
    id: 'francais', name: 'Dojo des Mots', subject: 'Français', icon: '📜', color: '#3a86ff',
    missions: [
      { id: 'present', title: 'Le présent', icon: '🗡️', desc: 'Conjuguer au présent (1er, 2e, 3e groupe)', gen: () => conjQ(['pres']) },
      { id: 'imp-fut', title: 'Imparfait et futur', icon: '🌙', desc: 'Raconter le passé et prédire l\'avenir', gen: () => conjQ(['imp', 'fut']) },
      { id: 'passe-compose', title: 'Le passé composé', icon: '⛩️', desc: 'Être ou avoir + participe passé', gen: () => conjQ(['pc']) },
      { id: 'ps-cond', title: 'Passé simple et conditionnel', icon: '📖', desc: 'Le temps des contes et des souhaits', gen: () => conjQ(['ps', 'cond']) },
      { id: 'quel-temps', title: 'Reconnaître les temps', icon: '🔍', desc: 'Retrouve le temps du verbe', gen: quelTemps },
      { id: 'nature', title: 'Nature des mots', icon: '🏷️', desc: 'Nom, verbe, adjectif, déterminant…', bank: NATURE },
      { id: 'fonctions', title: 'Fonctions et phrases', icon: '🧩', desc: 'Sujet, COD, COI, compléments, types de phrases', bank: FONCTION },
      { id: 'homophones', title: 'Les homophones', icon: '👯', desc: 'a/à, et/est, son/sont, ces/ses…', bank: HOMO },
      { id: 'accords', title: 'Accords et pluriels', icon: '🔗', desc: 'Pluriels, accords de l\'adjectif et du participe', bank: ACCORDS },
      { id: 'vocabulaire', title: 'Vocabulaire', icon: '📚', desc: 'Synonymes, contraires, familles, sens figuré', bank: VOCAB }
    ]
  });
  window.Conj = { conj, table };
})();
