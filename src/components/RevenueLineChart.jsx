import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import ChartCard from "./ChartCard";
import { TIP_DEFAULTS, RANGE_LABELS } from "../data/dashboardData";

const LEGEND = [
  { label: "Revenue ($k)", color: "#378ADD" },
  { label: "Sessions (k)", color: "#1D9E75", round: true, dashed: true },
];

export default function RevenueLineChart({ data, range }) {
  const ref = useRef(null);
  const instance = useRef(null);

  useEffect(() => {
    if (instance.current) instance.current.destroy();
    instance.current = new Chart(ref.current, {
      type: "line",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Revenue ($k)",
            data: data.revenue,
            borderColor: "#378ADD",
            backgroundColor: "rgba(55,138,221,0.07)",
            borderWidth: 2.5,
            pointRadius: 4,
            pointHoverRadius: 7,
            tension: 0.45,
            fill: true,
            yAxisID: "y",
          },
          {
            label: "Sessions (k)",
            data: data.sessions,
            borderColor: "#1D9E75",
            backgroundColor: "rgba(29,158,117,0.05)",
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 6,
            tension: 0.45,
            fill: true,
            borderDash: [5, 3],
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        scales: {
          x: {
            grid: { color: "rgba(128,128,128,0.08)" },
            ticks: { color: "#888", font: { size: 11 } },
            border: { dash: [4, 4] },
          },
          y: {
            grid: { color: "rgba(128,128,128,0.08)" },
            ticks: { color: "#888", font: { size: 11 }, callback: (v) => "$" + v + "k" },
            position: "left",
            border: { dash: [4, 4] },
          },
          y1: {
            grid: { display: false },
            ticks: { color: "#888", font: { size: 11 }, callback: (v) => v + "k" },
            position: "right",
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: { ...TIP_DEFAULTS },
        },
      },
    });
    return () => instance.current?.destroy();
  }, [data]);

  return (
    <ChartCard
      title="Revenue vs sessions over time"
      sub={RANGE_LABELS[range]}
      legend={LEGEND}
      wide
    >
      <canvas ref={ref} role="img" aria-label="Dual axis line chart of revenue and sessions" />
    </ChartCard>
  );
}