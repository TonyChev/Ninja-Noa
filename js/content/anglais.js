/* ===== Pont de l'Anglais ===== */
(function () {
  const { pick, qcm, shuffle } = U;
  const COLORS = [['red', 'rouge'], ['blue', 'bleu'], ['green', 'vert'], ['yellow', 'jaune'], ['black', 'noir'], ['white', 'blanc'], ['pink', 'rose'], ['purple', 'violet'], ['brown', 'marron'], ['grey', 'gris']];
  const NUMBERS = [['one', '1'], ['two', '2'], ['three', '3'], ['four', '4'], ['five', '5'], ['six', '6'], ['seven', '7'], ['eight', '8'], ['nine', '9'], ['ten', '10'], ['eleven', '11'], ['twelve', '12'], ['thirteen', '13'], ['fifteen', '15'], ['twenty', '20'], ['thirty', '30'], ['forty', '40'], ['fifty', '50'], ['a hundred', '100']];
  const ANIMALS = [['cat', 'chat'], ['dog', 'chien'], ['horse', 'cheval'], ['bird', 'oiseau'], ['fish', 'poisson'], ['rabbit', 'lapin'], ['mouse', 'souris'], ['cow', 'vache'], ['pig', 'cochon'], ['sheep', 'mouton'], ['monkey', 'singe'], ['elephant', 'éléphant'], ['snake', 'serpent'], ['frog', 'grenouille'], ['duck', 'canard'], ['bear', 'ours'], ['tiger', 'tigre']];
  const FAMILY = [['mother', 'mère'], ['father', 'père'], ['sister', 'sœur'], ['brother', 'frère'], ['grandmother', 'grand-mère'], ['grandfather', 'grand-père'], ['aunt', 'tante'], ['uncle', 'oncle'], ['head', 'tête'], ['hand', 'main'], ['foot', 'pied'], ['eye', 'œil'], ['nose', 'nez'], ['mouth', 'bouche'], ['ear', 'oreille'], ['arm', 'bras'], ['leg', 'jambe'], ['hair', 'cheveux']];
  const TIME = [['Monday', 'lundi'], ['Tuesday', 'mardi'], ['Wednesday', 'mercredi'], ['Thursday', 'jeudi'], ['Friday', 'vendredi'], ['Saturday', 'samedi'], ['Sunday', 'dimanche'], ['January', 'janvier'], ['March', 'mars'], ['May', 'mai'], ['July', 'juillet'], ['September', 'septembre'], ['December', 'décembre'], ['spring', 'printemps'], ['summer', 'été'], ['winter', 'hiver']];
  const PHRASES = [
    ['Que veut dire « What\'s your name? » ?', 'Comment t\'appelles-tu ?', ['Quel âge as-tu ?', 'Où habites-tu ?', 'Comment vas-tu ?'], '', 'What\'s your name?'],
    ['Que veut dire « How old are you? » ?', 'Quel âge as-tu ?', ['Comment t\'appelles-tu ?', 'Comment vas-tu ?', 'Qui es-tu ?'], 'Réponse : I\'m ten (years old).', 'How old are you?'],
    ['Que veut dire « Where do you live? » ?', 'Où habites-tu ?', ['Que fais-tu ?', 'Quel âge as-tu ?', 'Qu\'aimes-tu ?'], 'Réponse : I live in France.', 'Where do you live?'],
    ['Que veut dire « How are you? » ?', 'Comment vas-tu ?', ['Qui es-tu ?', 'Où vas-tu ?', 'Quelle heure est-il ?'], 'Réponse : I\'m fine, thank you!', 'How are you?'],
    ['Comment dit-on « Merci » en anglais ?', 'Thank you', ['Please', 'Sorry', 'Hello'], '', 'Thank you'],
    ['Comment dit-on « S\'il te plaît » en anglais ?', 'Please', ['Thank you', 'Goodbye', 'Sorry'], '', 'Please'],
    ['Que veut dire « I like ninjas » ?', 'J\'aime les ninjas', ['Je suis un ninja', 'Je vois des ninjas', 'Je n\'aime pas les ninjas'], '« I like » = j\'aime.', 'I like ninjas'],
    ['Que veut dire « I don\'t like spiders » ?', 'Je n\'aime pas les araignées', ['J\'aime les araignées', 'J\'ai des araignées', 'Je suis une araignée'], '« I don\'t like » = je n\'aime pas.', 'I don\'t like spiders'],
    ['Que veut dire « What time is it? » ?', 'Quelle heure est-il ?', ['Quel temps fait-il ?', 'Quel jour sommes-nous ?', 'Où es-tu ?'], '', 'What time is it?'],
    ['Que veut dire « It\'s sunny » ?', 'Il fait beau (il y a du soleil)', ['Il pleut', 'Il neige', 'Il fait nuit'], 'rainy = pluvieux, snowy = neigeux.', 'It\'s sunny'],
    ['Comment dit-on « Bonjour » le matin ?', 'Good morning', ['Good night', 'Goodbye', 'Good evening'], 'Good night = bonne nuit.', 'Good morning'],
    ['Que veut dire « I have got a brother » ?', 'J\'ai un frère', ['Je suis un frère', 'J\'aime mon frère', 'Mon frère a un chat'], '', 'I have got a brother'],
    ['Que veut dire « Can I go to the toilet, please? » ?', 'Est-ce que je peux aller aux toilettes, s\'il vous plaît ?', ['Où sont les toilettes ?', 'Je n\'aime pas les toilettes', 'Les toilettes sont fermées'], '', 'Can I go to the toilet, please?']
  ];
  const say = t => ({ say: { text: t, lang: 'en-GB' } });
  function vocab(list) {
    const [en, fr] = pick(list);
    const others = shuffle(list.filter(x => x[0] !== en));
    if (Math.random() < 0.5) {
      return qcm(`Comment dit-on « <b>${fr}</b> » en anglais ?`, en, others.map(x => x[0]), `« ${fr} » se dit « ${en} » en anglais.`, say(en));
    }
    return qcm(`Que veut dire le mot anglais « <b>${en}</b> » ?`, fr, others.map(x => x[1]), `« ${en} » veut dire « ${fr} ».`, say(en));
  }
  function phrases() {
    if (Math.random() < 0.6) { const e = pick(PHRASES); return U.qcm(e[0], e[1], e[2], e[3], say(e[4])); }
    return vocab(TIME);
  }
  DOJOS.push({
    id: 'anglais', name: 'Pont de l\'Anglais', subject: 'Anglais', icon: '🌉', color: '#ef476f',
    missions: [
      { id: 'colors-numbers', title: 'Colors & numbers', icon: '🎨', desc: 'Les couleurs et les nombres', gen: () => vocab(Math.random() < .5 ? COLORS : NUMBERS) },
      { id: 'animals', title: 'Animals', icon: '🐼', desc: 'Les animaux', gen: () => vocab(ANIMALS) },
      { id: 'family-body', title: 'Family & body', icon: '👨‍👩‍👧', desc: 'La famille et le corps', gen: () => vocab(FAMILY) },
      { id: 'days-phrases', title: 'Days & phrases', icon: '💬', desc: 'Jours, mois et phrases utiles', gen: phrases }
    ]
  });
})();
