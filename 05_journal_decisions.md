# Le Tir Groupé : journal des décisions

| Date | Décision | Raison |
|---|---|---|
| 2026-11-12 | Architecture en 5 briques ; le LLM uniquement pour la Veille, le Quiz et le Vérificateur | Fiabilité : les points et les résultats doivent être exacts |
| 2026-11-12 | Données officielles via l'API biathlonresults.com | Source IBU, couvre calendrier, startlists et résultats |
| 2026-11-12 | Cotes : Winamax (marché podium) relevé par Claude in Chrome en tâche Cowork ; cote maison en secours | Choix de Riri ; le secours garantit le jeu si l'ordinateur est éteint |
| 2026-11-12 | Barème des pronos : 25 × cote podium (bornée entre 1 et 10), +50 si podium complet | Équilibre avec le quiz (1 000 points maximum par étape) |
| 2026-11-12 | Quiz : 10 questions, 2 tirs de 5, Money Drop inversé, correction à la fermeture | Mécanique du quiz GDIY ; évite la triche entre joueurs |
| 2026-11-12 | Relais exclus des pronos en V1 | Le prono « podium d'athlètes » ne s'applique pas aux équipes |
| 2026-11-12 | Validation manuelle du quiz par Riri pendant 3 étapes | Risque d'erreurs factuelles de l'IA |
| 2026-11-12 | UX : 3 onglets (Brèves, Quiz, Pronos) ; UI neige et pas de tir | Brief de Riri |
| 2026-11-12 | Mondiaux d'Otepää (10 au 21 février 2027) inclus : 2 quiz (un par semaine), pronos sur toutes les courses individuelles, pas de coefficient | Demande de Riri ; ils pèsent déjà environ double sans multiplicateur |
| 2026-11-12 | Relevé des cotes chaque veille de jour de course individuelle (pas seulement la veille d'étape) + resynchro de l'heure à départ − 2 h ; heures stockées en UTC | Test Kontiolahti : sinon 3 courses sur 4 sans cote Winamax ; les horaires divergent entre sources |
| 2026-11-12 | Veille : intérêt pour des fans français avant originalité ; date lue sur la page ; sources indépendantes définies ; suites de sujet autorisées | Test Kontiolahti : critères contradictoires, dates floues, dédoublonnage trop strict |
| 2026-11-12 | Pendant la validation manuelle, les points de quiz de Riri = moyenne des 3 autres joueurs ; règle des 2 sources alignée entre prompt et règles ; édition = étape ; lettres et longueur des choix encadrées | Test Kontiolahti : Riri voit les réponses avant de jouer ; le prompt était moins exigeant que les règles |
| 2026-11-12 | Maquette cliquable validée comme référence visuelle ; 3 ajustements du design (trait de mise, correction sur bandeau sombre, gris assombri) | Lisibilité constatée sur maquette |
| À trancher | Stack identique au quiz GDIY ? | Mutualiser le module Money Drop |
