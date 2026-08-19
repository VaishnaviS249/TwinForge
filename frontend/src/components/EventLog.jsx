import React from "react";

const STATUS_COLOR = { NOMINAL: "#4FB8C4", WARNING: "#E8A33D", CRITICAL: "#C5453A" };

function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString([], { hour12: false, minute: "2-digit", second: "2-digit" });
}

export default function EventLog({ events = [] }) {
  return (
    <div style={{ background: "#1B1F23", border: "1px solid #2A2F35", borderRadius: 6, padding: 16 }}>
      <div style={{ fontSize: 11, color: "#8B9198", letterSpacing: 1.5, marginBottom: 8 }}>EVENT LOG</div>
      {events.length === 0 ? (
        <div style={{ color: "#8B9198", fontSize: 12 }}>No events yet.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 150, overflowY: "auto" }}>
          {events.map((e, i) => (
            <div key={i} style={{ display: "flex", gap: 10, fontSize: 12, alignItems: "baseline" }}>
              <span style={{ color: "#8B9198", minWidth: 64 }}>{fmtTime(e.timestamp)}</span>
              <span style={{ color: STATUS_COLOR[e.level], minWidth: 66, fontWeight: 600 }}>{e.level}</span>
              <span style={{ color: "#E8E6E1" }}>{e.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
