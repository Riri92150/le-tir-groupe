"use client";

import { useState } from "react";
import { QUIZ_DEMO } from "@/lib/data";
import Pastille from "./Pastille";

type Mises = [number, number, number, number];
const VIDE: Mises = [0, 0, 0, 0];

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [mises, setMises] = useState<Mises>(VIDE);
  const [tirs, setTirs] = useState<(Mises | null)[]>([]);
  const [erreur, setErreur] = useState("");
  const [correction, setCorrection] = useState(false);

  const total = mises.reduce((a, b) => a + b, 0);
  const reste = 100 - total;
  const q = QUIZ_DEMO[index];
  const debut = index < 5 ? 0 : 5;

  const changer = (k: number, delta: number) => {
    if (delta > 0 && total >= 100) return;
    const m = [...mises] as Mises;
    m[k] = Math.max(0, Math.min(100, m[k] + delta));
    setMises(m);
    setErreur("");
  };
  const toutMiser = (k: number) => {
    const m: Mises = [0, 0, 0, 0];
    m[k] = 100;
    setMises(m);
    setErreur("");
  };
  const suivante = (tir: Mises | null) => {
    const t = [...tirs, tir];
    setTirs(t);
    setMises(VIDE);
    if (index >= QUIZ_DEMO.length - 1) setCorrection(true);
    else setIndex(index + 1);
  };
  const tirer = () => {
    if (reste > 0) {
      setErreur("Place les 100 points pour tirer.");
      return;
    }
    suivante(mises);
  };
  const recommencer = () => {
    setIndex(0);
    setMises(VIDE);
    setTirs([]);
    setCorrection(false);
  };

  if (correction) {
    const points = QUIZ_DEMO.map((qq, i) => (tirs[i] ? tirs[i]![qq.bonne] : 0));
    const score = points.reduce((a, b) => a + b, 0);
    return (
      <>
        <div>
          <div className="petit">Correction · quiz de démo</div>
          <div className="tv score num">{score} / 1000</div>
        </div>
        <div className="tv-band">
          {[0, 5].map((d) => (
            <div key={d} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span className="petit">{d === 0 ? "Tir couché" : "Tir debout"}</span>
              <div className="rangee">
                {points.slice(d, d + 5).map((p, i) => (
                  <span key={i} className="cellule num">
                    <Pastille points={p} delai={(d + i) * 150} />
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {QUIZ_DEMO.map((qq, i) => (
          <div key={i} className="carte">
            <div className="ligne">
              <strong style={{ fontSize: 14 }}>{i + 1}. {qq.enonce}</strong>
              <strong className="num" style={{ whiteSpace: "nowrap" }}>{tirs[i] ? `${points[i]} pts` : "non jouée"}</strong>
            </div>
            <span style={{ fontSize: 14 }}>Réponse : {"ABCD"[qq.bonne]}. {qq.choix[qq.bonne]}</span>
            <span style={{ fontSize: 13, color: "var(--gris)" }}>{qq.explication}</span>
          </div>
        ))}
        <button className="secondaire" onClick={recommencer}>Rejouer la démo</button>
      </>
    );
  }

  return (
    <>
      <div className="cible-band">
        <div className="ligne petit" style={{ color: "#5F6873" }}>
          <span>Démo · {index < 5 ? "Tir couché" : "Tir debout"}</span>
          <span>Cible {(index % 5) + 1}/5</span>
        </div>
        <div className="cibles">
          {[0, 1, 2, 3, 4].map((k) => {
            const n = debut + k;
            const etat = n < index ? " fait" : n === index ? " actif" : "";
            return <span key={k} className={`disque${etat}`} aria-hidden="true" />;
          })}
        </div>
      </div>
      <p className="question">{q.enonce}</p>
      {q.choix.map((c, k) => (
        <div key={k} className="reponse" onDoubleClick={() => toutMiser(k)}>
          <span className="tv lettre">{"ABCD"[k]}</span>
          <span className="texte">{c}</span>
          <button className="rond" aria-label={`Retirer 10 points sur ${"ABCD"[k]}`} onClick={() => changer(k, -10)}>−</button>
          <span className="mise num">{mises[k]}</span>
          <button className="rond" aria-label={`Ajouter 10 points sur ${"ABCD"[k]}`} onClick={() => changer(k, 10)}>+</button>
          <span className="trait" style={{ width: `${mises[k]}%` }} />
        </div>
      ))}
      <div className="pied-quiz">
        <div className="ligne">
          <span style={{ fontSize: 14, color: "var(--gris)" }}>
            Reste à placer : <strong className="num" style={{ color: "var(--encre)" }}>{reste}</strong>
          </span>
          <span className="erreur" role="alert">{erreur}</span>
        </div>
        <button className={`tv tirer${reste === 0 ? " pret" : ""}`} onClick={tirer}>TIRER</button>
        <button className="secondaire" onClick={() => suivante(null)}>Passer (0 point)</button>
      </div>
    </>
  );
}
