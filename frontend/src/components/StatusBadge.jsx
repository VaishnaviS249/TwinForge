import React from "react";

const STATUS_COLOR = { NOMINAL: "#4FB8C4", WARNING: "#E8A33D", CRITICAL: "#C5453A" };

export default function StatusBadge({ status = "NOMINAL" }) {
  const color = STATUS_COLOR[status];
  return (
    <div style={{ border: `1px solid ${color}`, color, padding: "8px 14px", borderRadius: 4, fontSize: 13, fontWeight: 600 }}>
      {status}
    </div>
  );
}