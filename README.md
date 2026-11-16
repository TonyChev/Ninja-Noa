# 🥷 Ninja Noa : le dojo du CM2

Un jeu éducatif pour réviser **tout le programme de CM2** avec **Maître Kuro**, un sensei ninja qui parle.

## Ce qu'il y a dans le jeu

| Dojo | Matière | Missions |
|---|---|---|
| 🔢 Dojo des Nombres | Mathématiques | Grands nombres, calcul mental, opérations, fractions, décimaux, proportionnalité, mesures et durées, géométrie, problèmes |
| 📜 Dojo des Mots | Français | Présent, imparfait/futur, passé composé, passé simple/conditionnel, reconnaître les temps, nature des mots, fonctions, homophones, accords, vocabulaire |
| 🏯 Temple de l'Histoire | Histoire | République, âge industriel, 1914-1918, 1939-1945, construction européenne |
| 🗻 Montagne de la Géographie | Géographie | Se déplacer, Internet, mieux habiter, repères France, repères monde |
| 🔬 Jardin des Sciences | Sciences | Corps humain, vivant, matière, énergie et électricité, la Terre dans l'Univers |
| 🌉 Pont de l'Anglais | Anglais | Couleurs et nombres, animaux, famille et corps, jours et phrases (avec prononciation anglaise) |

- **38 missions** de 10 questions. Les questions de maths, de conjugaison, d'anglais et de capitales sont **générées à l'infini**, donc toujours différentes.
- Après chaque réponse, une **correction expliquée** s'affiche.
- **Récompenses** :
  - des **médailles** 🥉🥈🥇 à chaque mission (5, 7 ou 9 bonnes réponses sur 10) ;
  - **8 ceintures**, de la blanche à la noire, gagnées avec l'XP ;
  - **32 coupes et exploits** 🏆 : une coupe et une coupe d'or par dojo, les séries de jours, les combos, le Grand Maître du CM2…
- **Défi du Sensei** : un défi quotidien de 10 questions mélangées, avec un bonus d'XP.
- **Voix ninja** : Maître Kuro encourage l'enfant avec une voix grave, grâce à la synthèse vocale du navigateur. Il peut aussi lire les questions à voix haute. La voix, la hauteur et la vitesse se règlent.
- **Comptes** : plusieurs profils possibles, chacun avec un code secret à 4 chiffres facultatif. La progression est enregistrée automatiquement. On peut **exporter et importer une sauvegarde** sous forme de fichier ou de code à copier, pour la garder en sécurité ou changer d'appareil.
- **Espace parents** : débloquer toutes les missions, gérer le code secret, supprimer un compte. Si le code est oublié, une « question pour un parent » permet de le retirer.
- Le jeu s'installe comme une application (PWA) et **fonctionne hors connexion** après la première visite.

## Lancer le jeu

- **Le plus simple** : ouvrir `index.html` dans Chrome, Edge, Safari ou Firefox.
- **En ligne, sur tablette ou téléphone** : activer GitHub Pages (*Settings → Pages → Deploy from branch*), puis ouvrir l'adresse donnée et faire « Ajouter à l'écran d'accueil ».
- **En local avec un serveur** : `python3 -m http.server`, puis aller sur http://localhost:8000.

## Organisation du code

Le projet n'a aucune dépendance et ne demande aucune compilation : HTML, CSS et JavaScript simples.

```
index.html          page unique
css/style.css       thème ninja
js/util.js          outils (questions, nombres en lettres…)
js/content/*.js     contenu pédagogique par matière
js/storage.js       comptes, sauvegarde, export/import
js/voice.js         voix du sensei + effets sonores
js/rewards.js       ceintures, médailles, coupes
js/mascot.js        Maître Kuro (SVG animé)
js/app.js           écrans et logique du jeu
```

Pour ajouter des questions, il suffit de compléter une banque dans `js/content/` au format :
`['Question', 'bonne réponse', ['mauvaise 1', 'mauvaise 2', 'mauvaise 3'], 'explication']`.
