import { useState, useEffect } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import "../styles/Dashboard.css";

function Reports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get("/reports/dashboard");
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="welcome">
          <h1>📊 Reports</h1>
          <p>Overview of your BusinessCopilot activity</p>
        </div>

        {loading ? (
          <p className="loading-text">Loading reports...</p>
        ) : data ? (
          <>
            <div className="stats">
              <StatCard title="Documents"   value={data.documents}    icon="📂" />
              <StatCard title="Meetings"    value={data.meetings}     icon="🎥" />
              <StatCard title="Action Items" value={data.action_items} icon="✅" />
              <StatCard title="AI Queries"  value={data.ai_queries}   icon="🤖" />
            </div>

            <div className="recent-meetings">
              <h2>🕐 Recent Meetings</h2>

              {data.recent_meetings.length === 0 ? (
                <p className="empty-text">No meetings recorded yet.</p>
              ) : (
                data.recent_meetings.map((m) => (
                  <div key={m.id} className="meeting-item">
                    <div className="meeting-info">
                      <h3>🎥 {m.title}</h3>
                      <span className="meeting-date">
                        {m.created_at ? new Date(m.created_at).toLocaleDateString() : ""}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <p className="empty-text">Could not load report data.</p>
        )}
      </div>
    </div>
  );
}

export default Reports;
