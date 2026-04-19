import { useState } from "react";
import { ALL_DATA } from "../data/dashboardData";
import Filters from "../components/Filters";
import KpiCards from "../components/KpiCards";
import RevenueLineChart from "../components/RevenueLineChart";
import TrafficDoughnut from "../components/TrafficDoughnut";
import AcquisitionBar from "../components/AcquisitionBar";
import PerformanceRadar from "../components/PerformanceRadar";
import RegionBar from "../components/RegionBar";
import "./Dashboard.css";

export default function Dashboard() {
  const [range, setRange] = useState("7d");
  const [region, setRegion] = useState("all");
  const [channel, setChannel] = useState("all");

  const data = ALL_DATA[range];

  return (
    <div className="dashboard">
      <Filters
        range={range}
        onRange={setRange}
        onRegion={setRegion}
        onChannel={setChannel}
      />
      <KpiCards kpi={data.kpi} />
      <div className="chart-grid">
        <RevenueLineChart data={data} range={range} />
        <TrafficDoughnut data={data} />
        <AcquisitionBar data={data} />
        <PerformanceRadar data={data} />
        <RegionBar data={data} />
      </div>
    </div>
  );
}