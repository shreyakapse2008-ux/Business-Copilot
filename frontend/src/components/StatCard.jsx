import "../styles/Statcard.css";

const BADGES = ["↑ 12%", "↑ 8%", "↑ 5%", "↑ 24%"];

function StatCard({ title, value, icon, index = 0 }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon">{icon}</div>
        <span className="stat-badge">{BADGES[index % BADGES.length]}</span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{title}</div>
    </div>
  );
}

export default StatCard;
