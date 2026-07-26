import { useState, useEffect } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchMeetings = async () => {
    try {
      setFetchLoading(true);
      const res = await api.get("/meetings/");
      setMeetings(res.data.meetings);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => { fetchMeetings(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    setMessage("");
    try {
      await api.post("/meetings/create", { title, description, user_id: 1 });
      setTitle("");
      setDescription("");
      setMessage("Meeting created successfully!");
      fetchMeetings();
    } catch {
      setMessage("Failed to create meeting.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/meetings/${id}`);
      setMeetings((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />

        <div className="welcome">
          <h1>🎥 Meetings</h1>
          <p>Schedule, manage and review all your business meetings in one place.</p>
        </div>

        {/* Create Form */}
        <div className="meeting-form-card">
          <h2>➕ Schedule New Meeting</h2>
          <form onSubmit={handleCreate} className="meeting-form">
            <input
              type="text"
              placeholder="Meeting title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "＋ Create"}
            </button>
          </form>
          {message && (
            <p className="form-msg">
              {message.includes("success") ? "✅" : "❌"} {message}
            </p>
          )}
        </div>

        {/* Meetings List */}
        <div className="recent-meetings">
          <h2>📋 All Meetings
            <span style={{ fontSize: "14px", color: "#4b5563", fontWeight: 400, marginLeft: "10px" }}>
              ({meetings.length} total)
            </span>
          </h2>

          {fetchLoading ? (
            <p className="loading-text">⏳ Loading meetings...</p>
          ) : meetings.length === 0 ? (
            <p className="empty-text">No meetings yet. Create your first one above!</p>
          ) : (
            meetings.map((m) => (
              <div key={m.id} className="meeting-item">
                <div className="meeting-info">
                  <h3>🎥 {m.title}</h3>
                  {m.description && <p>{m.description}</p>}
                  <span className="meeting-date">
                    🕐 {m.created_at ? new Date(m.created_at).toLocaleString() : ""}
                  </span>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(m.id)}>
                  🗑 Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Meetings;
