import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import ChartCard from "./ChartCard";
import { TIP_DEFAULTS } from "../data/dashboardData";

const LEGEND = [
  { label: "New users", color: "#7F77DD" },
  { label: "Returning", color: "#D4537E" },
];

export default function AcquisitionBar({ data }) {
  const ref = useRef(null);
  const instance = useRef(null);

  useEffect(() => {
    if (instance.current) instance.current.destroy();
    instance.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: data.acquisition.weeks,
        datasets: [
          {
            label: "New users",
            data: data.acquisition.newU,
            backgroundColor: "rgba(127,119,221,0.8)",
            borderRadius: 4,
            borderSkipped: false,
            stack: "s",
          },
          {
            label: "Returning",
            data: data.acquisition.ret,
            backgroundColor: "rgba(212,83,126,0.7)",
            borderRadius: 4,
            borderSkipped: false,
            stack: "s",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { color: "#888", font: { size: 11 } }, stacked: true },
          y: { grid: { color: "rgba(128,128,128,0.08)" }, ticks: { color: "#888", font: { size: 11 } }, stacked: true },
        },
        plugins: {
          legend: { display: false },
          tooltip: { ...TIP_DEFAULTS, mode: "index", intersect: false },
        },
      },
    });
    return () => instance.current?.destroy();
  }, [data]);

  return (
    <ChartCard title="Weekly user acquisition" sub="new vs returning" legend={LEGEND}>
      <canvas ref={ref} role="img" aria-label="Stacked bar chart of new vs returning users" />
    </ChartCard>
  );
}