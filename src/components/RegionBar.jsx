import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import ChartCard from "./ChartCard";
import { TIP_DEFAULTS } from "../data/dashboardData";

const COLORS = ["rgba(55,138,221,0.85)","rgba(127,119,221,0.8)","rgba(29,158,117,0.8)","rgba(212,83,126,0.75)","rgba(239,159,39,0.8)"];

export default function RegionBar({ data }) {
  const ref = useRef(null);
  const instance = useRef(null);

  useEffect(() => {
    if (instance.current) instance.current.destroy();
    instance.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: data.regions.labels,
        datasets: [
          {
            label: "Revenue ($k)",
            data: data.regions.data,
            backgroundColor: COLORS,
            borderRadius: 5,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        scales: {
          x: {
            grid: { color: "rgba(128,128,128,0.08)" },
            ticks: { color: "#888", font: { size: 11 }, callback: (v) => "$" + v + "k" },
          },
          y: {
            grid: { display: false },
            ticks: { color: "#888", font: { size: 11 } },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            ...TIP_DEFAULTS,
            callbacks: { label: (ctx) => ` $${ctx.parsed.x}k` },
          },
        },
      },
    });
    return () => instance.current?.destroy();
  }, [data]);

  return (
    <ChartCard title="Revenue by region" sub="horizontal breakdown">
      <canvas ref={ref} role="img" aria-label="Horizontal bar chart of revenue by region" />
    </ChartCard>
  );
}