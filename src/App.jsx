import { useState } from "react";
import "./index.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Revenue from "./pages/Revenue";
import Users from "./pages/Users";
import Reports from "./pages/Reports";

const PAGES = { dashboard: Dashboard, analytics: Analytics, revenue: Revenue, users: Users, reports: Reports };

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [isDark, setIsDark] = useState(false);

  const PageComponent = PAGES[page] || Dashboard;

  return (
    <div data-theme={isDark ? "dark" : "light"} style={{ display: "flex", minHeight: "100vh", background: "var(--color-bg)" }}>
      <Sidebar
        currentPage={page}
        onNavigate={setPage}
        isDark={isDark}
        onToggleDark={setIsDark}
      />
      <main style={{ flex: 1, minWidth: 0, overflowY: "auto", background: "var(--color-bg)" }}>
        <PageComponent />
      </main>
    </div>
  );
}