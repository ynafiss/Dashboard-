export const ALL_DATA = {
  "7d": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    revenue: [38, 45, 42, 58, 63, 71, 55],
    sessions: [12, 15, 13, 18, 20, 22, 17],
    kpi: {
      rev: "$372k", revD: "+12.4%",
      usr: "24.8k", usrD: "+8.1%",
      cvr: "3.2%", cvrD: "-0.3%",
      aov: "$148", aovD: "+5.2%",
      chr: "1.8%", chrD: "-0.4%",
    },
    channels: {
      labels: ["Organic", "Paid", "Social", "Email", "Direct"],
      data: [38, 27, 18, 10, 7],
      colors: ["#378ADD", "#7F77DD", "#D4537E", "#1D9E75", "#EF9F27"],
    },
    acquisition: {
      weeks: ["W1", "W2", "W3", "W4", "W5", "W6", "W7"],
      newU: [820, 940, 870, 1100, 1250, 980, 1050],
      ret: [430, 510, 480, 590, 620, 545, 570],
    },
    radar: { curr: [82, 74, 91, 68, 85], prev: [70, 80, 75, 72, 78] },
    regions: {
      labels: ["North America", "Europe", "APAC", "LATAM", "MEA"],
      data: [142, 98, 76, 34, 22],
    },
  },
  "30d": {
    labels: ["Wk1", "Wk2", "Wk3", "Wk4"],
    revenue: [185, 210, 198, 240],
    sessions: [58, 67, 62, 75],
    kpi: {
      rev: "$833k", revD: "+18.7%",
      usr: "92k", usrD: "+14.3%",
      cvr: "3.8%", cvrD: "+0.5%",
      aov: "$162", aovD: "+9.1%",
      chr: "2.1%", chrD: "-1.2%",
    },
    channels: {
      labels: ["Organic", "Paid", "Social", "Email", "Direct"],
      data: [35, 30, 20, 9, 6],
      colors: ["#378ADD", "#7F77DD", "#D4537E", "#1D9E75", "#EF9F27"],
    },
    acquisition: {
      weeks: ["Wk1", "Wk2", "Wk3", "Wk4"],
      newU: [3800, 4200, 3900, 5100],
      ret: [2100, 2400, 2200, 2800],
    },
    radar: { curr: [85, 77, 88, 72, 90], prev: [74, 82, 79, 68, 81] },
    regions: {
      labels: ["North America", "Europe", "APAC", "LATAM", "MEA"],
      data: [322, 218, 170, 78, 45],
    },
  },
  "90d": {
    labels: ["Jan", "Feb", "Mar"],
    revenue: [620, 710, 680],
    sessions: [198, 225, 215],
    kpi: {
      rev: "$2.01M", revD: "+22.3%",
      usr: "284k", usrD: "+19.5%",
      cvr: "4.1%", cvrD: "+0.8%",
      aov: "$171", aovD: "+11.4%",
      chr: "1.6%", chrD: "-2.1%",
    },
    channels: {
      labels: ["Organic", "Paid", "Social", "Email", "Direct"],
      data: [40, 25, 18, 11, 6],
      colors: ["#378ADD", "#7F77DD", "#D4537E", "#1D9E75", "#EF9F27"],
    },
    acquisition: {
      weeks: ["Jan", "Feb", "Mar"],
      newU: [14000, 16200, 15400],
      ret: [8200, 9500, 9100],
    },
    radar: { curr: [88, 80, 92, 76, 87], prev: [76, 85, 82, 71, 80] },
    regions: {
      labels: ["North America", "Europe", "APAC", "LATAM", "MEA"],
      data: [820, 570, 440, 195, 115],
    },
  },
  "1y": {
    labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    revenue: [520,610,580,720,810,880,760,920,850,1050,980,1180],
    sessions: [165,192,185,228,255,278,242,290,268,330,310,372],
    kpi: {
      rev: "$9.86M", revD: "+31.2%",
      usr: "1.12M", usrD: "+27.8%",
      cvr: "4.4%", cvrD: "+1.2%",
      aov: "$184", aovD: "+15.6%",
      chr: "1.4%", chrD: "-3.5%",
    },
    channels: {
      labels: ["Organic", "Paid", "Social", "Email", "Direct"],
      data: [42, 24, 17, 11, 6],
      colors: ["#378ADD", "#7F77DD", "#D4537E", "#1D9E75", "#EF9F27"],
    },
    acquisition: {
      weeks: ["Q1", "Q2", "Q3", "Q4"],
      newU: [45000, 62000, 58000, 81000],
      ret: [28000, 37000, 34000, 49000],
    },
    radar: { curr: [91, 83, 94, 80, 92], prev: [78, 88, 84, 74, 83] },
    regions: {
      labels: ["North America", "Europe", "APAC", "LATAM", "MEA"],
      data: [3840, 2680, 2110, 920, 540],
    },
  },
};

export const RANGE_LABELS = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  "1y": "Last 12 months",
};

export const TIP_DEFAULTS = {
  backgroundColor: "#111",
  titleColor: "#fff",
  bodyColor: "#bbb",
  padding: 10,
  cornerRadius: 8,
  displayColors: true,
};