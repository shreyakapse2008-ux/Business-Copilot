import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Chat",    value: 50 },
  { name: "Summary", value: 30 },
  { name: "Search",  value: 20 },
];

const COLORS = ["#4f46e5", "#22d3ee", "#f59e0b"];

const CustomTooltip = ({ active, payload }) => {
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
        <strong>{payload[0].name}</strong>: {payload[0].value}%
      </div>
    );
  }
  return null;
};

function AIUsageChart() {
  return (
    <div className="chart-box">
      <h3>🤖 AI Usage Breakdown</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={80}
            innerRadius={45}
            paddingAngle={4}
            label={({ name, value }) => `${value}%`}
            labelLine={false}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span style={{ color: "#9ca3af", fontSize: "12px" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AIUsageChart;
