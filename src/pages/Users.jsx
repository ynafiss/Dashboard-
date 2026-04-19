import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import ChartCard from "../components/ChartCard";
import KpiCards from "../components/KpiCards";
import "./Dashboard.css";

const kpi = {
  rev: "1.12M", revD: "+27.8%",
  usr: "84.3k", usrD: "+19.2%",
  cvr: "6.8%",  cvrD: "+1.4%",
  aov: "4.2",   aovD: "+0.6",
  chr: "2.8%",  chrD: "-1.1%",
};

const TIP = { backgroundColor: "#111", titleColor: "#fff", bodyColor: "#bbb", padding: 10, cornerRadius: 8 };

function UserGrowthChart() {
  const ref = useRef(null); const inst = useRef(null);
  useEffect(() => {
    if (inst.current) inst.current.destroy();
    inst.current = new Chart(ref.current, {
      type: "line",
      data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [
          { label: "Total users", data: [720,820,890,980,1100,1250,1180,1380,1290,1540,1460,1750], borderColor: "#378ADD", backgroundColor: "rgba(55,138,221,0.08)", borderWidth: 2.5, tension: 0.4, fill: true, pointRadius: 4, pointHoverRadius: 7, yAxisID: "y" },
          { label: "New signups", data: [120,140,130,155,175,210,165,220,185,250,215,290], borderColor: "#1D9E75", borderWidth: 2, tension: 0.4, borderDash: [5,3], pointRadius: 3, pointHoverRadius: 6, yAxisID: "y1" },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, interaction: { mode: "index", intersect: false },
        scales: {
          x:  { grid: { color: "rgba(128,128,128,0.08)" }, ticks: { color: "#888", font: { size: 11 } } },
          y:  { grid: { color: "rgba(128,128,128,0.08)" }, ticks: { color: "#888", font: { size: 11 } }, position: "left" },
          y1: { grid: { display: false }, ticks: { color: "#888", font: { size: 11 } }, position: "right" },
        },
        plugins: { legend: { display: false }, tooltip: TIP } },
    });
    return () => inst.current?.destroy();
  }, []);
  return <canvas ref={ref} role="img" aria-label="User growth and new signups" />;
}

function RetentionChart() {
  const ref = useRef(null); const inst = useRef(null);
  useEffect(() => {
    if (inst.current) inst.current.destroy();
    inst.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: ["Week 1","Week 2","Week 3","Week 4","Week 6","Week 8","Week 12"],
        datasets: [{ label: "Retention %", data: [100, 72, 61, 54, 46, 41, 36], backgroundColor: ["rgba(55,138,221,0.9)","rgba(55,138,221,0.8)","rgba(55,138,221,0.7)","rgba(55,138,221,0.6)","rgba(55,138,221,0.5)","rgba(55,138,221,0.4)","rgba(55,138,221,0.3)"], borderRadius: 5, borderSkipped: false }],
      },
      options: { responsive: true, maintainAspectRatio: false,
        scales: { x: { grid: { display: false }, ticks: { color: "#888", font: { size: 11 } } }, y: { grid: { color: "rgba(128,128,128,0.08)" }, ticks: { color: "#888", font: { size: 11 }, callback: v => v + "%" }, max: 100 } },
        plugins: { legend: { display: false }, tooltip: { ...TIP, callbacks: { label: ctx => ` Retained: ${ctx.parsed.y}%` } } } },
    });
    return () => inst.current?.destroy();
  }, []);
  return <canvas ref={ref} role="img" aria-label="User retention cohort" />;
}

function UsersByCountryChart() {
  const ref = useRef(null); const inst = useRef(null);
  useEffect(() => {
    if (inst.current) inst.current.destroy();
    inst.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: ["USA","Morocco","Germany","France","UK","Canada","Spain","Japan"],
        datasets: [{ label: "Users", data: [38400, 12800, 9600, 8200, 7400, 6100, 4800, 3900], backgroundColor: "rgba(127,119,221,0.8)", borderRadius: 5, borderSkipped: false }],
      },
      options: { responsive: true, maintainAspectRatio: false, indexAxis: "y",
        scales: { x: { grid: { color: "rgba(128,128,128,0.08)" }, ticks: { color: "#888", font: { size: 11 } } }, y: { grid: { display: false }, ticks: { color: "#888", font: { size: 11 } } } },
        plugins: { legend: { display: false }, tooltip: TIP } },
    });
    return () => inst.current?.destroy();
  }, []);
  return <canvas ref={ref} role="img" aria-label="Users by country" />;
}

function UserTypeChart() {
  const ref = useRef(null); const inst = useRef(null);
  useEffect(() => {
    if (inst.current) inst.current.destroy();
    inst.current = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels: ["Free", "Pro", "Business", "Enterprise"],
        datasets: [{ data: [54, 28, 13, 5], backgroundColor: ["#888780","#378ADD","#7F77DD","#1D9E75"], borderWidth: 0, hoverOffset: 8 }],
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: "68%",
        plugins: { legend: { display: false }, tooltip: { ...TIP, callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` } } } },
    });
    return () => inst.current?.destroy();
  }, []);
  return <canvas ref={ref} role="img" aria-label="Users by plan type" />;
}

export default function Users() {
  return (
    <div className="dashboard">
      <div style={{ marginBottom: "1.25rem" }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: "var(--color-text)", marginBottom: 4 }}>Users</h1>
        <p style={{ fontSize: 13, color: "var(--color-muted)" }}>User growth, retention, and demographics — last 12 months</p>
      </div>
      <KpiCards kpi={kpi} />
      <div className="chart-grid">
        <ChartCard title="User growth" sub="total vs new signups" wide
          legend={[{ label: "Total users", color: "#378ADD" }, { label: "New signups", color: "#1D9E75", dashed: true }]}>
          <UserGrowthChart />
        </ChartCard>
        <ChartCard title="Retention cohort" sub="% retained over time">
          <RetentionChart />
        </ChartCard>
        <ChartCard title="Users by plan" sub="distribution"
          legend={[{ label: "Free 54%", color: "#888780" }, { label: "Pro 28%", color: "#378ADD" }, { label: "Business 13%", color: "#7F77DD" }, { label: "Enterprise 5%", color: "#1D9E75" }]}>
          <UserTypeChart />
        </ChartCard>
        <ChartCard title="Top countries" sub="by user count" wide>
          <UsersByCountryChart />
        </ChartCard>
      </div>
    </div>
  );
}