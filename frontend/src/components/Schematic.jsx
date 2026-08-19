import React from "react";

const STATUS_COLOR = { NOMINAL: "#4FB8C4", WARNING: "#E8A33D", CRITICAL: "#C5453A" };

function SensorDot({ cx, cy, status }) {
  const color = STATUS_COLOR[status] || STATUS_COLOR.NOMINAL;
  return (
    <g>
      {status !== "NOMINAL" && (
        <circle cx={cx} cy={cy} r="10" fill={color} opacity="0.25">
          <animate attributeName="r" values="8;14;8" dur="1.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.35;0.05;0.35" dur="1.6s" repeatCount="indefinite" />
        </circle>
      )}
      <circle cx={cx} cy={cy} r="6" fill={color} stroke="#14171A" strokeWidth="2" />
    </g>
  );
}

export default function Schematic({ tempStatus = "NOMINAL", vibStatus = "NOMINAL", rpmStatus = "NOMINAL" }) {
  return (
    <div style={{ background: "#1B1F23", border: "1px solid #2A2F35", borderRadius: 6, padding: 16 }}>
      <div style={{ fontSize: 11, color: "#8B9198", letterSpacing: 1.5, marginBottom: 8 }}>MACHINE SCHEMATIC</div>
      <svg viewBox="0 0 320 160" width="100%" height="160">
        <rect x="20" y="60" width="90" height="60" rx="6" fill="none" stroke="#2A2F35" strokeWidth="2" />
        <circle cx="65" cy="90" r="22" fill="none" stroke="#2A2F35" strokeWidth="2" />
        <line x1="65" y1="90" x2="80" y2="78" stroke="#8B9198" strokeWidth="2" strokeLinecap="round" />
        <rect x="110" y="72" width="190" height="10" rx="2" fill="none" stroke="#2A2F35" strokeWidth="2" />
        <rect x="110" y="98" width="190" height="10" rx="2" fill="none" stroke="#2A2F35" strokeWidth="2" />
        {[130, 170, 210, 250, 290].map((x) => (
          <line key={x} x1={x} y1="82" x2={x} y2="98" stroke="#2A2F35" strokeWidth="1.5" />
        ))}

        <SensorDot cx={65} cy={55} status={tempStatus} />
        <text x="65" y="42" textAnchor="middle" fill="#8B9198" fontSize="10">TEMP</text>

        <SensorDot cx={65} cy={128} status={vibStatus} />
        <text x="65" y="146" textAnchor="middle" fill="#8B9198" fontSize="10">VIB</text>

        <SensorDot cx={205} cy={55} status={rpmStatus} />
        <text x="205" y="42" textAnchor="middle" fill="#8B9198" fontSize="10">RPM</text>
      </svg>
    </div>
  );
}
