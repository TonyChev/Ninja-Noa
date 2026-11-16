/* ===== Jardin des Sciences : Sciences et technologie CM2 ===== */
DOJOS.push({
  id: 'sciences', name: 'Jardin des Sciences', subject: 'Sciences', icon: '🔬', color: '#fb8500',
  missions: [
    { id: 'corps', title: 'Le corps humain', icon: '🫀', desc: 'Digestion, respiration, circulation, squelette', bank: [
      ['Dans quel ordre les aliments traversent-ils le tube digestif ?', 'bouche → œsophage → estomac → intestin grêle → gros intestin', ['bouche → estomac → œsophage → gros intestin → intestin grêle', 'bouche → poumons → estomac → intestin', 'bouche → cœur → estomac → intestin'], 'C\'est le trajet des aliments pendant la digestion.'],
      ['Quel organe pompe le sang dans tout le corps ?', 'le cœur', ['les poumons', 'l\'estomac', 'le cerveau'], 'Le cœur est un muscle qui bat environ 70 fois par minute.'],
      ['Quel gaz nos poumons prennent-ils dans l\'air ?', 'le dioxygène', ['le dioxyde de carbone', 'l\'hélium', 'la vapeur d\'eau'], 'Le sang transporte ensuite l\'oxygène jusqu\'aux organes.'],
      ['Quel gaz rejetons-nous en expirant ?', 'le dioxyde de carbone', ['le dioxygène', 'l\'azote pur', 'l\'hélium'], 'C\'est un déchet produit par nos cellules.'],
      ['Combien d\'os environ compte le squelette d\'un adulte ?', '206', ['26', '1 000', '52'], 'Le plus petit est dans l\'oreille, le plus long est le fémur.'],
      ['Où les nutriments passent-ils dans le sang ?', 'dans l\'intestin grêle', ['dans la bouche', 'dans les poumons', 'dans les os'], 'Sa paroi est très fine et très longue (environ 7 m).'],
      ['Quel organe commande tous nos mouvements ?', 'le cerveau', ['le cœur', 'le foie', 'l\'estomac'], 'Il envoie des messages par les nerfs.'],
      ['Grâce à quoi les os peuvent-ils bouger ?', 'aux muscles', ['aux cheveux', 'aux ongles', 'à la peau seule'], 'Les muscles se contractent et tirent sur les os.'],
      ['Que transportent les artères ?', 'le sang qui part du cœur', ['l\'air', 'la nourriture', 'les pensées'], 'Les veines ramènent le sang vers le cœur.'],
      ['Quelles dents servent à couper les aliments ?', 'les incisives', ['les molaires', 'les canines', 'les dents de sagesse'], 'Les molaires broient, les canines déchirent.'],
      ['Comment s\'appelle la période où le corps de l\'enfant se transforme en corps d\'adulte ?', 'la puberté', ['la vieillesse', 'la naissance', 'la digestion'], 'Elle commence généralement entre 9 et 14 ans.'],
      ['Pourquoi faut-il bien dormir ?', 'pour que le corps et le cerveau récupèrent', ['pour digérer plus vite', 'pour arrêter de grandir', 'cela ne sert à rien'], 'Un enfant de 10 ans a besoin d\'environ 10 heures de sommeil.']
    ] },
    { id: 'vivant', title: 'Le monde vivant', icon: '🐸', desc: 'Chaînes alimentaires, classification, cycles de vie', bank: [
      ['Dans une chaîne alimentaire, qui est le premier maillon ?', 'une plante', ['un carnivore', 'un herbivore', 'un champignon'], 'Les plantes produisent leur matière grâce à la lumière.'],
      ['Un animal qui mange uniquement des végétaux est…', 'herbivore', ['carnivore', 'omnivore', 'insectivore'], 'Exemples : vache, lapin, chenille.'],
      ['Un animal qui mange de tout (végétaux et animaux) est…', 'omnivore', ['herbivore', 'carnivore', 'granivore'], 'L\'être humain est omnivore.'],
      ['De quoi une plante a-t-elle besoin pour fabriquer sa matière ?', 'de lumière, d\'eau, d\'air et de sels minéraux', ['de sucre et de viande', 'uniquement de terre', 'de musique'], 'C\'est la photosynthèse.'],
      ['Combien de pattes a un insecte ?', '6', ['8', '4', '10'], 'Une araignée en a 8 : ce n\'est pas un insecte !'],
      ['Comment appelle-t-on les animaux qui ont un squelette interne avec une colonne vertébrale ?', 'les vertébrés', ['les invertébrés', 'les insectes', 'les mollusques'], 'Poissons, amphibiens, reptiles, oiseaux, mammifères.'],
      ['Quelle est la caractéristique des mammifères ?', 'les femelles allaitent leurs petits', ['ils ont des plumes', 'ils pondent tous des œufs', 'ils ont des écailles'], 'Ils ont aussi des poils.'],
      ['Un animal qui pond des œufs est…', 'ovipare', ['vivipare', 'carnivore', 'herbivore'], 'Exemples : poule, tortue, grenouille.'],
      ['Comment appelle-t-on la transformation de la chenille en papillon ?', 'la métamorphose', ['la digestion', 'la germination', 'l\'hibernation'], 'Œuf → chenille → chrysalide → papillon.'],
      ['Qui décompose les feuilles mortes et les restes d\'animaux ?', 'les décomposeurs (vers de terre, champignons…)', ['les carnivores', 'les oiseaux', 'les poissons'], 'Ils produisent de l\'humus pour le sol.'],
      ['Quelle est la bonne chaîne alimentaire ?', 'herbe → lapin → renard', ['renard → lapin → herbe', 'lapin → herbe → renard', 'herbe → renard → lapin'], 'La flèche veut dire « est mangé par ».'],
      ['Que devient une graine qui germe ?', 'une nouvelle plante', ['un fruit sec', 'un caillou', 'un insecte'], 'Elle a besoin d\'eau et de chaleur pour germer.']
    ] },
    { id: 'matiere', title: 'La matière', icon: '💧', desc: 'États de l\'eau, mélanges, cycle de l\'eau', bank: [
      ['Quels sont les trois états de l\'eau ?', 'solide, liquide, gazeux', ['chaud, froid, tiède', 'dur, mou, liquide', 'glace, neige, pluie'], 'Glace (solide), eau (liquide), vapeur d\'eau (gaz).'],
      ['À quelle température l\'eau pure gèle-t-elle ?', '0 °C', ['100 °C', '-10 °C', '37 °C'], 'C\'est la solidification.'],
      ['À quelle température l\'eau pure bout-elle (au niveau de la mer) ?', '100 °C', ['0 °C', '50 °C', '200 °C'], 'C\'est l\'ébullition.'],
      ['Comment appelle-t-on le passage de l\'état liquide à l\'état gazeux ?', 'la vaporisation (évaporation)', ['la fusion', 'la solidification', 'la condensation'], 'Le linge sèche grâce à l\'évaporation.'],
      ['Comment appelle-t-on le passage de l\'état solide à l\'état liquide ?', 'la fusion', ['la condensation', 'l\'évaporation', 'la solidification'], 'Le glaçon fond : c\'est la fusion.'],
      ['Que se passe-t-il quand la vapeur d\'eau touche une vitre froide ?', 'elle se condense en gouttelettes', ['elle gèle en neige', 'elle disparaît', 'elle devient de l\'air'], 'C\'est la condensation : la buée.'],
      ['Que se passe-t-il quand on met du sel dans de l\'eau et qu\'on mélange ?', 'le sel se dissout', ['le sel flotte', 'l\'eau devient solide', 'le sel brûle'], 'On obtient un mélange homogène : l\'eau salée.'],
      ['Comment séparer du sable mélangé à de l\'eau ?', 'par filtration', ['en ajoutant du sel', 'en secouant', 'en le congelant'], 'Le filtre retient le sable.'],
      ['L\'air a-t-il une masse ?', 'oui, l\'air est de la matière', ['non, l\'air ne pèse rien', 'seulement la nuit', 'seulement en montagne'], 'Un ballon gonflé pèse un peu plus qu\'un ballon dégonflé.'],
      ['Dans le cycle de l\'eau, comment se forment les nuages ?', 'la vapeur d\'eau se condense en altitude', ['le vent fabrique du coton', 'la mer gèle', 'les arbres soufflent'], 'Évaporation → condensation → précipitations → ruissellement.'],
      ['Un mélange où l\'on distingue plusieurs constituants est…', 'hétérogène', ['homogène', 'pur', 'gazeux'], 'Exemple : eau + huile.'],
      ['Que devient l\'eau qui tombe sous forme de pluie ?', 'elle ruisselle, s\'infiltre ou s\'évapore', ['elle disparaît pour toujours', 'elle se transforme en sel', 'elle remonte directement en nuage solide'], 'Elle rejoint rivières, nappes souterraines et océans.']
    ] },
    { id: 'energie', title: 'Énergie et électricité', icon: '⚡', desc: 'Circuits, conducteurs, sources d\'énergie', bank: [
      ['Pour qu\'une lampe s\'allume, le circuit doit être…', 'fermé', ['ouvert', 'coupé', 'mouillé'], 'Le courant doit pouvoir faire le tour du circuit.'],
      ['Lequel de ces matériaux est un bon conducteur d\'électricité ?', 'le cuivre (métal)', ['le plastique', 'le bois sec', 'le verre'], 'Les fils électriques sont en cuivre.'],
      ['Lequel de ces matériaux est un isolant ?', 'le plastique', ['le fer', 'l\'aluminium', 'le cuivre'], 'Il entoure les fils pour nous protéger.'],
      ['Que se passe-t-il quand on ouvre l\'interrupteur ?', 'la lampe s\'éteint', ['la lampe brille plus fort', 'la pile se recharge', 'rien ne change'], 'Le circuit est ouvert, le courant ne passe plus.'],
      ['Pourquoi ne faut-il jamais toucher une prise électrique avec un objet métallique ?', 'le courant du secteur est très dangereux', ['cela abîme l\'objet', 'cela fait du bruit', 'c\'est interdit seulement le dimanche'], 'Le secteur (230 V) peut provoquer une électrocution.'],
      ['Laquelle est une énergie fossile ?', 'le pétrole', ['le vent', 'le soleil', 'l\'eau des rivières'], 'Charbon, pétrole et gaz s\'épuisent et polluent.'],
      ['Quelle énergie utilise un barrage ?', 'l\'énergie de l\'eau (hydraulique)', ['l\'énergie du vent', 'l\'énergie du charbon', 'l\'énergie des volcans'], 'L\'eau fait tourner des turbines.'],
      ['Qu\'est-ce qu\'un court-circuit ?', 'le courant passe directement sans passer par la lampe', ['une lampe très courte', 'un circuit en carton', 'une pile neuve'], 'C\'est dangereux : la pile chauffe.'],
      ['Que transforme un panneau solaire ?', 'la lumière en électricité', ['l\'eau en vapeur', 'le vent en lumière', 'le bruit en chaleur'], 'C\'est une énergie renouvelable.'],
      ['Quel objet fournit l\'énergie dans un circuit simple de classe ?', 'la pile', ['l\'ampoule', 'le fil', 'l\'interrupteur'], 'Elle a une borne + et une borne −.'],
      ['Comment économiser l\'énergie à la maison ?', 'éteindre la lumière en quittant une pièce', ['laisser la télé allumée', 'ouvrir la fenêtre avec le chauffage', 'laisser le frigo ouvert'], 'Chaque geste compte !'],
      ['Quelle énergie possède un objet en mouvement, comme un shuriken lancé ?', 'l\'énergie cinétique (de mouvement)', ['l\'énergie électrique', 'l\'énergie nucléaire', 'aucune énergie'], 'Plus il va vite, plus il a d\'énergie.']
    ] },
    { id: 'univers', title: 'La Terre dans l\'Univers', icon: '🪐', desc: 'Système solaire, jour et nuit, saisons', bank: [
      ['En combien de temps la Terre fait-elle un tour sur elle-même ?', '24 heures', ['1 heure', '365 jours', '1 mois'], 'C\'est ce qui crée le jour et la nuit.'],
      ['En combien de temps la Terre fait-elle le tour du Soleil ?', 'environ 365 jours', ['24 heures', '28 jours', '12 ans'], '365 jours et 6 heures : d\'où les années bissextiles.'],
      ['Combien de planètes compte le système solaire ?', '8', ['9', '12', '7'], 'Mercure, Vénus, Terre, Mars, Jupiter, Saturne, Uranus, Neptune.'],
      ['Quelle est la planète la plus proche du Soleil ?', 'Mercure', ['Vénus', 'Mars', 'Neptune'], ''],
      ['Quelle est la plus grande planète du système solaire ?', 'Jupiter', ['Saturne', 'la Terre', 'Mars'], 'On pourrait y mettre plus de 1 000 Terres.'],
      ['Quelle planète est surnommée la « planète rouge » ?', 'Mars', ['Vénus', 'Jupiter', 'Mercure'], 'Sa couleur vient de la rouille dans son sol.'],
      ['Le Soleil est…', 'une étoile', ['une planète', 'un satellite', 'une comète'], 'C\'est l\'étoile la plus proche de nous.'],
      ['Pourquoi y a-t-il le jour et la nuit ?', 'parce que la Terre tourne sur elle-même', ['parce que le Soleil s\'éteint', 'parce que la Lune cache le Soleil', 'parce que les nuages bougent'], 'La moitié éclairée de la Terre est dans le jour.'],
      ['La Lune est…', 'le satellite naturel de la Terre', ['une étoile', 'une planète', 'un morceau du Soleil'], 'Elle tourne autour de la Terre en environ 28 jours.'],
      ['En quelle année l\'être humain a-t-il marché sur la Lune pour la première fois ?', '1969', ['1492', '1914', '2001'], 'Neil Armstrong, mission Apollo 11.'],
      ['Comment s\'appelle l\'astronaute français qui a séjourné dans la Station spatiale internationale ?', 'Thomas Pesquet', ['Thomas Edison', 'Jules Verne', 'Louis Pasteur'], 'Il y est allé en 2016 et en 2021.'],
      ['Pourquoi y a-t-il des saisons ?', 'parce que l\'axe de la Terre est incliné', ['parce que la Terre s\'éloigne beaucoup du Soleil en hiver', 'parce que la Lune change de couleur', 'parce que le Soleil change de taille'], 'Les rayons du Soleil arrivent plus ou moins inclinés selon la période.']
    ] }
  ]
});
