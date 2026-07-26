function SuggestionCard({ title, description, icon = "💡" }) {
  return (
    <div className="suggestion-card">
      <div style={{ fontSize: "24px", marginBottom: "12px" }}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button>Open</button>
    </div>
  );
}

export default SuggestionCard;
