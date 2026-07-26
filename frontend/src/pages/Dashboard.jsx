import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import MeetingCard from "../components/MeetingCard";
import SuggestionCard from "../components/SuggestionCard";
import MeetingChart from "../components/MeetingChart";
import AIUsageChart from "../components/AIUsageChart";

import "../styles/Dashboard.css";

const SUGGESTIONS = [
  { icon: "📝", title: "Summarize Meeting", description: "Auto-generate key points and action items from your last meeting." },
  { icon: "📊", title: "Generate Report",   description: "Create a business report from your uploaded documents." },
  { icon: "🤖", title: "Ask AI Assistant",  description: "Get instant answers about your meetings and documents." },
];

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ documents: 0, meetings: 0, action_items: 0, ai_queries: 0 });
  const [recentMeetings, setRecentMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.name || "User";

  useEffect(() => {
    api.get("/reports/dashboard")
      .then((res) => {
        setStats({
          documents:    res.data.documents,
          meetings:     res.data.meetings,
          action_items: res.data.action_items,
          ai_queries:   res.data.ai_queries,
        });
        setRecentMeetings(res.data.recent_meetings || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        {/* Welcome */}
        <div className="welcome">
          <h1>Welcome back, {userName} 👋</h1>
          <p>Here's what's happening with your business today.</p>
          <div className="hero-buttons">
            <button className="upload-btn" onClick={() => navigate("/upload")}>
              📂 Upload Document
            </button>
            <button className="meeting-btn" onClick={() => navigate("/meetings")}>
              🎥 New Meeting
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats">
          <StatCard index={0} title="Documents"    value={loading ? "—" : stats.documents}    icon="📂" />
          <StatCard index={1} title="Meetings"     value={loading ? "—" : stats.meetings}     icon="🎥" />
          <StatCard index={2} title="Action Items" value={loading ? "—" : stats.action_items} icon="✅" />
          <StatCard index={3} title="AI Queries"   value={loading ? "—" : stats.ai_queries}   icon="🤖" />
        </div>

        {/* Recent Meetings */}
        <div className="recent-meetings">
          <h2>📋 Recent Meetings</h2>
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : recentMeetings.length === 0 ? (
            <>
              <MeetingCard title="Project Kickoff Meeting"  time="Today • 10:00 AM" />
              <MeetingCard title="Sales Weekly Review"      time="Yesterday • 2:00 PM" />
              <MeetingCard title="Client Discussion"        time="Mon • 11:30 AM" />
              <MeetingCard title="HR Recruitment Meeting"   time="Sun • 9:00 AM" />
            </>
          ) : (
            recentMeetings.map((m) => (
              <MeetingCard key={m.id} title={m.title}
                time={m.created_at ? new Date(m.created_at).toLocaleDateString() : ""} />
            ))
          )}
        </div>

        {/* Charts */}
        <div className="analytics">
          <MeetingChart />
          <AIUsageChart />
        </div>

        {/* AI Suggestions */}
        <div className="suggestions">
          {SUGGESTIONS.map((s) => (
            <SuggestionCard key={s.title} icon={s.icon} title={s.title} description={s.description} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
