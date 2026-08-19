import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString([], { hour12: false, minute: "2-digit", second: "2-digit" });
}

export default function StripChart({ label, data = [], dataKey, color = "#4FB8C4", unit = "", warn, crit, domain, value }) {
  const chartData = data.map((d) => ({ label: fmtTime(d.timestamp), [dataKey]: d[dataKey] }));

  return (
    <div style={{ background: "#1B1F23", border: "1px solid #2A2F35", borderRadius: 6, padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
        <span style={{ fontSize: 10, color: "#8B9198", letterSpacing: 1.5 }}>{label}</span>
        {value != null && (
          <span style={{ fontSize: 15, fontWeight: 700, color }}>
            {value.toFixed(1)}{unit}
          </span>
        )}
      </div>
      <ResponsiveContainer width="100%" height={110}>
        <AreaChart data={chartData} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id={`fill-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#23272C" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: "#8B9198", fontSize: 9 }} axisLine={{ stroke: "#2A2F35" }} tickLine={false} minTickGap={30} />
          <YAxis domain={domain} tick={{ fill: "#8B9198", fontSize: 9 }} axisLine={false} tickLine={false} width={34} />
          {warn != null && <ReferenceLine y={warn} stroke="#E8A33D" strokeDasharray="3 3" strokeOpacity={0.6} />}
          {crit != null && <ReferenceLine y={crit} stroke="#C5453A" strokeDasharray="3 3" strokeOpacity={0.6} />}
          <Tooltip
            contentStyle={{ background: "#1B1F23", border: "1px solid #2A2F35", borderRadius: 4, fontSize: 11 }}
            labelStyle={{ color: "#8B9198" }}
            itemStyle={{ color }}
            formatter={(v) => [`${v.toFixed(1)}${unit}`, label]}
          />
          <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#fill-${dataKey})`} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
