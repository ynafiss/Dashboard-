import { useState } from "react";
import "./Filters.css";

const RANGES = [
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "90d", label: "90 days" },
  { key: "1y", label: "1 year" },
];

export default function Filters({ range, onRange, onRegion, onChannel }) {
  return (
    <div className="filters">
      <span className="filters__label">Filter:</span>
      {RANGES.map((r) => (
        <button
          key={r.key}
          className={`filter-btn${range === r.key ? " active" : ""}`}
          onClick={() => onRange(r.key)}
        >
          {r.label}
        </button>
      ))}
      <select onChange={(e) => onRegion(e.target.value)} defaultValue="all">
        <option value="all">All regions</option>
        <option value="na">North America</option>
        <option value="eu">Europe</option>
        <option value="apac">APAC</option>
      </select>
      <select onChange={(e) => onChannel(e.target.value)} defaultValue="all">
        <option value="all">All channels</option>
        <option value="organic">Organic</option>
        <option value="paid">Paid</option>
        <option value="social">Social</option>
      </select>
    </div>
  );
}