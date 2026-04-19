import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import ChartCard from "./ChartCard";
import { TIP_DEFAULTS } from "../data/dashboardData";

export default function TrafficDoughnut({ data }) {
  const ref = useRef(null);
  const instance = useRef(null);

  const legend = data.channels.labels.map((label, i) => ({
    label: `${label} ${data.channels.data[i]}%`,
    color: data.channels.colors[i],
  }));

  useEffect(() => {
    if (instance.current) instance.current.destroy();
    instance.current = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels: data.channels.labels,
        datasets: [
          {
            data: data.channels.data,
            backgroundColor: data.channels.colors,
            borderWidth: 0,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: { display: false },
          tooltip: {
            ...TIP_DEFAULTS,
            callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%` },
          },
        },
      },
    });
    return () => instance.current?.destroy();
  }, [data]);

  return (
    <ChartCard title="Traffic by channel" sub="total sessions" legend={legend}>
      <canvas ref={ref} role="img" aria-label="Doughnut chart of traffic by channel" />
    </ChartCard>
  );
}