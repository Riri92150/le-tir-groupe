# Le Tir Groupé : architecture et règles d'exécution

## 1. Vue d'ensemble
| Brique | Type | Où ça tourne | Rôle |
|---|---|---|---|
| 0. Orchestrateur | Code | Cron Supabase | Lit le calendrier IBU et déclenche les autres briques |
| 1. Agent Veille | LLM + recherche web | Fonction Supabase → API Claude | 1 brève par jour |
| 2. Agent Quiz + Vérificateur | LLM | Fonction Supabase → API Claude | 10 questions par étape |
| 3a. Relevé des cotes | Claude in Chrome | Tâche planifiée Cowork (ton ordinateur) | Cotes podium Winamax |
| 3b. Cote maison | Code | Fonction Supabase | Secours si 3a échoue |
| 4. Résultats et points | Code | Cron Supabase | Podiums, points, classement |
| Notifications | Code | Web Push | Brève, quiz, pronos, résultats |

**Stack** : Next.js (PWA) sur Vercel, Supabase (Postgres, Edge Functions, pg_cron, authentification par lien magique), API Claude, Web Push.
**Données** : API biathlonresults.com (non documentée officiellement mais stable). Prévoir une couche d'accès unique (`lib/ibu.ts`) pour absorber un éventuel changement de format.
**À vérifier en semaine 1** :
- sous quel niveau d'événement l'API range les Mondiaux (avec la Coupe du monde ou à part). Au besoin, l'orchestrateur interroge les deux ;
- le format des identifiants de course. Le test de Kontiolahti suggère `BT2627SWRLCP01S…` (saison, niveau, numéro d'étape, sexe, discipline), à confirmer.

## 2. Modèle de données (Postgres)
- `players` (id, pseudo, email, initiales, push_subscription)
- `stages` (id, ibu_event_id, type [coupe_du_monde|mondiaux], semaine null|1|2, lieu, pays, date_debut, date_fin, inclus_jeu). Les Mondiaux = 2 lignes de `stages` (une par semaine), qui partagent le même `ibu_event_id`.
- `races` (id, stage_id, ibu_race_id, discipline, sexe, depart_utc, statut, individuelle bool)
- `athletes` (ibu_id, nom, prenom, nation, sexe)
- `briefs` (id, date, titre, texte, pays_source, sources jsonb, sujet_hash, statut)
- `quizzes` (id, stage_id, statut [brouillon|valide|publie|ferme|corrige], publie_at, ferme_at)
- `questions` (id, quiz_id, ordre, theme, enonce, choix jsonb[4], bonne_reponse, explication, sources jsonb, neutralisee bool)
- `quiz_bets` (player_id, question_id, mises jsonb {A,B,C,D}, valide_at)
- `odds` (race_id, ibu_id, cote, source [winamax|maison], releve_at)
- `prono_picks` (player_id, race_id, ibu_ids text[3], updated_at)
- `results` (race_id, podium ibu_ids text[], corrige_at)
- `scores` (player_id, stage_id, race_id null, type [quiz|prono|bonus], points)
- `runs` (id, brique, debut, fin, statut, essais, cout_estime, log jsonb)

## 3. Planning (heure de Paris)
| Quand | Brique | Action |
|---|---|---|
| Tous les jours, 6h00 | 0 | Synchronise le calendrier et les listes de départ, détecte : étape demain ? course aujourd'hui ? |
| Tous les jours, 6h15 | 1 | Agent Veille → brève à l'état de brouillon, puis publiée automatiquement |
| Tous les jours, 8h00 | Notifications | Envoi de la brève du jour |
| Veille d'étape, 18h00 | 2 | Génération du quiz, puis Vérificateur, puis statut brouillon. Notification à Riri pour validation |
| Chaque veille d'un jour de course individuelle, 19h00 | 3a | Relevé des cotes Winamax pour les courses individuelles du lendemain |
| Chaque veille d'un jour de course individuelle, 19h45 | 3b | Cote maison pour tout athlète sans cote Winamax |
| Veille d'étape, 20h00 | Notifications | Quiz publié (s'il est validé) |
| Chaque veille d'un jour de course individuelle, 20h00 | Notifications | Pronos ouverts pour les courses du lendemain |
| Jours de course, 1h après la course précédente | 3a + 3b | Cotes pour les poursuites et les mass start (listes de départ connues après la course précédente) |
| Départ − 2 h | 0 | Resynchronise l'heure de départ depuis l'API IBU (report ou avance) et décale le verrouillage |
| Départ − 1 h | Notifications | Rappel aux joueurs qui n'ont pas fait leur prono |
| Départ | 0 | Verrouillage du quiz et du prono |
| Après l'arrivée, toutes les 10 min pendant 3 h | 4 | Récupère le podium, calcule les points, notifie |
| Arrivée + 48 h | 4 | Dernier contrôle de correction des résultats |

Note : le quiz étant révélé à sa fermeture, la correction animée est disponible dès le départ de la 1re course.

