# Le Tir Groupé : règles du jeu

## 1. Périmètre
- **Compétitions couvertes** : la Coupe du monde IBU 2026/27 et les Championnats du monde d'Otepää (Estonie, du 10 au 21 février 2027). Les pronos portent sur les courses individuelles : individuel, individuel court, sprint, poursuite, mass start.
- **Courses exclues en V1** : les relais, les relais mixtes et le relais mixte simple. On ne peut pas faire de prono « podium d'athlètes » sur une course par équipes.
- **Joueurs** : 4, sur invitation.

## 2. Le quiz d'étape (« le pas de tir »)

### Déroulement
- Un quiz est publié par étape, la veille de la 1re course, à 20h (heure de Paris).
- Il est verrouillé à l'heure de départ de la 1re course de l'étape.
- Il compte 10 questions, présentées comme 2 tirs de 5 cibles : questions 1 à 5 = tir couché, questions 6 à 10 = tir debout.

### Les mises
- Pour chaque question, le joueur dispose de 100 points à répartir sur les 4 réponses, par multiples de 10.
- Il doit placer les 100 points pour valider la question. On ne peut pas en garder en réserve.
- Il gagne les points posés sur la bonne réponse. Exemples : 60 sur A (bonne réponse) et 40 sur B donnent 60 points ; 100 sur la bonne réponse donnent 100 points.
- Une question non validée avant le verrouillage rapporte 0.
- Le maximum est de 1 000 points par étape.

### Correction
- Les bonnes réponses sont révélées à la fermeture du quiz, et non question par question. Cela évite que les joueurs se passent les réponses.
- La révélation est animée, cible par cible, comme à la télé (voir `06_design_ui.md`).

### Composition type des 10 questions
| Thème | Nombre | Source des faits |
|---|---|---|
| Actualité récente (7 derniers jours) | 3 | Brèves publiées, ou 2 sources de moins de 7 jours |
| Histoire du site (3 dernières étapes de Coupe du monde sur ce site, quelle que soit la saison) | 3 | API IBU uniquement |
| Biathlon du pays hôte | 2 | API IBU + 2 sources indépendantes |
| Anecdotes, stats, règlement | 2 | 2 sources indépendantes |

Difficulté visée : 3 faciles, 4 moyennes, 3 difficiles.
Une question sur un athlète du pays hôte, construite à partir des podiums du site, relève du thème « Histoire du site ».

## 3. Les pronos

### Déroulement
- Il y a un prono par course individuelle.
- **Ouverture** : dès que les cotes sont relevées. C'est la veille au soir pour les courses du lendemain ; pour une poursuite ou une mass start, après la publication de la liste de départ.
- **Verrouillage** : à l'heure de départ de la course.
- Le joueur choisit 3 athlètes de la liste de départ, sans ordre. Il peut modifier ses choix jusqu'au verrouillage.

### Barème
- Chaque athlète choisi qui termine sur le podium rapporte **25 × cote podium** points, arrondis à l'entier.
- La cote utilisée est **figée au moment de l'ouverture** du prono et affichée au joueur avant son choix. Le gain potentiel est donc visible.
- Pour le calcul, la cote est bornée entre **1,0 et 10,0**. Le gain maximum est donc de 250 points par athlète.
- **Bonus podium complet** : +50 points si les 3 athlètes choisis sont sur le podium.

| Exemple | Calcul | Points |
|---|---|---|
| 3 favorites à cote 1,3, toutes sur le podium | 3 × 33 + 50 | 149 |
| Un seul outsider à cote 6,0 sur le podium | 25 × 6 | 150 |

### Origine des cotes (par ordre de priorité)
1. **Cote Winamax du marché « podium / top 3 »**, relevée par Claude in Chrome.
2. **Cote maison**, si le marché podium n'existe pas, si l'athlète n'y figure pas ou si le relevé a échoué :
   - On regarde les N dernières courses individuelles de Coupe du monde de l'athlète (N au plus 10, même sexe).
   - P = nombre de podiums ; T = nombre de places entre la 4e et la 10e.
   - p = (P + 0,25 × T + 0,5) / (N + 3)
   - cote = 1 / p, bornée à [1,0 ; 10,0].
   - Exemples : 7 podiums et 3 top 10 sur 10 courses donnent une cote de 1,58 ; aucun podium ni top 10 donne la cote maximale de 10,0.
3. Chaque cote affichée porte sa source (« Winamax » ou « Maison »).

À faire avant le lancement : rejouer le barème sur les résultats de la saison 2025/26 pour vérifier qu'aucune stratégie, par exemple « toujours 3 outsiders », ne domine.

## 4. Les Mondiaux d'Otepää (10 au 21 février 2027)
- **Deux quiz.** Les Mondiaux durent 12 jours, ils sont donc traités comme 2 « étapes » de jeu :
  - Semaine 1 : quiz publié la veille de la 1re course, verrouillé au départ du relais mixte d'ouverture.
  - Semaine 2 : quiz publié la veille de la 1re course de la 2e semaine, verrouillé à son départ.
- **Thèmes adaptés.** La catégorie « histoire du site » devient « histoire des Mondiaux » : champions du monde sortants, records de médailles, éditions récentes (données de l'API IBU). Le « pays hôte » est l'Estonie, qui accueille ses premiers Mondiaux de biathlon.
- **Pronos.** Ils portent sur toutes les courses individuelles, avec le même barème et les mêmes cotes podium. Les relais restent exclus.
- **Pas de coefficient.** Les Mondiaux comptent déjà environ double (2 quiz et toutes les courses individuelles), un multiplicateur déséquilibrerait la saison.
- **Classements.** Chaque semaine a son propre classement d'étape (« Otepää S1 » et « Otepää S2 »). Tout compte dans le classement général.

## 5. Cas limites
| Cas | Règle |
|---|---|
| Ex aequo sur le podium (4 athlètes classés dans le top 3) | Tous les athlètes classés dans le top 3 comptent comme sur le podium |
| Athlète choisi non partant ou abandon | 0 point pour cet athlète, aucun remplacement |
| Course annulée | Prono annulé, 0 pour tout le monde |
| Course reportée | Le prono reste ouvert jusqu'au nouveau départ |
| Résultats corrigés par l'IBU après coup (disqualification) | Recalcul automatique si la correction arrive moins de 48 h après la course ; au-delà, on ne touche plus |
| Joueur absent ou n'ayant pas joué | 0 point, pas de pénalité |
| Question de quiz erronée, découverte après coup | Question neutralisée : 100 points pour tout le monde |
| Le validateur du quiz est aussi joueur (3 premières étapes) | Il joue le quiz normalement, mais ses points de quiz sont remplacés par la moyenne des 3 autres joueurs, arrondie à la dizaine |

## 6. Classement
- **Classement général** de la saison : somme des points du quiz et des pronos.
- **Classement d'étape** : quiz de l'étape + pronos des courses de l'étape.
- **Départage** : d'abord le plus de points au quiz, puis le plus d'athlètes trouvés sur le podium.
