import { BREVES } from "@/lib/data";

export default function Breves() {
  return (
    <>
      {BREVES.map((b) => (
        <article key={b.titre} className={b.aujourdhui ? "carte jour" : "carte"}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="petit">{b.date}</span>
            <span className="pays">{b.pays}</span>
            {b.aujourdhui && <span className="badge">AUJOURD&apos;HUI</span>}
          </div>
          <h2 className="tv titre-breve">{b.titre}</h2>
          <p>{b.texte}</p>
          <a className="lien" href={b.url} target="_blank" rel="noopener noreferrer">
            Lire la source
          </a>
        </article>
      ))}
    </>
  );
}