## 4. Règles d'exécution (valables pour toutes les briques)
1. **Idempotence.** Chaque tâche vérifie son état en base avant d'agir (« quiz déjà généré pour cette étape ? »). Une double exécution ne crée jamais de doublon et ne compte jamais deux fois des points.
2. **Relances.** En cas d'échec, 2 nouvelles tentatives à 5 puis 15 minutes d'intervalle. Après 3 échecs, alerte Push à Riri seulement. On ne publie jamais un contenu cassé.
3. **Sortie contrôlée.** Chaque agent LLM rend du JSON validé par un schéma (zod). Un JSON invalide compte comme un échec et déclenche une relance.
4. **Validation humaine.** Le quiz reste au statut brouillon tant que Riri ne l'a pas validé, pendant les 3 premières étapes. Pendant cette période, les points de quiz de Riri sont remplacés par la moyenne des 3 autres joueurs (voir `01_regles_du_jeu.md`, section 5). Ensuite, publication automatique si le Vérificateur ne signale aucune question « douteuse ».
5. **Journal.** Chaque exécution écrit une ligne dans `runs` (début, fin, statut, essais, log).
6. **Dégradation douce.** Pas de cotes Winamax : on utilise la cote maison. Pas de brève valide : on n'envoie rien ce jour-là. Pas de quiz validé à 20h : publication décalée, verrouillage inchangé.
7. **Secrets.** Clé API Claude et clés Supabase dans les variables d'environnement, sur un compte perso et non sur les ressources Aneo.
8. **Heures.** Toutes les heures sont stockées en UTC (`depart_utc`) et converties en Europe/Paris uniquement à l'affichage. Aucune heure de course ne vient d'un site tiers ni d'une saisie manuelle : seule l'API IBU fait foi.

## 5. Relevé des cotes Winamax (brique 3a)
- **Outil** : tâche planifiée Cowork qui utilise Claude in Chrome dans ton Chrome.
- **Contrainte forte** : l'ordinateur doit être allumé et éveillé, et l'appli Claude Desktop ouverte. Sinon, la tâche est sautée et la cote maison prend le relais à 19h45.
- **Lecture seule** : pas de connexion à un compte Winamax, pas de pari, pas d'acceptation de bannières au-delà du refus des cookies non essentiels.
- **Transmission** : la tâche ouvre la page admin de l'app (`/admin/cotes`), colle le JSON ci-dessous et valide. L'app vérifie le format et rattache les noms aux `ibu_id` par correspondance de noms (avec une table d'alias en cas d'ambiguïté).
- **À valider en semaine 1** : que le marché « podium / top 3 » existe bien sur Winamax pour les courses de Kontiolahti, et à quel moment il ouvre.

Format attendu :
```json
{
  "releve_at": "2026-11-26T19:02:00+01:00",
  "courses": [
    {
      "libelle_winamax": "Individuel Hommes - Kontiolahti",
      "marche": "podium",
      "cotes": [{ "athlete": "Sturla Holm Laegreid", "cote": 2.10 }]
    }
  ],
  "anomalies": ["Marché podium absent pour l'individuel femmes"]
}
```

## 6. Contrats des agents LLM

### Agent Veille : sortie
```json
{
  "date": "2026-11-27",
  "titre": "≤ 70 caractères",
  "texte": "3 à 4 phrases, reformulées",
  "pays_source": "code ISO du pays du média principal (sert au drapeau de la carte)",
  "sources": [{ "media": "NRK", "url": "https://...", "date_publication": "2026-11-26" }],
  "sujet_hash": "identifiant court du sujet pour dédoublonnage (suffixe « -suite » pour la suite d'un sujet déjà traité)",
  "confiance": "haute | moyenne"
}
```
Règles :
- 2 sources minimum, indépendantes (éditeurs différents, qui ne reprennent pas la même dépêche ni le même communiqué), chacune de moins de 72 h.
- `date_publication` est lue sur la page elle-même, jamais dans l'extrait du moteur de recherche.
- Confiance « haute » si 2 sources indépendantes de moins de 72 h concordent sur tous les faits cités ; « moyenne » sinon. Une confiance « moyenne » n'est pas publiée.

### Agent Quiz : entrée
- Fiche de l'étape (lieu, pays, dates, courses).
- Podiums des 3 dernières étapes de Coupe du monde sur ce site, quelle que soit la saison (une édition = une étape, pas une saison), fournis par le code depuis l'API.
- Classements généraux en cours ; avant la 1re étape de la saison, classements finaux de la saison précédente.
- Brèves des 7 derniers jours.
- Questions des quiz précédents (pour éviter les répétitions).

### Agent Quiz : sortie
```json
{
  "stage_id": "...",
  "questions": [{
    "ordre": 1,
    "theme": "actu | histoire_site | pays_hote | anecdote",
    "difficulte": "facile | moyenne | difficile",
    "enonce": "...",
    "choix": { "A": "...", "B": "...", "C": "...", "D": "..." },
    "bonne_reponse": "B",
    "explication": "1 à 2 phrases affichées à la correction",
    "sources": ["api_ibu:BT2526SWRLCP01SMIN", "https://..."]
  }]
}
```
Contrôles par le code (schéma zod) : 10 questions, chaque choix de 30 caractères maximum, chaque lettre bonne réponse 2 ou 3 fois.

### Agent Vérificateur : sortie
```json
{ "verdicts": [{ "ordre": 1, "statut": "ok | douteuse | fausse", "motif": "..." }] }
```
Les questions « fausses » sont régénérées (une seule fois) ; les « douteuses » sont signalées à Riri.
