"use client";

import { useState } from "react";
import { JOUEURS, MOI } from "@/lib/data";
import Pastille from "./Pastille";

const pts = (n: number) => n.toLocaleString("fr-FR");

export default function Classement({ onFermer }: { onFermer: () => void }) {
  const [onglet, setOnglet] = useState<"etape" | "saison">("etape");
  return (
    <>
      <div className="ligne">
        <span className="tv" style={{ fontSize: 28 }}>Classement</span>
        <button className="rond" aria-label="Fermer le classement" onClick={onFermer}>✕</button>
      </div>
      <div className="onglets-classement">
        <button aria-pressed={onglet === "etape"} onClick={() => setOnglet("etape")}>Étape</button>
        <button aria-pressed={onglet === "saison"} onClick={() => setOnglet("saison")}>Saison</button>
      </div>
      <span className="petit">{onglet === "etape" ? "Kontiolahti · données fictives" : "Saison 2026/27 · 1 étape jouée"}</span>
      {JOUEURS.map((j, r) => (
        <div key={j.pseudo} className={j.pseudo === MOI ? "barre moi" : "barre"}>
          <span className="tv rang">{r + 1}</span>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
            <span className="tv pseudo">{j.pseudo}</span>
            {onglet === "etape" && (
              <div style={{ display: "flex", gap: 4 }}>
                {j.quiz.map((p, i) => (
                  <Pastille key={i} points={p} taille="mini" />
                ))}
              </div>
            )}
          </div>
          <span className="tv total num">{pts(j.total)}</span>
        </div>
      ))}
    </>
  );
}
