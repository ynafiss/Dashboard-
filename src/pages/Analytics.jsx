import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import ChartCard from "../components/ChartCard";
import KpiCards from "../components/KpiCards";
import "./Dashboard.css";

const kpi = {
  rev: "9.86M", revD: "+31.2%",
  usr: "1.12M", usrD: "+27.8%",
  cvr: "4.4%",  cvrD: "+1.2%",
  aov: "$184",  aovD: "+15.6%",
  chr: "1.4%",  chrD: "-3.5%",
};

const TIP = { backgroundColor: "#111", titleColor: "#fff", bodyColor: "#bbb", padding: 10, cornerRadius: 8 };

function BounceRateChart() {
  const ref = useRef(null); const inst = useRef(null);
  useEffect(() => {
    if (inst.current) inst.current.destroy();
    inst.current = new Chart(ref.current, {
      type: "line",
      data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [
          { label: "Bounce rate %", data: [48,45,50,43,41,38,44,36,39,34,37,32], borderColor: "#D4537E", backgroundColor: "rgba(212,83,126,0.07)", borderWidth: 2, tension: 0.4, fill: true, pointRadius: 3, pointHoverRadius: 6 },
          { label: "Engagement %",  data: [52,55,50,57,59,62,56,64,61,66,63,68], borderColor: "#1D9E75", backgroundColor: "rgba(29,158,117,0.06)", borderWidth: 2, tension: 0.4, fill: true, borderDash:[5,3], pointRadius: 3, pointHoverRadius: 6 },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, interaction: { mode: "index", intersect: false },
        scales: { x: { grid: { color: "rgba(128,128,128,0.08)" }, ticks: { color: "#888", font: { size: 11 } } }, y: { grid: { color: "rgba(128,128,128,0.08)" }, ticks: { color: "#888", font: { size: 11 }, callback: v => v + "%" } } },
        plugins: { legend: { display: false }, tooltip: TIP } },
    });
    return () => inst.current?.destroy();
  }, []);
  return <canvas ref={ref} role="img" aria-label="Bounce rate vs engagement" />;
}

function SessionDurationChart() {
  const ref = useRef(null); const inst = useRef(null);
  useEffect(() => {
    if (inst.current) inst.current.destroy();
    inst.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: ["< 30s","30s–1m","1–3m","3–5m","5–10m","10m+"],
        datasets: [{ label: "Sessions", data: [12400, 18200, 34600, 28900, 19300, 8700], backgroundColor: ["rgba(55,138,221,0.4)","rgba(55,138,221,0.5)","rgba(55,138,221,0.75)","rgba(55,138,221,0.85)","rgba(55,138,221,0.65)","rgba(55,138,221,0.5)"], borderRadius: 5, borderSkipped: false }],
      },
      options: { responsive: true, maintainAspectRatio: false,
        scales: { x: { grid: { display: false }, ticks: { color: "#888", font: { size: 11 } } }, y: { grid: { color: "rgba(128,128,128,0.08)" }, ticks: { color: "#888", font: { size: 11 } } } },
        plugins: { legend: { display: false }, tooltip: TIP } },
    });
    return () => inst.current?.destroy();
  }, []);
  return <canvas ref={ref} role="img" aria-label="Session duration distribution" />;
}

function DeviceChart() {
  const ref = useRef(null); const inst = useRef(null);
  useEffect(() => {
    if (inst.current) inst.current.destroy();
    inst.current = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels: ["Mobile", "Desktop", "Tablet"],
        datasets: [{ data: [58, 34, 8], backgroundColor: ["#378ADD","#7F77DD","#1D9E75"], borderWidth: 0, hoverOffset: 8 }],
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: "68%",
        plugins: { legend: { display: false }, tooltip: { ...TIP, callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` } } } },
    });
    return () => inst.current?.destroy();
  }, []);
  return <canvas ref={ref} role="img" aria-label="Device breakdown" />;
}

function PageViewsChart() {
  const ref = useRef(null); const inst = useRef(null);
  useEffect(() => {
    if (inst.current) inst.current.destroy();
    inst.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: ["/home","/products","/pricing","/blog","/about","/contact"],
        datasets: [{ label: "Page views", data: [84200, 61300, 45800, 38900, 22100, 14600], backgroundColor: "rgba(127,119,221,0.75)", borderRadius: 5, borderSkipped: false }],
      },
      options: { responsive: true, maintainAspectRatio: false, indexAxis: "y",
        scales: { x: { grid: { color: "rgba(128,128,128,0.08)" }, ticks: { color: "#888", font: { size: 11 } } }, y: { grid: { display: false }, ticks: { color: "#888", font: { size: 11 } } } },
        plugins: { legend: { display: false }, tooltip: TIP } },
    });
    return () => inst.current?.destroy();
  }, []);
  return <canvas ref={ref} role="img" aria-label="Top pages by views" />;
}

export default function Analytics() {
  return (
    <div className="dashboard">
      <div style={{ marginBottom: "1.25rem" }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: "var(--color-text)", marginBottom: 4 }}>Analytics</h1>
        <p style={{ fontSize: 13, color: "var(--color-muted)" }}>User behaviour and engagement — last 12 months</p>
      </div>
      <KpiCards kpi={kpi} />
      <div className="chart-grid">
        <ChartCard title="Bounce rate vs engagement" sub="monthly trend" wide
          legend={[{ label: "Bounce rate", color: "#D4537E" }, { label: "Engagement", color: "#1D9E75", dashed: true }]}>
          <BounceRateChart />
        </ChartCard>
        <ChartCard title="Session duration" sub="distribution">
          <SessionDurationChart />
        </ChartCard>
        <ChartCard title="Device breakdown" sub="all sessions"
          legend={[{ label: "Mobile 58%", color: "#378ADD" }, { label: "Desktop 34%", color: "#7F77DD" }, { label: "Tablet 8%", color: "#1D9E75" }]}>
          <DeviceChart />
        </ChartCard>
        <ChartCard title="Top pages" sub="by total views" wide>
          <PageViewsChart />
        </ChartCard>
      </div>
    </div>
  );
}