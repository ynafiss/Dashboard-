import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import ChartCard from "../components/ChartCard";
import "./Dashboard.css";

const TIP = { backgroundColor: "#111", titleColor: "#fff", bodyColor: "#bbb", padding: 10, cornerRadius: 8 };

const REPORTS = [
  { title: "Q2 Revenue Summary",       date: "Apr 19, 2026", type: "Revenue",   size: "2.4 MB", color: "#378ADD" },
  { title: "User Acquisition Report",  date: "Apr 15, 2026", type: "Users",     size: "1.8 MB", color: "#1D9E75" },
  { title: "APAC Regional Analysis",   date: "Apr 10, 2026", type: "Analytics", size: "3.1 MB", color: "#7F77DD" },
  { title: "Churn Analysis Q1",        date: "Apr 5, 2026",  type: "Revenue",   size: "1.2 MB", color: "#EF9F27" },
  { title: "Marketing Performance",    date: "Mar 28, 2026", type: "Analytics", size: "2.7 MB", color: "#D4537E" },
  { title: "Infrastructure Cost Q1",   date: "Mar 20, 2026", type: "DevOps",    size: "0.9 MB", color: "#888780" },
];

function QuarterlyChart() {
  const ref = useRef(null); const inst = useRef(null);
  useEffect(() => {
    if (inst.current) inst.current.destroy();
    inst.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: ["Q1 2024","Q2 2024","Q3 2024","Q4 2024","Q1 2025","Q2 2025","Q3 2025","Q4 2025"],
        datasets: [
          { label: "Revenue ($k)", data: [1710, 2250, 2380, 3150, 2010, 2830, 2530, 3210], backgroundColor: "rgba(55,138,221,0.8)", borderRadius: 5, borderSkipped: false, stack: "s" },
          { label: "Expenses ($k)", data: [980, 1100, 1150, 1380, 1020, 1240, 1180, 1420], backgroundColor: "rgba(226,75,74,0.6)", borderRadius: 5, borderSkipped: false, stack: "e" },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, interaction: { mode: "index", intersect: false },
        scales: { x: { grid: { display: false }, ticks: { color: "#888", font: { size: 11 } } }, y: { grid: { color: "rgba(128,128,128,0.08)" }, ticks: { color: "#888", font: { size: 11 }, callback: v => "$" + v + "k" } } },
        plugins: { legend: { display: false }, tooltip: TIP } },
    });
    return () => inst.current?.destroy();
  }, []);
  return <canvas ref={ref} role="img" aria-label="Quarterly revenue vs expenses" />;
}

function ReportTypeChart() {
  const ref = useRef(null); const inst = useRef(null);
  useEffect(() => {
    if (inst.current) inst.current.destroy();
    inst.current = new Chart(ref.current, {
      type: "radar",
      data: {
        labels: ["Revenue","Users","Analytics","Marketing","DevOps","Product"],
        datasets: [
          { label: "Q4 2025", data: [92, 85, 78, 70, 65, 88], borderColor: "#378ADD", backgroundColor: "rgba(55,138,221,0.12)", borderWidth: 2, pointBackgroundColor: "#378ADD", pointRadius: 3 },
          { label: "Q1 2026", data: [88, 91, 82, 76, 71, 84], borderColor: "#1D9E75", backgroundColor: "rgba(29,158,117,0.1)", borderWidth: 2, borderDash:[4,3], pointBackgroundColor: "#1D9E75", pointRadius: 3 },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false,
        scales: { r: { min: 50, max: 100, ticks: { display: false }, grid: { color: "rgba(128,128,128,0.15)" }, pointLabels: { color: "#888", font: { size: 11 } } } },
        plugins: { legend: { display: false }, tooltip: TIP } },
    });
    return () => inst.current?.destroy();
  }, []);
  return <canvas ref={ref} role="img" aria-label="Report coverage radar" />;
}

export default function Reports() {
  return (
    <div className="dashboard">
      <div style={{ marginBottom: "1.25rem" }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: "var(--color-text)", marginBottom: 4 }}>Reports</h1>
        <p style={{ fontSize: 13, color: "var(--color-muted)" }}>Generated reports and quarterly summaries</p>
      </div>

      <div className="chart-grid" style={{ marginBottom: 16 }}>
        <ChartCard title="Quarterly overview" sub="revenue vs expenses" wide
          legend={[{ label: "Revenue", color: "#378ADD" }, { label: "Expenses", color: "#E24B4A" }]}>
          <QuarterlyChart />
        </ChartCard>
        <ChartCard title="Coverage by category" sub="Q4 vs Q1"
          legend={[{ label: "Q4 2025", color: "#378ADD" }, { label: "Q1 2026", color: "#1D9E75", dashed: true }]}>
          <ReportTypeChart />
        </ChartCard>

        <div style={{ gridColumn: "1 / -1", background: "var(--color-bg)", border: "0.5px solid var(--color-border)", borderRadius: 12, padding: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text)" }}>Recent reports</span>
            <button style={{ fontSize: 11, color: "#378ADD", background: "transparent", border: "none", cursor: "pointer" }}>View all</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {REPORTS.map((r) => (
              <div key={r.title} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, transition: "background 0.12s", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--color-surface)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: r.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={r.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text)", marginBottom: 2 }}>{r.title}</p>
                  <p style={{ fontSize: 11, color: "var(--color-muted)" }}>{r.date} · {r.size}</p>
                </div>
                <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 20, background: r.color + "18", color: r.color, fontWeight: 500 }}>{r.type}</span>
                <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--color-muted)", padding: 4, display: "flex", alignItems: "center" }}>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}