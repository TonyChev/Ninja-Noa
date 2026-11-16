/* ===== Montagne de la Géographie : Géographie CM2 ===== */
(function () {
  const { pick, qcm } = U;
  const CAPITALES = [['France', 'Paris'], ['Espagne', 'Madrid'], ['Italie', 'Rome'], ['Allemagne', 'Berlin'], ['Royaume-Uni', 'Londres'], ['Portugal', 'Lisbonne'], ['Belgique', 'Bruxelles'], ['Suisse', 'Berne'], ['Pays-Bas', 'Amsterdam'], ['Grèce', 'Athènes'], ['Pologne', 'Varsovie'], ['Suède', 'Stockholm'], ['Norvège', 'Oslo'], ['Autriche', 'Vienne'], ['Irlande', 'Dublin'], ['Japon', 'Tokyo'], ['Chine', 'Pékin'], ['États-Unis', 'Washington'], ['Canada', 'Ottawa'], ['Brésil', 'Brasília'], ['Égypte', 'Le Caire'], ['Maroc', 'Rabat'], ['Russie', 'Moscou'], ['Inde', 'New Delhi'], ['Australie', 'Canberra'], ['Mexique', 'Mexico'], ['Argentine', 'Buenos Aires'], ['Sénégal', 'Dakar']];
  const CONTINENTS = [['Japon', 'Asie'], ['Chine', 'Asie'], ['Inde', 'Asie'], ['Brésil', 'Amérique'], ['Canada', 'Amérique'], ['Mexique', 'Amérique'], ['Argentine', 'Amérique'], ['Égypte', 'Afrique'], ['Sénégal', 'Afrique'], ['Maroc', 'Afrique'], ['Kenya', 'Afrique'], ['Australie', 'Océanie'], ['Nouvelle-Zélande', 'Océanie'], ['Italie', 'Europe'], ['Norvège', 'Europe'], ['Pologne', 'Europe']];
  const MONDE = [
    ['Quel est le plus grand océan du monde ?', 'l\'océan Pacifique', ['l\'océan Atlantique', 'l\'océan Indien', 'l\'océan Arctique'], 'Il couvre environ un tiers de la Terre.'],
    ['Quel est le plus haut sommet du monde ?', 'l\'Everest', ['le mont Blanc', 'le Kilimandjaro', 'le mont Fuji'], 'Il culmine à 8 849 m dans l\'Himalaya.'],
    ['Quel est le plus grand désert chaud du monde ?', 'le Sahara', ['le Gobi', 'le Kalahari', 'l\'Atacama'], 'Il se trouve en Afrique du Nord.'],
    ['Quel fleuve traverse l\'Égypte ?', 'le Nil', ['l\'Amazone', 'le Mississippi', 'la Seine'], 'C\'est l\'un des plus longs fleuves du monde.'],
    ['Quelle célèbre montagne volcanique est le symbole du Japon ?', 'le mont Fuji', ['l\'Everest', 'le Vésuve', 'le Cervin'], 'Le pays des ninjas !'],
    ['Quel est le pays le plus peuplé du monde ?', 'l\'Inde', ['la France', 'le Brésil', 'l\'Australie'], 'L\'Inde a dépassé la Chine en 2023 : plus de 1,4 milliard d\'habitants.'],
    ['Quelle grande forêt tropicale se trouve en Amérique du Sud ?', 'l\'Amazonie', ['la forêt de Brocéliande', 'la Sibérie', 'la Forêt-Noire'], 'C\'est le « poumon vert » de la planète.']
  ];
  function monde() {
    const r = Math.random();
    if (r < 0.45) { const [p, c] = pick(CAPITALES); return qcm(`Quelle est la capitale du pays suivant : <b>${p}</b> ?`, c, U.shuffle(CAPITALES.filter(x => x[1] !== c)).map(x => x[1]), `La capitale du pays ${p} est ${c}.`); }
    if (r < 0.75) { const [p, c] = pick(CONTINENTS); return qcm(`Sur quel continent se trouve le pays suivant : <b>${p}</b> ?`, c, ['Asie', 'Amérique', 'Afrique', 'Océanie', 'Europe', 'Antarctique'].filter(x => x !== c), `Le pays ${p} se trouve en ${c}.`); }
    return U.fromBank(pick(MONDE));
  }

  DOJOS.push({
    id: 'geographie', name: 'Montagne de la Géographie', subject: 'Géographie', icon: '🗻', color: '#2a9d8f',
    missions: [
      { id: 'se-deplacer', title: 'Se déplacer', icon: '🚄', desc: 'Les transports au quotidien et dans le monde', bank: [
        ['Quel moyen de transport est le moins polluant ?', 'le vélo', ['la voiture', 'l\'avion', 'le camion'], 'Le vélo et la marche sont des « mobilités douces ».'],
        ['Que signifie TGV ?', 'Train à Grande Vitesse', ['Transport Gratuit en Ville', 'Tramway Géant Volant', 'Train Grand Voyage'], 'Il peut rouler à plus de 300 km/h.'],
        ['Le tunnel sous la Manche relie la France au…', 'Royaume-Uni', ['Espagne', 'Italie', 'Japon'], 'Ouvert en 1994, il mesure 50 km.'],
        ['Comment transporte-t-on la plupart des marchandises d\'un continent à l\'autre ?', 'par porte-conteneurs (bateaux)', ['à vélo', 'par fusée', 'en montgolfière'], 'Environ 90 % des marchandises du monde voyagent par la mer.'],
        ['Quel est le plus grand port de commerce de France ?', 'Marseille', ['Lyon', 'Strasbourg', 'Lille'], 'Marseille-Fos est au bord de la Méditerranée.'],
        ['Que veut dire « faire du covoiturage » ?', 'partager une voiture pour un même trajet', ['conduire très vite', 'louer un vélo', 'voyager seul'], 'Cela réduit la pollution et les dépenses.'],
        ['Lequel est un transport en commun ?', 'le métro', ['la trottinette personnelle', 'la voiture familiale', 'le skateboard'], 'Bus, tramway, métro, train : on voyage ensemble.'],
        ['Quel est le principal aéroport de Paris ?', 'Roissy-Charles-de-Gaulle', ['Marseille-Provence', 'Nice-Côte d\'Azur', 'Lyon-Saint-Exupéry'], 'L\'un des plus grands aéroports d\'Europe.'],
        ['Combien de temps environ dure un vol Paris - New York ?', 'environ 8 heures', ['environ 30 minutes', 'environ 3 jours', 'environ 1 mois'], 'Il faut traverser l\'océan Atlantique.'],
        ['Pourquoi y a-t-il des embouteillages le matin dans les grandes villes ?', 'beaucoup de gens vont travailler en même temps', ['les routes sont fermées la nuit', 'les voitures dorment', 'il n\'y a pas de feux'], 'Ce sont les déplacements domicile-travail.'],
        ['Dans un pays où il y a peu de routes, comme dans le désert, on se déplace parfois…', 'à dos de dromadaire', ['en métro', 'en TGV', 'en tramway'], 'Les moyens de transport dépendent du lieu.'],
        ['Qu\'est-ce qu\'une « piste cyclable » ?', 'une voie réservée aux vélos', ['une route pour camions', 'un chemin de fer', 'une piste d\'avion'], 'Elle rend les déplacements à vélo plus sûrs.']
      ] },
      { id: 'internet', title: 'Communiquer avec Internet', icon: '🌐', desc: 'Réseau mondial, câbles, bons réflexes numériques', bank: [
        ['Qu\'est-ce qu\'Internet ?', 'un réseau mondial d\'ordinateurs reliés entre eux', ['un seul très gros ordinateur', 'une chaîne de télévision', 'un jeu vidéo'], 'Des milliards d\'appareils échangent des informations.'],
        ['Par où passent la plupart des données d\'Internet entre les continents ?', 'par des câbles sous-marins', ['par des pigeons voyageurs', 'par la poste', 'par des fusées'], 'Des centaines de milliers de km de câbles au fond des océans.'],
        ['Comment s\'appelle un bâtiment rempli d\'ordinateurs qui stockent les données ?', 'un centre de données (data center)', ['une bibliothèque', 'une usine à papier', 'un dojo'], 'Ils consomment beaucoup d\'électricité.'],
        ['Que veut dire « fracture numérique » ?', 'tout le monde n\'a pas accès à Internet de la même façon', ['un ordinateur cassé', 'un os cassé à cause des écrans', 'un virus informatique'], 'Certaines régions ou personnes sont peu connectées.'],
        ['Qui a inventé le Web (www) en 1989 ?', 'Tim Berners-Lee', ['Thomas Edison', 'Jules Verne', 'Napoléon'], 'Un chercheur britannique au CERN, près de Genève.'],
        ['Que faut-il faire avec ton mot de passe ?', 'le garder secret', ['le donner à tous tes amis', 'l\'écrire sur ton front', 'le publier en ligne'], 'Un vrai ninja garde ses secrets !'],
        ['Quel est le mot français pour « e-mail » ?', 'courriel', ['télégramme', 'parchemin', 'texto'], 'Contraction de « courrier électronique ».'],
        ['Que faut-il faire si tu lis une information étonnante sur Internet ?', 'vérifier la source', ['la croire tout de suite', 'la partager à tout le monde', 'l\'apprendre par cœur'], 'Il existe beaucoup de fausses informations (« fake news »).'],
        ['Comment appelle-t-on une zone sans réseau téléphone ni Internet ?', 'une zone blanche', ['une zone rouge', 'une zone bleue', 'une zone ninja'], 'Souvent en montagne ou dans des campagnes isolées.'],
        ['À quoi sert un moteur de recherche ?', 'à trouver des informations sur Internet', ['à faire avancer une voiture', 'à imprimer', 'à recharger un téléphone'], 'On tape des mots-clés.'],
        ['Que ne faut-il JAMAIS donner à un inconnu sur Internet ?', 'son adresse et ses informations personnelles', ['un bonjour poli', 'son jeu préféré', 'la météo'], 'Parle à un adulte si quelqu\'un te demande ces informations.'],
        ['Que se passe-t-il si quelqu\'un t\'envoie un message qui te met mal à l\'aise ?', 'j\'en parle à un adulte de confiance', ['je garde le secret', 'je réponds méchamment', 'je donne mon adresse'], 'Le 3018 est le numéro contre le harcèlement en ligne.']
      ] },
      { id: 'mieux-habiter', title: 'Mieux habiter', icon: '🌱', desc: 'Nature en ville, recyclage, écoquartiers', bank: [
        ['Qu\'est-ce qu\'un écoquartier ?', 'un quartier conçu pour respecter l\'environnement', ['un quartier sans maisons', 'une forêt sans arbres', 'un quartier réservé aux voitures'], 'Énergies propres, espaces verts, transports doux.'],
        ['Dans quelle poubelle jette-t-on les emballages en plastique et en carton ?', 'la poubelle jaune', ['la poubelle des ordures ménagères', 'dans la nature', 'dans les toilettes'], 'Ils seront recyclés.'],
        ['Où jette-t-on les bouteilles en verre ?', 'dans le conteneur à verre', ['dans la poubelle jaune', 'dans le compost', 'dans la rivière'], 'Le verre se recycle à l\'infini !'],
        ['Que peut-on mettre dans un composteur ?', 'des épluchures de légumes', ['des piles', 'des bouteilles en plastique', 'des canettes'], 'Les déchets naturels deviennent de l\'engrais.'],
        ['Laquelle est une énergie renouvelable ?', 'l\'énergie solaire', ['le pétrole', 'le charbon', 'le gaz naturel'], 'Le soleil, le vent et l\'eau ne s\'épuisent pas.'],
        ['Que signifie la règle des « 3 R » ?', 'Réduire, Réutiliser, Recycler', ['Rire, Rêver, Rouler', 'Ranger, Rincer, Repasser', 'Ramper, Rouler, Respirer'], 'Le meilleur déchet est celui qu\'on ne produit pas.'],
        ['Qu\'est-ce qu\'un toit végétalisé ?', 'un toit couvert de plantes', ['un toit en légumes', 'un toit troué', 'un toit en plastique'], 'Il rafraîchit les bâtiments et accueille les insectes.'],
        ['Pourquoi installe-t-on des parcs et des arbres en ville ?', 'pour rafraîchir l\'air et accueillir la nature', ['pour faire plus de bruit', 'pour polluer', 'pour empêcher de marcher'], 'Les arbres créent de l\'ombre et filtrent l\'air.'],
        ['Que veut dire « trier ses déchets » ?', 'les séparer selon leur matière', ['les jeter par la fenêtre', 'les cacher', 'les brûler'], 'Chaque matière va dans la bonne poubelle.'],
        ['Quelle est une cause importante de la pollution de l\'air en ville ?', 'la circulation des voitures', ['les arbres', 'les vélos', 'les jardins'], 'Les gaz d\'échappement polluent.'],
        ['Que produit une éolienne ?', 'de l\'électricité grâce au vent', ['de l\'eau', 'du pétrole', 'du vent'], 'Ses pales tournent et font fonctionner un générateur.'],
        ['Que signifie « biodiversité » ?', 'la variété des êtres vivants', ['une marque de yaourt', 'un type de voiture', 'une planète'], 'Plantes, animaux, champignons… protégeons-les !']
      ] },
      { id: 'france', title: 'Repères : la France', icon: '🗺️', desc: 'Fleuves, montagnes, régions, outre-mer', bank: [
        ['Quel est le plus long fleuve de France ?', 'la Loire', ['la Seine', 'le Rhône', 'la Garonne'], 'Environ 1 000 km.'],
        ['Quel fleuve traverse Paris ?', 'la Seine', ['la Loire', 'le Rhône', 'la Garonne'], 'Elle se jette dans la Manche.'],
        ['Quel est le plus haut sommet de France ?', 'le mont Blanc', ['le Puy de Dôme', 'le Ventoux', 'le Vignemale'], 'Environ 4 805 m, dans les Alpes.'],
        ['Quelle chaîne de montagnes sépare la France de l\'Espagne ?', 'les Pyrénées', ['les Alpes', 'le Jura', 'les Vosges'], ''],
        ['Combien de régions compte la France métropolitaine ?', '13', ['22', '101', '5'], 'Depuis 2016 (plus 5 régions d\'outre-mer).'],
        ['Quelle mer borde le sud de la France ?', 'la mer Méditerranée', ['la Manche', 'la mer du Nord', 'la mer Noire'], 'Nice et Marseille sont au bord de la Méditerranée.'],
        ['Quelle île française se trouve en Méditerranée ?', 'la Corse', ['la Réunion', 'la Martinique', 'la Guadeloupe'], 'On la surnomme l\'île de Beauté.'],
        ['Lequel de ces territoires est un département d\'outre-mer ?', 'la Guyane', ['la Bretagne', 'l\'Alsace', 'la Provence'], 'La Guyane est en Amérique du Sud.'],
        ['Quelle est la deuxième plus grande ville de France ?', 'Marseille', ['Lyon', 'Toulouse', 'Lille'], 'Après Paris.'],
        ['Quel fleuve passe par Lyon ?', 'le Rhône', ['la Loire', 'la Seine', 'la Garonne'], 'Il y rejoint la Saône.'],
        ['Quel fleuve traverse Bordeaux ?', 'la Garonne', ['la Seine', 'le Rhône', 'la Loire'], 'Elle se jette dans l\'océan Atlantique.'],
        ['Quel océan borde l\'ouest de la France ?', 'l\'océan Atlantique', ['l\'océan Pacifique', 'l\'océan Indien', 'l\'océan Arctique'], ''],
        ['Dans quel océan se trouve l\'île de La Réunion ?', 'l\'océan Indien', ['l\'océan Atlantique', 'la Méditerranée', 'l\'océan Pacifique'], 'Elle est proche de Madagascar.']
      ] },
      { id: 'monde', title: 'Repères : le monde', icon: '🌏', desc: 'Capitales, continents, grands repères', gen: monde }
    ]
  });
})();
