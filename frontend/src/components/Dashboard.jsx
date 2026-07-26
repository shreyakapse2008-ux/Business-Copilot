import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import StatCard from "./StatCard";
import MeetingCard from "./MeetingCard";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="welcome">
          <h1>Welcome Back 👋</h1>
          <p>AI Powered Business Meeting Assistant</p>
        </div>

        <div className="stats">
          <StatCard title="Documents" value="120" icon="📂" />
          <StatCard title="Meetings" value="42" icon="🎥" />
          <StatCard title="Action Items" value="18" icon="✅" />
          <StatCard title="AI Queries" value="346" icon="🤖" />
        </div>

        <div className="recent-meetings">
          <h2>Recent Meetings</h2>

          <MeetingCard title="Project Kickoff" />
          <MeetingCard title="Sales Weekly Review" />
          <MeetingCard title="Client Discussion" />
          <MeetingCard title="HR Recruitment" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;