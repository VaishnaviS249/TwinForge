import React, { useState, useEffect, useCallback } from "react";
import StatusBadge from "../components/StatusBadge.jsx";
import RadialHealth from "../components/RadialHealth.jsx";
import Schematic from "../components/Schematic.jsx";
import StripChart from "../components/StripChart.jsx";
import EventLog from "../components/EventLog.jsx";
import { getCurrent, getHistory, getEvents, runMaintenance } from "../services/api.js";

const COLORS = {
  bg: "#14171A",
  border: "#2A2F35",
  text: "#E8E6E1",
  muted: "#8B9198",
};

const POLL_MS = 1000;

export default function Dashboard() {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const poll = useCallback(async () => {
    try {
      const [cur, hist, ev] = await Promise.all([getCurrent(), getHistory(), getEvents()]);
      setCurrent(cur);
      setHistory(hist.readings);
      setEvents(ev.events);
      setError(null);
    } catch (err) {
      setError("Can't reach the backend. Is it running on port 4000?");
    }
  }, []);

  useEffect(() => {
    poll();
    const id = setInterval(poll, POLL_MS);
    return () => clearInterval(id);
  }, [poll]);

  const handleMaintenance = async () => {
    try {
      await runMaintenance();
      poll();
    } catch (err) {
      setError("Maintenance request failed. Is the backend running?");
    }
  };

  const status = current?.status ?? { temperature: "NOMINAL", vibration: "NOMINAL", rpm: "NOMINAL", overall: "NOMINAL" };

  return (
    <div style={{ background: COLORS.bg, color: COLORS.text, fontFamily: "sans-serif", padding: 24, minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 16, marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, color: COLORS.muted, letterSpacing: 2 }}>DIGITAL TWIN · LIVE</div>
          <h1 style={{ fontSize: 22, margin: 0 }}>CONV-04 · Conveyor Drive Unit</h1>
        </div>
        <StatusBadge status={status.overall} />
      </header>

      {error && (
        <div style={{ background: "#2A1414", border: "1px solid #C5453A", color: "#E8A3A3", padding: "10px 14px", borderRadius: 4, marginBottom: 16, fontSize: 13 }}>
          {error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 20 }}>
        <Schematic tempStatus={status.temperature} vibStatus={status.vibration} rpmStatus={status.rpm} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <RadialHealth score={current?.health ?? 0} status={status.overall} />
          <button
            onClick={handleMaintenance}
            style={{ background: "transparent", border: `1px solid ${COLORS.border}`, color: COLORS.text, padding: "9px 14px", borderRadius: 4, fontSize: 13, cursor: "pointer" }}
          >
            Run Maintenance
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
        <StripChart label="TEMPERATURE" data={history} dataKey="temperature" color="#C5453A" unit="°C" warn={80} crit={95} domain={[50, 110]} value={current?.temperature} />
        <StripChart label="VIBRATION" data={history} dataKey="vibration" color="#E8A33D" unit=" mm/s" warn={3.5} crit={5.5} domain={[0, 7]} value={current?.vibration} />
        <StripChart label="RPM" data={history} dataKey="rpm" color="#4FB8C4" unit="" warn={1400} crit={1250} domain={[1100, 1600]} value={current?.rpm} />
      </div>

      <EventLog events={events} />
    </div>
  );
}
