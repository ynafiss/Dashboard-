import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import ChartCard from "../components/ChartCard";
import KpiCards from "../components/KpiCards";
import "./Dashboard.css";

const kpi = {
  rev: "$9.86M", revD: "+31.2%",
  usr: "$184",   usrD: "+15.6%",
  cvr: "68.4%",  cvrD: "+4.1%",
  aov: "$2.1M",  aovD: "+22.3%",
  chr: "12.4%",  chrD: "+8.7%",
};

const TIP = { backgroundColor: "#111", titleColor: "#fff", bodyColor: "#bbb", padding: 10, cornerRadius: 8 };

function RevenueBreakdownChart() {
  const ref = useRef(null); const inst = useRef(null);
  useEffect(() => {
    if (inst.current) inst.current.destroy();
    inst.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [
          { label: "Subscriptions", data: [310,370,345,435,490,535,460,560,515,635,595,715], backgroundColor: "rgba(55,138,221,0.8)", borderRadius: 4, stack: "s", borderSkipped: false },
          { label: "One-time",      data: [140,160,155,185,210,225,195,240,220,270,255,310], backgroundColor: "rgba(127,119,221,0.75)", borderRadius: 4, stack: "s", borderSkipped: false },
          { label: "Services",      data: [70,80,80,100,110,120,105,120,115,145,130,155], backgroundColor: "rgba(29,158,117,0.7)", borderRadius: 4, stack: "s", borderSkipped: false },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, interaction: { mode: "index", intersect: false },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#888", font: { size: 11 } }, stacked: true },
          y: { grid: { color: "rgba(128,128,128,0.08)" }, ticks: { color: "#888", font: { size: 11 }, callback: v => "$" + v + "k" }, stacked: true },
        },
        plugins: { legend: { display: false }, tooltip: TIP } },
    });
    return () => inst.current?.destroy();
  }, []);
  return <canvas ref={ref} role="img" aria-label="Revenue breakdown by type" />;
}

function MrrChart() {
  const ref = useRef(null); const inst = useRef(null);
  useEffect(() => {
    if (inst.current) inst.current.destroy();
    inst.current = new Chart(ref.current, {
      type: "line",
      data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [
          { label: "MRR ($k)", data: [520,610,580,720,810,880,760,920,850,1050,980,1180], borderColor: "#378ADD", backgroundColor: "rgba(55,138,221,0.08)", borderWidth: 2.5, tension: 0.4, fill: true, pointRadius: 4, pointHoverRadius: 7 },
          { label: "Churn ($k)", data: [42,38,51,35,29,24,38,22,31,18,24,15], borderColor: "#E24B4A", backgroundColor: "rgba(226,75,74,0.06)", borderWidth: 2, tension: 0.4, fill: true, borderDash: [5,3], pointRadius: 3, pointHoverRadius: 5 },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, interaction: { mode: "index", intersect: false },
        scales: { x: { grid: { color: "rgba(128,128,128,0.08)" }, ticks: { color: "#888", font: { size: 11 } } }, y: { grid: { color: "rgba(128,128,128,0.08)" }, ticks: { color: "#888", font: { size: 11 }, callback: v => "$" + v + "k" } } },
        plugins: { legend: { display: false }, tooltip: TIP } },
    });
    return () => inst.current?.destroy();
  }, []);
  return <canvas ref={ref} role="img" aria-label="MRR vs churn" />;
}

function RevenueByChannelChart() {
  const ref = useRef(null); const inst = useRef(null);
  useEffect(() => {
    if (inst.current) inst.current.destroy();
    inst.current = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels: ["Direct", "Organic", "Paid", "Referral", "Social"],
        datasets: [{ data: [34, 28, 20, 11, 7], backgroundColor: ["#378ADD","#1D9E75","#7F77DD","#EF9F27","#D4537E"], borderWidth: 0, hoverOffset: 8 }],
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: "68%",
        plugins: { legend: { display: false }, tooltip: { ...TIP, callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` } } } },
    });
    return () => inst.current?.destroy();
  }, []);
  return <canvas ref={ref} role="img" aria-label="Revenue by channel" />;
}

function PlanChart() {
  const ref = useRef(null); const inst = useRef(null);
  useEffect(() => {
    if (inst.current) inst.current.destroy();
    inst.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: ["Starter","Pro","Business","Enterprise"],
        datasets: [
          { label: "Customers", data: [4200, 2800, 980, 340], backgroundColor: "rgba(55,138,221,0.8)", borderRadius: 5, borderSkipped: false, yAxisID: "y" },
          { label: "Avg revenue", data: [29, 89, 299, 1200], backgroundColor: "rgba(239,159,39,0.75)", borderRadius: 5, borderSkipped: false, yAxisID: "y1" },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { color: "#888", font: { size: 11 } } },
          y:  { grid: { color: "rgba(128,128,128,0.08)" }, ticks: { color: "#888", font: { size: 11 } }, position: "left" },
          y1: { grid: { display: false }, ticks: { color: "#888", font: { size: 11 }, callback: v => "$" + v }, position: "right" },
        },
        plugins: { legend: { display: false }, tooltip: TIP } },
    });
    return () => inst.current?.destroy();
  }, []);
  return <canvas ref={ref} role="img" aria-label="Customers and revenue by plan" />;
}

export default function Revenue() {
  return (
    <div className="dashboard">
      <div style={{ marginBottom: "1.25rem" }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: "var(--color-text)", marginBottom: 4 }}>Revenue</h1>
        <p style={{ fontSize: 13, color: "var(--color-muted)" }}>Revenue streams, MRR and plan breakdown — last 12 months</p>
      </div>
      <KpiCards kpi={kpi} />
      <div className="chart-grid">
        <ChartCard title="Revenue breakdown" sub="by type" wide
          legend={[{ label: "Subscriptions", color: "#378ADD" }, { label: "One-time", color: "#7F77DD" }, { label: "Services", color: "#1D9E75" }]}>
          <RevenueBreakdownChart />
        </ChartCard>
        <ChartCard title="MRR vs churn" sub="monthly recurring"
          legend={[{ label: "MRR", color: "#378ADD" }, { label: "Churn", color: "#E24B4A", dashed: true }]}>
          <MrrChart />
        </ChartCard>
        <ChartCard title="Revenue by channel" sub="full year"
          legend={[{ label: "Direct 34%", color: "#378ADD" }, { label: "Organic 28%", color: "#1D9E75" }, { label: "Paid 20%", color: "#7F77DD" }]}>
          <RevenueByChannelChart />
        </ChartCard>
        <ChartCard title="Customers vs revenue" sub="by plan">
          <PlanChart />
        </ChartCard>
      </div>
    </div>
  );
}