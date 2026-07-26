import "../styles/navbar.css";
import { FaBell, FaSearch } from "react-icons/fa";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="navbar">
      <div className="navbar-search">
        <FaSearch size={14} />
        <input type="text" placeholder="Search meetings, documents..." />
      </div>

      <div className="navbar-right">
        <div className="navbar-icon-btn">
          <FaBell size={16} />
          <span className="notif-dot"></span>
        </div>
        <div className="navbar-avatar">{initials}</div>
      </div>
    </div>
  );
}

export default Navbar;
