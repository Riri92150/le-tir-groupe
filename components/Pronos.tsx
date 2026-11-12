"use client";

import { useState } from "react";
import { BONUS_PODIUM_COMPLET, DEPART_INDIV_H, gainPodium } from "@/lib/data";

type Choix = (number | null)[];
const fr = (n: number) => n.toFixed(2).replace(".", ",");

export default function Pronos() {
  const [choix, setChoix] = useState<Choix>([null, null, null]);
  const [cibleOuverte, setCibleOuverte] = useState<number | null>(null);
  const [filtre, setFiltre] = useState("");

  const nb = choix.filter((c) => c !== null).length;
  const potentiel =
    choix.reduce<number>((t, i) => t + (i === null ? 0 : gainPodium(DEPART_INDIV_H[i].cote)), 0) +
    (nb === 3 ? BONUS_PODIUM_COMPLET : 0);

  const choisir = (i: number) => {
    if (cibleOuverte === null) return;
    const c = [...choix];
    const deja = c.indexOf(i);
    if (deja >= 0) c[deja] = null;
    c[cibleOuverte] = i;
    setChoix(c);
    setCibleOuverte(null);
    setFiltre("");
  };

  const liste = DEPART_INDIV_H.map((a, i) => ({ a, i })).filter(({ a }) =>
    a.nom.toLowerCase().includes(filtre.trim().toLowerCase())
  );

  return (
    <>
      <div className="carte">
        <span className="tv course-titre">Individuel hommes · 20 km</span>
        <span className="petit" style={{ textTransform: "none", letterSpacing: 0 }}>Jeu. 26 nov. · 16:10 · cotes fictives [TEST]</span>
        <div className="slots">
          {choix.map((i, k) => (
            <button
              key={k}
              className={i === null ? "tv slot" : "tv slot plein"}
              aria-label={i === null ? `Choisir l’athlète ${k + 1}` : `Remplacer ${DEPART_INDIV_H[i].nom}`}
              onClick={() => setCibleOuverte(k)}
            >
              {i === null ? "+" : `${DEPART_INDIV_H[i].initiales}\n+${gainPodium(DEPART_INDIV_H[i].cote)}`}
            </button>
          ))}
        </div>
        <span style={{ fontSize: 13, color: "var(--gris)" }}>
          {nb === 0
            ? "Choisis 3 athlètes pour le podium, sans ordre."
            : `Gain potentiel : ${potentiel} pts${nb === 3 ? " (bonus podium complet inclus)" : ` · +${BONUS_PODIUM_COMPLET} si podium complet`}`}
        </span>
      </div>

      <div className="carte">
        <span className="tv course-titre">Individuel femmes · 15 km</span>
        <span style={{ fontSize: 13, color: "var(--gris)" }}>Ven. 27 nov. · 16:10 · ouverture jeudi 20:00</span>
        <div className="slots">
          {[0, 1, 2].map((k) => (
            <button key={k} className="slot ferme" disabled aria-label="Pronos pas encore ouverts" />
          ))}
        </div>
      </div>

      <div className="carte">
        <span className="tv course-titre">Exemple après course</span>
        <span style={{ fontSize: 13, color: "var(--gris)" }}>Démo : les 3 athlètes choisis sont sur le podium</span>
        <div className="slots">
          <span className="tv slot touche" style={{ display: "grid", placeItems: "center" }}>{"EP\n+40"}</span>
          <span className="tv slot touche" style={{ display: "grid", placeItems: "center" }}>{"SHL\n+48"}</span>
          <span className="tv slot touche" style={{ display: "grid", placeItems: "center" }}>{"JOB\n+60"}</span>
        </div>
        <div className="tv parfait">TIR PARFAIT +50</div>
        <span style={{ fontSize: 13, color: "var(--gris)" }}>Total : 198 pts</span>
      </div>

      {cibleOuverte !== null && (
        <div className="voile" onClick={() => setCibleOuverte(null)}>
          <div className="feuille" role="dialog" aria-label="Liste de départ" onClick={(e) => e.stopPropagation()}>
            <div className="ligne">
              <span className="tv" style={{ fontSize: 22 }}>Individuel hommes · cible {cibleOuverte + 1}</span>
              <button className="rond" aria-label="Fermer la liste de départ" onClick={() => setCibleOuverte(null)}>✕</button>
            </div>
            <label className="recherche">
              Rechercher un athlète
              <input type="search" value={filtre} onChange={(e) => setFiltre(e.target.value)} placeholder="Perrot" />
            </label>
            <span style={{ fontSize: 11, color: "var(--gris)" }}>Cotes fictives [TEST] · W = Winamax, M = maison</span>
            <div className="liste">
              {liste.map(({ a, i }) => (
                <button key={a.nom} className={choix.includes(i) ? "athlete choisi" : "athlete"} onClick={() => choisir(i)}>
                  <span className="pays" style={{ width: 34, textAlign: "center" }}>{a.nation}</span>
                  <span className="nom">{a.nom}</span>
                  <span className="cote num">{fr(a.cote)} {a.source}</span>
                  <span className="gain num">+{gainPodium(a.cote)}</span>
                </button>
              ))}
              {liste.length === 0 && <span style={{ padding: 12, color: "var(--gris)" }}>Aucun athlète ne correspond à cette recherche.</span>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
