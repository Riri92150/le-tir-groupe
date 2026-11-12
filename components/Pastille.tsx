// Disque de correction : blanc proportionnel aux points (camembert), rouge si 0.
export default function Pastille({ points, taille = "grande", delai = 0 }: { points: number; taille?: "grande" | "mini"; delai?: number }) {
  const classe = taille === "grande" ? "pastille" : "mini";
  if (points === 0) {
    return <span className={`${classe} rate revele`} style={{ animationDelay: `${delai}ms` }} aria-label="0 point" />;
  }
  return (
    <span
      className={`${classe} revele`}
      style={{ background: `conic-gradient(#FFFFFF 0 ${points}%, #000000 ${points}% 100%)`, animationDelay: `${delai}ms` }}
      aria-label={`${points} points`}
    />
  );
}
