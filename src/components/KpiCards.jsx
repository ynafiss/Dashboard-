import "./KpiCards.css";

export default function KpiCards({ kpi }) {
  const cards = [
    { label: "Total revenue", val: kpi.rev, delta: kpi.revD },
    { label: "Active users",  val: kpi.usr, delta: kpi.usrD },
    { label: "Conversion",    val: kpi.cvr, delta: kpi.cvrD },
    { label: "Avg order",     val: kpi.aov, delta: kpi.aovD },
    { label: "Churn rate",    val: kpi.chr, delta: kpi.chrD },
  ];

  return (
    <div className="kpi-grid">
      {cards.map((c) => {
        const isUp = c.delta.startsWith("+");
        return (
          <div className="kpi-card" key={c.label}>
            <p className="kpi-label">{c.label}</p>
            <p className="kpi-val">{c.val}</p>
            <p className={`kpi-delta ${isUp ? "up" : "dn"}`}>
              {c.delta} vs prev period
            </p>
          </div>
        );
      })}
    </div>
  );
}