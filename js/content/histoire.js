/* ===== Temple de l'Histoire : Histoire CM2 ===== */
DOJOS.push({
  id: 'histoire', name: 'Temple de l\'Histoire', subject: 'Histoire', icon: '🏯', color: '#8338ec',
  missions: [
    { id: 'republique', title: 'Le temps de la République', icon: '🇫🇷', desc: 'Symboles, école de Jules Ferry, droit de vote', bank: [
      ['En quelle année la Première République est-elle proclamée en France ?', '1792', ['1789', '1848', '1870'], 'Après la Révolution de 1789, la République est proclamée en septembre 1792.'],
      ['Quelle est la devise de la République française ?', 'Liberté, Égalité, Fraternité', ['Force, Honneur, Courage', 'Paix, Travail, Patrie', 'Un pour tous, tous pour un'], 'Elle est inscrite sur les mairies et les écoles.'],
      ['Comment s\'appelle l\'hymne national français ?', 'La Marseillaise', ['La Parisienne', 'L\'Ode à la joie', 'Le Chant du départ'], 'Écrite par Rouget de Lisle en 1792.'],
      ['Qui a rendu l\'école gratuite, laïque et obligatoire en 1881-1882 ?', 'Jules Ferry', ['Victor Hugo', 'Napoléon Ier', 'Louis Pasteur'], 'Les lois Jules Ferry ont rendu l\'école obligatoire de 6 à 13 ans.'],
      ['Avec les lois Ferry, jusqu\'à quel âge l\'école est-elle obligatoire ?', '13 ans', ['10 ans', '16 ans', '18 ans'], 'De 6 à 13 ans. Aujourd\'hui, l\'instruction est obligatoire de 3 à 16 ans.'],
      ['En quelle année les femmes obtiennent-elles le droit de vote en France ?', '1944', ['1789', '1918', '1968'], 'Droit obtenu en 1944, premier vote en 1945.'],
      ['Comment s\'appelle la figure féminine qui symbolise la République ?', 'Marianne', ['Jeanne', 'Joséphine', 'Liberté'], 'Son buste est présent dans toutes les mairies.'],
      ['Que célèbre-t-on le 14 juillet ?', 'La prise de la Bastille (1789)', ['La fin de la guerre', 'L\'anniversaire du roi', 'La découverte de l\'Amérique'], 'Le 14 juillet 1789, les Parisiens prennent la prison de la Bastille.'],
      ['Quelles sont les couleurs du drapeau français ?', 'bleu, blanc, rouge', ['bleu, jaune, rouge', 'vert, blanc, rouge', 'noir, rouge, or'], 'Le drapeau tricolore date de la Révolution.'],
      ['En 1905, une loi importante sépare…', 'les Églises et l\'État', ['la France et l\'Espagne', 'les villes et les campagnes', 'les garçons et les filles'], 'C\'est le principe de laïcité.'],
      ['En 1848, la France abolit définitivement…', 'l\'esclavage', ['la monarchie absolue', 'l\'école', 'les impôts'], 'Grâce notamment à Victor Schœlcher.'],
      ['À partir de quel âge peut-on voter en France aujourd\'hui ?', '18 ans', ['16 ans', '21 ans', '25 ans'], 'Le droit de vote est accordé à 18 ans depuis 1974.'],
      ['Tous les combien d\'années élit-on le président de la République ?', '5 ans', ['4 ans', '7 ans', '10 ans'], 'C\'est le quinquennat (depuis 2002 ; avant, c\'était 7 ans).'],
      ['Qui vote les lois en France ?', 'Le Parlement', ['Le maire', 'Le président seul', 'Les juges'], 'Le Parlement = l\'Assemblée nationale + le Sénat.']
    ] },
    { id: 'industrie', title: 'L\'âge industriel', icon: '🏭', desc: 'Machines, usines, mines et inventions du XIXe siècle', bank: [
      ['Quelle machine a révolutionné l\'industrie au XIXe siècle ?', 'la machine à vapeur', ['l\'ordinateur', 'le moulin à vent', 'la charrue'], 'Elle fait fonctionner les usines, les trains et les bateaux.'],
      ['Quelle énergie alimentait les machines à vapeur ?', 'le charbon', ['l\'électricité solaire', 'le vent', 'le pétrole'], 'On brûlait du charbon pour chauffer l\'eau et produire de la vapeur.'],
      ['Qui a perfectionné la machine à vapeur ?', 'James Watt', ['Thomas Edison', 'Louis Pasteur', 'Gustave Eiffel'], 'L\'ingénieur écossais James Watt, vers 1769.'],
      ['Quel roman d\'Émile Zola raconte la vie difficile des mineurs ?', 'Germinal', ['Les Misérables', 'Le Petit Prince', 'Vingt mille lieues sous les mers'], 'Germinal (1885) se déroule dans les mines du nord de la France.'],
      ['Quel moyen de transport se développe grâce à la vapeur ?', 'le chemin de fer', ['l\'avion', 'la fusée', 'la trottinette'], 'Les locomotives à vapeur relient les villes.'],
      ['Comment appelle-t-on le départ des paysans vers les villes ?', 'l\'exode rural', ['la migration des oiseaux', 'la transhumance', 'les vacances'], 'Les paysans partent travailler dans les usines des villes.'],
      ['Pour défendre leurs droits, les ouvriers créent…', 'des syndicats', ['des châteaux', 'des armées', 'des écoles de ninjas'], 'Les syndicats sont autorisés en 1884.'],
      ['Qui a inventé l\'ampoule électrique (vers 1879) ?', 'Thomas Edison', ['James Watt', 'Napoléon III', 'Marie Curie'], 'L\'électricité transforme ensuite les villes et les usines.'],
      ['Qu\'inventent les frères Lumière en 1895 ?', 'le cinématographe', ['le téléphone', 'l\'avion', 'la photographie'], 'Ils réalisent les premières projections de films.'],
      ['Pour quelle occasion la tour Eiffel a-t-elle été construite ?', 'l\'Exposition universelle de 1889', ['les Jeux olympiques de 1924', 'le couronnement d\'un roi', 'la fin de la guerre'], 'Elle montrait les progrès de l\'industrie du fer.'],
      ['En 1841, une loi interdit le travail des enfants de moins de…', '8 ans', ['16 ans', '3 ans', '12 ans'], 'Avant, des enfants très jeunes travaillaient dans les usines et les mines.'],
      ['Où travaillent la plupart des ouvriers au XIXe siècle ?', 'à l\'usine', ['au château', 'au bureau', 'dans un magasin en ligne'], 'Les usines emploient des milliers d\'ouvriers.'],
      ['Comment s\'appellent les maisons d\'ouvriers alignées près des mines du Nord ?', 'les corons', ['les châteaux', 'les huttes', 'les igloos'], 'Les patrons logeaient les mineurs dans ces cités ouvrières.']
    ] },
    { id: 'guerre-14-18', title: 'La Première Guerre mondiale', icon: '🪖', desc: '1914-1918 : tranchées, Poilus, armistice', bank: [
      ['Quelles sont les dates de la Première Guerre mondiale ?', '1914 - 1918', ['1939 - 1945', '1870 - 1871', '1789 - 1799'], 'Elle dure plus de 4 ans.'],
      ['Comment surnomme-t-on les soldats français de 14-18 ?', 'les Poilus', ['les Grognards', 'les Mousquetaires', 'les Résistants'], 'Ils ne pouvaient pas se raser dans les tranchées.'],
      ['Où vivaient les soldats sur le front ?', 'dans des tranchées', ['dans des châteaux', 'dans des hôtels', 'sur des bateaux'], 'Des fossés creusés dans la terre, boueux et dangereux.'],
      ['Quelle terrible bataille a lieu en 1916 ?', 'Verdun', ['Waterloo', 'Alésia', 'Marignan'], 'Elle dure 10 mois et fait des centaines de milliers de morts.'],
      ['À quelle date l\'armistice est-il signé ?', '11 novembre 1918', ['14 juillet 1918', '8 mai 1945', '1er janvier 1919'], 'Le 11 novembre est un jour férié en souvenir.'],
      ['Quel monument trouve-t-on dans presque toutes les communes de France ?', 'un monument aux morts', ['une tour Eiffel', 'une pyramide', 'un arc de triomphe'], 'Il porte les noms des soldats morts de la commune.'],
      ['Contre quel pays la France se bat-elle principalement ?', 'l\'Allemagne', ['le Royaume-Uni', 'l\'Espagne', 'le Japon'], 'L\'Allemagne et l\'Autriche-Hongrie contre la France, le Royaume-Uni et la Russie.'],
      ['Quel traité met fin officiellement à la guerre en 1919 ?', 'le traité de Versailles', ['le traité de Rome', 'le traité de Paris 2024', 'l\'édit de Nantes'], 'Il est signé dans la galerie des Glaces du château de Versailles.'],
      ['Quelle nouvelle arme terrible est utilisée dans les tranchées ?', 'les gaz de combat', ['les arcs', 'les catapultes', 'les sabres de ninja'], 'Les soldats portaient des masques à gaz.'],
      ['Quel grand pays entre en guerre en 1917 aux côtés de la France ?', 'les États-Unis', ['la Chine', 'le Brésil', 'l\'Australie'], 'Leur arrivée aide à la victoire.'],
      ['Quel événement déclenche la guerre en 1914 ?', 'l\'assassinat de l\'archiduc François-Ferdinand', ['la prise de la Bastille', 'la découverte de l\'Amérique', 'l\'invention du train'], 'Il est assassiné à Sarajevo le 28 juin 1914.'],
      ['Où est enterré le Soldat inconnu ?', 'sous l\'Arc de triomphe à Paris', ['au Mont-Saint-Michel', 'à Versailles', 'à Marseille'], 'Une flamme y est ravivée chaque soir.']
    ] },
    { id: 'guerre-39-45', title: 'La Seconde Guerre mondiale', icon: '🕊️', desc: '1939-1945 : occupation, Résistance, Libération', bank: [
      ['Quelles sont les dates de la Seconde Guerre mondiale ?', '1939 - 1945', ['1914 - 1918', '1945 - 1950', '1929 - 1933'], 'Elle touche le monde entier.'],
      ['Qui dirige l\'Allemagne nazie ?', 'Adolf Hitler', ['Napoléon', 'Charles de Gaulle', 'Winston Churchill'], 'Un dictateur aux idées racistes.'],
      ['Qui lance l\'appel du 18 juin 1940 à la radio depuis Londres ?', 'le général de Gaulle', ['le maréchal Pétain', 'Jules Ferry', 'Jean Jaurès'], 'Il appelle les Français à continuer le combat.'],
      ['Comment appelle-t-on les Français qui luttent contre l\'occupant ?', 'les résistants', ['les Poilus', 'les collaborateurs', 'les sans-culottes'], 'Ils sabotent, cachent des personnes, transmettent des messages.'],
      ['Comment s\'appelle le régime du maréchal Pétain qui collabore avec l\'Allemagne ?', 'le régime de Vichy', ['la Ve République', 'l\'Empire', 'la Commune'], 'Il siège dans la ville de Vichy.'],
      ['Quel est le jour du Débarquement en Normandie ?', '6 juin 1944', ['11 novembre 1918', '14 juillet 1789', '8 mai 1945'], 'Le « D-Day » : les Alliés débarquent sur les plages normandes.'],
      ['À quelle date la guerre se termine-t-elle en Europe ?', '8 mai 1945', ['11 novembre 1918', '6 juin 1944', '1er septembre 1939'], 'L\'Allemagne capitule le 8 mai 1945.'],
      ['Comment appelle-t-on le génocide des Juifs par les nazis ?', 'la Shoah', ['la Renaissance', 'la Révolution', 'l\'exode rural'], 'Environ 6 millions de Juifs ont été assassinés.'],
      ['Qui est le grand chef de la Résistance mort en 1943 ?', 'Jean Moulin', ['Louis XIV', 'Victor Hugo', 'Jules Verne'], 'Il a unifié les mouvements de Résistance.'],
      ['Quelle jeune fille juive a écrit un journal célèbre en se cachant ?', 'Anne Frank', ['Marie Curie', 'Jeanne d\'Arc', 'Simone Veil'], 'Son journal raconte deux ans de vie cachée à Amsterdam.'],
      ['Quelle organisation est créée en 1945 pour maintenir la paix dans le monde ?', 'l\'ONU', ['l\'Union européenne', 'les Jeux olympiques', 'l\'OTAN'], 'L\'Organisation des Nations unies.'],
      ['Quel est l\'événement qui commence la guerre en 1939 ?', 'l\'invasion de la Pologne par l\'Allemagne', ['le Débarquement', 'l\'armistice', 'la prise de la Bastille'], 'Le 1er septembre 1939.']
    ] },
    { id: 'europe', title: 'La construction européenne', icon: '🇪🇺', desc: 'De la guerre à l\'Union européenne', bank: [
      ['En quelle année est signé le traité de Rome, début de l\'Europe ?', '1957', ['1945', '1992', '2002'], 'Six pays fondent la Communauté économique européenne.'],
      ['Combien de pays ont fondé la Communauté européenne en 1957 ?', '6', ['2', '12', '27'], 'France, Allemagne, Italie, Belgique, Pays-Bas, Luxembourg.'],
      ['Quelle est la monnaie commune de nombreux pays européens ?', 'l\'euro', ['le franc', 'le dollar', 'le yen'], 'Les pièces et billets en euros circulent depuis 2002.'],
      ['Comment est le drapeau européen ?', '12 étoiles dorées sur fond bleu', ['27 étoiles sur fond rouge', 'un cercle blanc sur fond vert', 'des bandes bleues et jaunes'], 'Le nombre 12 symbolise la perfection et l\'unité.'],
      ['Combien de pays font partie de l\'Union européenne aujourd\'hui ?', '27', ['12', '6', '50'], 'Depuis la sortie du Royaume-Uni en 2020.'],
      ['Dans quelle ville française siège le Parlement européen ?', 'Strasbourg', ['Paris', 'Lyon', 'Bordeaux'], 'Strasbourg est une capitale européenne.'],
      ['Quel est l\'hymne européen ?', 'L\'Ode à la joie', ['La Marseillaise', 'Frère Jacques', 'God Save the King'], 'Musique de Beethoven.'],
      ['Quelle est la devise de l\'Union européenne ?', 'Unie dans la diversité', ['Liberté, Égalité, Fraternité', 'Toujours plus loin', 'La force est en nous'], ''],
      ['Quel jour fête-t-on l\'Europe ?', 'le 9 mai', ['le 14 juillet', 'le 1er janvier', 'le 25 décembre'], 'En souvenir de la déclaration de Robert Schuman, le 9 mai 1950.'],
      ['Quel pays a quitté l\'Union européenne en 2020 ?', 'le Royaume-Uni', ['l\'Allemagne', 'l\'Espagne', 'la Belgique'], 'C\'est le « Brexit ».'],
      ['Pourquoi les pays européens se sont-ils unis après 1945 ?', 'pour garantir la paix', ['pour faire la guerre', 'pour choisir un roi', 'pour construire des pyramides'], 'Après deux guerres mondiales, ils voulaient ne plus jamais se battre entre eux.'],
      ['Qui est considéré comme l\'un des « pères de l\'Europe » ?', 'Robert Schuman', ['Jules César', 'Louis XIV', 'Charlemagne seul'], 'Avec Jean Monnet, il a lancé la construction européenne.']
    ] }
  ]
});
