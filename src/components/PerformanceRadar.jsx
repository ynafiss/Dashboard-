import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import ChartCard from "./ChartCard";
import { TIP_DEFAULTS } from "../data/dashboardData";

const LEGEND = [
  { label: "This period", color: "#378ADD" },
  { label: "Last period", color: "#EF9F27", dashed: true },
];

export default function PerformanceRadar({ data }) {
  const ref = useRef(null);
  const instance = useRef(null);

  useEffect(() => {
    if (instance.current) instance.current.destroy();
    instance.current = new Chart(ref.current, {
      type: "radar",
      data: {
        labels: ["Engagement", "Retention", "Revenue", "Satisfaction", "Growth"],
        datasets: [
          {
            label: "This period",
            data: data.radar.curr,
            borderColor: "#378ADD",
            backgroundColor: "rgba(55,138,221,0.12)",
            borderWidth: 2,
            pointBackgroundColor: "#378ADD",
            pointRadius: 3,
            pointHoverRadius: 5,
          },
          {
            label: "Last period",
            data: data.radar.prev,
            borderColor: "#EF9F27",
            backgroundColor: "rgba(239,159,39,0.08)",
            borderWidth: 2,
            borderDash: [4, 3],
            pointBackgroundColor: "#EF9F27",
            pointRadius: 3,
            pointHoverRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 50, max: 100,
            ticks: { display: false },
            grid: { color: "rgba(128,128,128,0.15)" },
            pointLabels: { color: "#888", font: { size: 11 } },
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
    <ChartCard title="Performance radar" sub="this period vs last" legend={LEGEND}>
      <canvas ref={ref} role="img" aria-label="Radar chart comparing current vs previous period" />
    </ChartCard>
  );
}