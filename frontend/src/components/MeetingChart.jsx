import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", meetings: 3 },
  { day: "Tue", meetings: 5 },
  { day: "Wed", meetings: 2 },
  { day: "Thu", meetings: 7 },
  { day: "Fri", meetings: 4 },
  { day: "Sat", meetings: 1 },
  { day: "Sun", meetings: 2 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#1e2540",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "8px",
        padding: "10px 14px",
        fontSize: "13px",
        color: "#e5e7eb",
      }}>
        <strong>{label}</strong>: {payload[0].value} meetings
      </div>
    );
  }
  return null;
};

function MeetingChart() {
  return (
    <div className="chart-box">
      <h3>📅 Weekly Meetings</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={22}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(79,70,229,0.08)" }} />
          <Bar
            dataKey="meetings"
            fill="url(#barGradient)"
            radius={[6, 6, 0, 0]}
          />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MeetingChart;
