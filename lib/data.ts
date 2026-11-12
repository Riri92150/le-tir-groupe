// Données du squelette [TEST]. Les brèves sont réelles (test Kontiolahti, 12 nov. 2026).
// Joueurs, scores et cotes sont FICTIFS : ils seront remplacés par Supabase et l'API IBU.

export type Breve = {
  date: string;
  pays: string;
  aujourdhui: boolean;
  titre: string;
  texte: string;
  url: string;
};

export const BREVES: Breve[] = [
  {
    date: "Jeu. 12 nov.",
    pays: "FR",
    aujourdhui: true,
    titre: "Bessans : sept Bleues pour deux billets vers Kontiolahti",
    texte:
      "Cinq Françaises ont déjà leur place pour l'ouverture à Kontiolahti puis Hochfilzen. La victoire de Paula Botet au général de l'IBU Cup a offert deux places de plus, que sept biathlètes se disputent à Bessans d'ici dimanche.",
    url: "https://www.ouest-france.fr/sport/biathlon/biathlon-programme-complet-enjeux-diffusion-tv-tout-savoir-sur-les-selections-ffs-a-bessans-en-france-2acf85c2-dd1f-11f1-86b6-0a2fbb1d8ed9",
  },
  {
    date: "Lun. 9 nov.",
    pays: "NO",
    aujourdhui: false,
    titre: "Christiansen fixe sa ligne d’arrivée",
    texte:
      "Le Norvégien, champion olympique et triple champion du monde, arrêtera au plus tard après les Mondiaux 2029 à Oslo. Il ne se voit pas aux JO 2030, jugeant la sélection norvégienne trop dure à décrocher.",
    url: "https://www.tips.at/nachrichten/oesterreich/oesterreich-welt/741500-biathlon-olympia-sieger-kuendigt-karriereende-an",
  },
  {
    date: "Dim. 8 nov.",
    pays: "FI",
    aujourdhui: false,
    titre: "Kontiolahti lance la saison le 26 novembre",
    texte:
      "Six courses en quatre jours en Finlande : deux individuels, deux relais mixtes et deux sprints. Quatre d'entre elles ouvriront des pronos dans l'appli.",
    url: "https://kontiolahtibiathlon.com/en/kontiolahti-biathlon-world-cup/program-and-tickets",
  },
];

export type Question = {
  enonce: string;
  choix: [string, string, string, string];
  bonne: 0 | 1 | 2 | 3;
  explication: string;
};

// Quiz de démonstration sur le règlement (pas le quiz de Kontiolahti).
export const QUIZ_DEMO: Question[] = [
  { enonce: "Combien de cibles un biathlète vise-t-il au total sur un individuel ?", choix: ["10", "15", "20", "25"], bonne: 2, explication: "Quatre tirs de cinq balles, soit vingt cibles." },
  { enonce: "Quelle est la longueur de la boucle de pénalité ?", choix: ["100 m", "150 m", "200 m", "250 m"], bonne: 1, explication: "Une boucle de 150 m par cible manquée en sprint, poursuite, mass start et relais." },
  { enonce: "À quelle distance du pas de tir se trouvent les cibles ?", choix: ["50 m", "25 m", "75 m", "100 m"], bonne: 0, explication: "Les cibles sont à 50 m, en position couchée comme debout." },
  { enonce: "Combien de balles de réserve par tir en relais ?", choix: ["0", "2", "5", "3"], bonne: 3, explication: "Trois balles à charger une par une ; au-delà, direction la boucle." },
  { enonce: "En individuel, que coûte une cible manquée ?", choix: ["30 s", "1 min", "2 min", "Une boucle"], bonne: 1, explication: "Une minute ajoutée au temps, sans boucle de pénalité." },
  { enonce: "Combien d'athlètes au départ d'une mass start de Coupe du monde ?", choix: ["40", "50", "30", "60"], bonne: 2, explication: "Trente athlètes, sélectionnés au classement." },
  { enonce: "Quelle est la distance de l'individuel hommes ?", choix: ["15 km", "20 km", "12,5 km", "25 km"], bonne: 1, explication: "20 km pour les hommes, 15 km pour les femmes." },
  { enonce: "Quel est le diamètre de la zone touchée en tir debout ?", choix: ["115 mm", "45 mm", "80 mm", "150 mm"], bonne: 0, explication: "115 mm debout, contre 45 mm couché." },
  { enonce: "Quel est le calibre des carabines de biathlon ?", choix: ["4,5 mm", "7,62 mm", "9 mm", "5,6 mm"], bonne: 3, explication: "Du .22 long rifle, soit 5,6 mm." },
  { enonce: "Quel est le poids minimum d'une carabine de biathlon ?", choix: ["2,5 kg", "3,5 kg", "4,5 kg", "5,5 kg"], bonne: 1, explication: "3,5 kg minimum, chargeurs vides et sans munitions." },
];

export type Athlete = { nation: string; nom: string; initiales: string; cote: number; source: "W" | "M" };

// Cotes FICTIVES [TEST].
export const DEPART_INDIV_H: Athlete[] = [
  { nation: "FRA", nom: "Éric Perrot", initiales: "EP", cote: 1.6, source: "W" },
  { nation: "NOR", nom: "Sturla Holm Lægreid", initiales: "SHL", cote: 1.9, source: "W" },
  { nation: "NOR", nom: "Johan-Olav Botn", initiales: "JOB", cote: 2.4, source: "W" },
  { nation: "NOR", nom: "Johannes Dale-Skjevdal", initiales: "JDS", cote: 3.0, source: "W" },
  { nation: "NOR", nom: "Vetle Sjåstad Christiansen", initiales: "VSC", cote: 3.5, source: "W" },
  { nation: "FRA", nom: "Émilien Jacquelin", initiales: "EJ", cote: 3.8, source: "W" },
  { nation: "ITA", nom: "Tommaso Giacomel", initiales: "TG", cote: 4.2, source: "M" },
  { nation: "FRA", nom: "Quentin Fillon Maillet", initiales: "QFM", cote: 4.5, source: "W" },
  { nation: "SWE", nom: "Sebastian Samuelsson", initiales: "SS", cote: 5.5, source: "W" },
  { nation: "GER", nom: "Philipp Nawrath", initiales: "PN", cote: 7.0, source: "M" },
];

// Barème des pronos (01_regles_du_jeu.md, section 3).
export const gainPodium = (cote: number) => Math.round(25 * Math.min(10, Math.max(1, cote)));
export const BONUS_PODIUM_COMPLET = 50;

export type Joueur = { pseudo: string; quiz: number[]; total: number };

export const JOUEURS: Joueur[] = [
  { pseudo: "AMI 2", quiz: [100, 100, 80, 60, 100, 100, 40, 100, 100, 90], total: 1520 },
  { pseudo: "RIRI", quiz: [100, 60, 100, 0, 80, 100, 40, 100, 0, 70], total: 1340 },
  { pseudo: "AMI 1", quiz: [60, 100, 50, 0, 100, 70, 100, 60, 30, 100], total: 1105 },
  { pseudo: "AMI 3", quiz: [100, 0, 0, 40, 100, 0, 60, 100, 0, 50], total: 690 },
];

export const MOI = "RIRI";
