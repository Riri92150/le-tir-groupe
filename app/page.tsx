"use client";

import { useState } from "react";
import Breves from "@/components/Breves";
import Quiz from "@/components/Quiz";
import Pronos from "@/components/Pronos";
import Classement from "@/components/Classement";
import { JOUEURS, MOI } from "@/lib/data";

type Ecran = "breves" | "quiz" | "pronos" | "classement";

export default function Page() {
  const [ecran, setEcran] = useState<Ecran>("breves");
  const [retour, setRetour] = useState<Ecran>("breves");
  const rang = JOUEURS.findIndex((j) => j.pseudo === MOI) + 1;
  const moi = JOUEURS.find((j) => j.pseudo === MOI)!;

  const aller = (e: Ecran) => {
    setEcran(e);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="app">
      <header className="entete">
        <span className="tv logo">Le Tir Groupé</span>
        <button
          className="tv puce num"
          aria-label="Ouvrir le classement"
          onClick={() => {
            if (ecran !== "classement") setRetour(ecran);
            aller("classement");
          }}
        >
          {rang === 1 ? "1er" : `${rang}e`} · {moi.total.toLocaleString("fr-FR")}
        </button>
      </header>
      <div className="bandeau-test petit">Version test · données fictives</div>

      <main className="contenu">
        {ecran === "breves" && <Breves />}
        {ecran === "quiz" && <Quiz />}
        {ecran === "pronos" && <Pronos />}
        {ecran === "classement" && <Classement onFermer={() => aller(retour)} />}
      </main>

      <nav className="onglets" aria-label="Navigation principale">
        <div className="onglets-inner">
          <button className="onglet" aria-current={ecran === "breves" ? "page" : undefined} onClick={() => aller("breves")}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5h13v14H6a2 2 0 0 1-2-2z" /><path d="M17 9h3v8a2 2 0 0 1-2 2" /><path d="M8 9h5" /><path d="M8 13h5" /></svg>
            Brèves
          </button>
          <button className="onglet" aria-current={ecran === "quiz" ? "page" : undefined} onClick={() => aller("quiz")}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></svg>
            Quiz
          </button>
          <button className="onglet" aria-current={ecran === "pronos" ? "page" : undefined} onClick={() => aller("pronos")}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><path d="M9 20V8h6v12" /><path d="M3 20v-7h6" /><path d="M15 11h6v9" /><path d="M2 20h20" /></svg>
            Pronos
            <span className="point" aria-label="Action à faire" />
          </button>
        </div>
      </nav>
    </div>
  );
}
