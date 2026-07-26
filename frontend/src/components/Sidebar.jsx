import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";
import {
  FaHome,
  FaFolderOpen,
  FaVideo,
  FaRobot,
  FaChartBar,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const NAV_ITEMS = [
  { to: "/dashboard", icon: <FaHome />,       label: "Dashboard" },
  { to: "/upload",    icon: <FaFolderOpen />, label: "Upload Documents" },
  { to: "/meetings",  icon: <FaVideo />,      label: "Meetings" },
  { to: "/chat",      icon: <FaRobot />,      label: "AI Assistant" },
  { to: "/reports",   icon: <FaChartBar />,   label: "Reports" },
  { to: "/profile",   icon: <FaUser />,       label: "Profile" },
  { to: "/settings",  icon: <FaCog />,        label: "Settings" },
];

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="sidebar">

      {/* Logo */}
      <div className="sidebar-brand">
        <span className="sidebar-logo-icon">⚡</span>
        <div>
          <div className="sidebar-title">BusinessCopilot</div>
          <div className="sidebar-sub">AI Meeting Assistant</div>
        </div>
      </div>

      {/* Divider */}
      <div className="sidebar-divider" />

      {/* Nav label */}
      <div className="sidebar-section-label">MAIN MENU</div>

      {/* Nav Links */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
            }
          >
            <span className="sidebar-link-icon">{icon}</span>
            <span className="sidebar-link-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Spacer pushes logout to bottom */}
      <div className="sidebar-spacer" />

      {/* Divider */}
      <div className="sidebar-divider" />

      {/* Logout */}
      <button className="sidebar-logout" onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </button>

    </div>
  );
}

export default Sidebar;
