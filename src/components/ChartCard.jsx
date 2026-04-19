import "./ChartCard.css";

export default function ChartCard({ title, sub, legend, children, wide }) {
  return (
    <div className={`chart-card${wide ? " chart-card--wide" : ""}`}>
      <div className="chart-card__head">
        <span className="chart-card__title">{title}</span>
        {sub && <span className="chart-card__sub">{sub}</span>}
      </div>
      {legend && (
        <div className="chart-card__legend">
          {legend.map((item) => (
            <span className="legend-item" key={item.label}>
              <span
                className="legend-dot"
                style={{
                  background: item.color,
                  borderRadius: item.round ? "50%" : "2px",
                  borderStyle: item.dashed ? "dashed" : "solid",
                  borderWidth: item.dashed ? "1px" : "0",
                  borderColor: item.dashed ? item.color : "transparent",
                  background: item.dashed ? "transparent" : item.color,
                }}
              />
              {item.label}
            </span>
          ))}
        </div>
      )}
      <div className="chart-card__body">{children}</div>
    </div>
  );
}