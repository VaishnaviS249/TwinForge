import React from "react";

const STATUS_COLOR = { NOMINAL: "#4FB8C4", WARNING: "#E8A33D", CRITICAL: "#C5453A" };

export default function RadialHealth({ score = 0, status = "NOMINAL" }) {
  const size = 168;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score));
  const dash = (pct / 100) * c;
  const color = STATUS_COLOR[status];

  return (
    <div style={{ background: "#1B1F23", border: "1px solid #2A2F35", borderRadius: 6, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 11, color: "#8B9198", letterSpacing: 1.5, marginBottom: 8, alignSelf: "flex-start" }}>HEALTH SCORE</div>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#23272C" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${c - dash}`} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dasharray 0.6s ease, stroke 0.4s ease" }}
        />
        <text x="50%" y="46%" textAnchor="middle" fill="#E8E6E1" fontSize="34" fontWeight="700">{Math.round(pct)}</text>
        <text x="50%" y="63%" textAnchor="middle" fill="#8B9198" fontSize="11" letterSpacing="1.5">%</text>
      </svg>
      <div style={{ fontSize: 12, color, fontWeight: 600 }}>{status}</div>
    </div>
  );
}
