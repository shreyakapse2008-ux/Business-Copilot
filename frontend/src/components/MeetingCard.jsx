import "../styles/MeetingCard.css";

function MeetingCard({ title, time = "Today • 10:00 AM" }) {
  return (
    <div className="meeting-card">
      <div className="meeting-card-left">
        <div className="meeting-dot"></div>
        <div className="meeting-card-info">
          <h3>{title}</h3>
          <p>{time}</p>
        </div>
      </div>
      <button>View Summary</button>
    </div>
  );
}

export default MeetingCard;
