import { useState } from "react";
import "./Sidebar.css";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", badge: "Live" },
  { id: "analytics", label: "Analytics",  icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { id: "revenue",   label: "Revenue",    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "users",     label: "Users",      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { id: "reports",   label: "Reports",    icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
];

const NOTIFICATIONS = [
  { id: 1, type: "success", text: "Revenue target reached for Q2", time: "2m ago" },
  { id: 2, type: "warning", text: "Conversion rate dropped 0.3%",  time: "18m ago" },
  { id: 3, type: "info",    text: "New report available: APAC Q2", time: "1h ago" },
  { id: 4, type: "success", text: "1,000 new users this week",     time: "3h ago" },
];

const ACTIVITY = [
  { id: 1, user: "YN", name: "Youssef N.",  action: "exported revenue report",   time: "5m ago",  color: "#378ADD" },
  { id: 2, user: "SA", name: "Sara A.",     action: "updated dashboard filters", time: "22m ago", color: "#1D9E75" },
  { id: 3, user: "MK", name: "Mohammed K.", action: "added new data source",     time: "1h ago",  color: "#7F77DD" },
  { id: 4, user: "LB", name: "Leila B.",    action: "shared analytics link",     time: "2h ago",  color: "#D4537E" },
  { id: 5, user: "AO", name: "Amine O.",    action: "generated Q2 summary",      time: "4h ago",  color: "#EF9F27" },
];

const OTHER_SETTINGS = [
  { id: "emailAlerts", label: "Email alerts",      defaultOn: true  },
  { id: "autoRefresh", label: "Auto-refresh data", defaultOn: false },
  { id: "compactView", label: "Compact view",      defaultOn: false },
];

function Icon({ path, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button className={`toggle ${on ? "toggle--on" : ""}`} onClick={() => onChange(!on)} aria-pressed={on}>
      <span className="toggle__thumb" />
    </button>
  );
}

export default function Sidebar({ currentPage, onNavigate, isDark, onToggleDark }) {
  const [notifOpen, setNotifOpen]     = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings]       = useState(Object.fromEntries(OTHER_SETTINGS.map((s) => [s.id, s.defaultOn])));
  const [dismissed, setDismissed]     = useState([]);

  const visibleNotifs = NOTIFICATIONS.filter((n) => !dismissed.includes(n.id));
  const typeColor = { success: "#1D9E75", warning: "#EF9F27", info: "#378ADD" };
  const typeBg    = { success: "rgba(29,158,117,0.08)", warning: "rgba(239,159,39,0.08)", info: "rgba(55,138,221,0.08)" };

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <div className="sidebar__logo-mark">AN</div>
        <div>
          <p className="sidebar__brand">Analytics</p>
          <p className="sidebar__tagline">Pro Dashboard</p>
        </div>
      </div>

      <nav className="sidebar__nav">
        <p className="sidebar__section-label">Main menu</p>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`sidebar__nav-item ${currentPage === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <Icon path={item.icon} size={16} />
            <span>{item.label}</span>
            {item.badge && <span className="sidebar__badge">{item.badge}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar__divider" />

      <div className="sidebar__section">
        <button className="sidebar__section-header" onClick={() => setNotifOpen(!notifOpen)}>
          <span className="sidebar__section-label" style={{ margin: 0 }}>Notifications</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {visibleNotifs.length > 0 && <span className="sidebar__notif-count">{visibleNotifs.length}</span>}
            <span className="sidebar__chevron" style={{ transform: notifOpen ? "rotate(180deg)" : "none" }}>
              <Icon path="M19 9l-7 7-7-7" size={13} />
            </span>
          </div>
        </button>
        {notifOpen && (
          <div className="sidebar__notif-list">
            {visibleNotifs.length === 0 && <p className="sidebar__empty">All caught up!</p>}
            {visibleNotifs.map((n) => (
              <div key={n.id} className="sidebar__notif-item" style={{ background: typeBg[n.type] }}>
                <span className="sidebar__notif-dot" style={{ background: typeColor[n.type] }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="sidebar__notif-text">{n.text}</p>
                  <p className="sidebar__notif-time">{n.time}</p>
                </div>
                <button className="sidebar__notif-dismiss" onClick={() => setDismissed([...dismissed, n.id])} aria-label="Dismiss">
                  <Icon path="M6 18L18 6M6 6l12 12" size={11} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sidebar__divider" />

      <div className="sidebar__section">
        <p className="sidebar__section-label">Recent activity</p>
        <div className="sidebar__activity-list">
          {ACTIVITY.map((a) => (
            <div key={a.id} className="sidebar__activity-item">
              <div className="sidebar__avatar" style={{ background: a.color + "22", color: a.color }}>{a.user}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="sidebar__activity-name">{a.name}</p>
                <p className="sidebar__activity-action">{a.action}</p>
              </div>
              <p className="sidebar__activity-time">{a.time}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar__divider" />

      <div className="sidebar__section">
        <button className="sidebar__section-header" onClick={() => setSettingsOpen(!settingsOpen)}>
          <span className="sidebar__section-label" style={{ margin: 0 }}>Settings</span>
          <span className="sidebar__chevron" style={{ transform: settingsOpen ? "rotate(180deg)" : "none" }}>
            <Icon path="M19 9l-7 7-7-7" size={13} />
          </span>
        </button>
        {settingsOpen && (
          <div className="sidebar__settings-list">
            <div className="sidebar__setting-row">
              <span className="sidebar__setting-label">Dark mode</span>
              <Toggle on={isDark} onChange={onToggleDark} />
            </div>
            {OTHER_SETTINGS.map((s) => (
              <div key={s.id} className="sidebar__setting-row">
                <span className="sidebar__setting-label">{s.label}</span>
                <Toggle on={settings[s.id]} onChange={(val) => setSettings({ ...settings, [s.id]: val })} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sidebar__footer">
        <div className="sidebar__avatar sidebar__avatar--lg" style={{ background: "#378ADD22", color: "#378ADD" }}>YN</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="sidebar__user-name">Youssef Nafiss</p>
          <p className="sidebar__user-role">Admin</p>
        </div>
        <button className="sidebar__logout" title="Sign out">
          <Icon path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" size={15} />
        </button>
      </div>
    </aside>
  );
}