# Le Tir Groupé : design UX/UI

> Référence visuelle : la maquette cliquable « Le Tir Groupé : maquette [TEST] » (artefact Claude, 5 écrans).

## 1. Concept : « le pas de tir »
Deux références visuelles guident tout le design :
- **La cible physique** : un bandeau blanc avec 5 disques noirs. Le disque noir devient blanc quand il est touché.
- **L'habillage télé** : des barres sombres arrondies, des noms en capitales italiques condensées, le drapeau, puis 5 pastilles. Pastille blanche = touchée, pastille rouge = manquée, pastille noire = pas encore tirée.

Principe : beaucoup de blanc (la neige), du noir pour les cibles, et du rouge **uniquement** pour signaler une erreur ou un échec. Aucune autre couleur, à part les drapeaux.

## 2. Couleurs
| Jeton | Clair (jour, neige) | Sombre (course de nuit) | Usage |
|---|---|---|---|
| `--neige` | #F7F9FB | #0E1116 | Fond de l'appli |
| `--glace` | #E6EBF0 | #1A1F27 | Cartes, séparateurs |
| `--encre` | #14171C | #F2F4F7 | Texte principal |
| `--gris` | #5F6873 | #8C95A1 | Texte secondaire (assombri pour un contraste ≥ 4,5:1) |
| `--cible` | #1B1D21 | #000000 | Disque non tiré |
| `--touche` | #FFFFFF | #FFFFFF | Disque touché |
| `--barre-tv` | #1C2230 | #232B3B | Barres du classement façon télé |
| `--manque` | #D7263D | #E5384F | Disque manqué ou erreur (seul accent) |
| `--manque-halo` | #6E1420 | #6E1420 | Contour rouge sombre du disque manqué, comme à la télé |

## 3. Typographie
- **Titres, noms, scores** : *Barlow Condensed*, en italique, graisse 700, capitales. C'est l'esprit de l'habillage télé.
- **Texte** : *Inter*, 400 et 600.
- **Chiffres** : chiffres tabulaires, pour que les scores ne « sautent » pas.

## 4. Navigation
- **Barre d'onglets en bas**, avec 3 onglets : **Brèves** (icône journal), **Quiz** (icône cible), **Pronos** (icône podium). Une pastille rouge apparaît s'il reste une action à faire.
- **En-tête** : le logo « LE TIR GROUPÉ » à gauche. À droite, une puce avec le rang et les points du joueur (« 2e · 1 340 »). Un tap sur la puce ouvre le classement en plein écran.
- Aucun autre menu. Le profil et les réglages sont accessibles par un appui long sur la puce.

## 5. Écrans

### Brèves
- Une carte par jour, la plus récente en haut. Chaque carte affiche : la date en petites capitales grises, le drapeau du pays de la source, le titre en Barlow, 3 à 4 phrases, puis le lien « Lire la source ».
- La brève du jour est mise en valeur par une fine bordure noire et le badge « Aujourd'hui ».
- On fait défiler vers le bas pour voir les archives. C'est tout.

### Quiz
- **Avant l'ouverture** : une carte « Prochain pas de tir : Kontiolahti, ouverture mercredi 20h », avec le bandeau de 5 cibles noires.
- **Écran d'intro** : le lieu et le drapeau, « Tir couché » (questions 1 à 5) puis « Tir debout » (questions 6 à 10), et le compte à rebours jusqu'à la fermeture.
- **Écran de question** :
  - En haut, le bandeau de 5 cibles du tir en cours. La cible de la question active est entourée d'un anneau ; celles déjà validées passent en gris clair.
  - Au centre, l'énoncé en grand.
  - Les 4 réponses en lignes pleine largeur, chacune avec un trait noir de 5 px en bas de ligne, proportionnel à la mise, et des boutons − / + par pas de 10. Un appui long sur une réponse y met les 100 points d'un coup.
  - Un compteur collant en bas : « Reste à placer : 40 ».
  - Le bouton « TIRER » s'active quand les 100 points sont placés.
- **Correction** (à la fermeture du quiz) : c'est le moment « télé ».
  - Les 10 cibles sont affichées sur un bandeau sombre (`--barre-tv`), pour que les disques blancs restent visibles.
  - Elles se révèlent une à une, avec un décalage de 150 ms.
  - Chaque disque se blanchit **proportionnellement** aux points gagnés, en secteur de camembert : 100 points = blanc plein, 60 points = 60 % blanc.
  - 0 point : le disque devient rouge, avec son halo rouge sombre et une petite secousse.
  - Sous chaque question : la bonne réponse et l'explication.

### Pronos
- La liste des courses du jour en cartes : « SPRINT FEMMES · 14h30 · ferme dans 3 h 12 ».
- Chaque carte affiche **3 cibles « podium »** vides (noires). Un tap sur une cible ouvre la liste de départ, avec une recherche, le drapeau, la cote et sa source (W pour Winamax, M pour maison), et le gain potentiel : « +150 pts ».
- Une fois les 3 cibles remplies : les initiales des athlètes apparaissent sur les disques, avec le total potentiel en bas.
- **Après la course** : chaque athlète sur le podium donne un disque blanc avec les points gagnés ; sinon, un disque rouge. Un podium complet déclenche un bandeau « TIR PARFAIT +50 ».

### Classement (plein écran, depuis l'en-tête)
- Une reprise directe de l'habillage télé. Une barre sombre arrondie par joueur, avec :
  - le rang ;
  - le pseudo en capitales italiques ;
  - les **10 pastilles du quiz de l'étape en cours** (blanc, blanc partiel ou rouge, comme la correction) ;
  - le total de points à droite.
- Deux onglets en haut : « Étape » et « Saison ».
- La ligne du joueur connecté est légèrement surlignée.

## 6. Mouvements
- **Révélation d'une cible** : retournement de 220 ms (rotation Y), noir vers blanc.
- **Cible manquée** : passage au rouge, puis une secousse horizontale de 3 px, 2 fois.
- **Préférence « réduire les animations »** : fondu simple, sans secousse.

## 7. Principes UX
- **Une action principale par écran**, au maximum.
- **Pensé d'abord pour le téléphone**, utilisable à une main. Les cibles de saisie font au moins 44 px.
- **Pas de texte d'aide**, sauf à la première ouverture : 3 écrans d'accueil (Brèves, Quiz, Pronos).
- **Notifications courtes et actionnables** : « Le pas de tir de Kontiolahti est ouvert : 10 cibles, fermeture jeudi au départ de l’individuel ».
