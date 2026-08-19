// Derives status/health/events from raw simulator readings.
// This is the only place that knows the threshold values (per architecture.md).

import { getCurrentReading, getHistory, resetDegradation } from "../simulator/machineSimulator.js";

const THRESHOLDS = {
  temperature: { warn: 80, crit: 95 },
  vibration: { warn: 3.5, crit: 5.5 },
  rpm: { warn: 1400, crit: 1250, inverse: true },
};

let events = [
  { timestamp: new Date().toISOString(), level: "NOMINAL", message: "Twin initialized — CONV-04 online" },
];
let prevOverall = "NOMINAL";

function statusFor(value, { warn, crit, inverse }) {
  if (inverse) {
    if (value <= crit) return "CRITICAL";
    if (value <= warn) return "WARNING";
    return "NOMINAL";
  }
  if (value >= crit) return "CRITICAL";
  if (value >= warn) return "WARNING";
  return "NOMINAL";
}

function worst(a, b, c) {
  const order = { CRITICAL: 3, WARNING: 2, NOMINAL: 1 };
  return [a, b, c].sort((x, y) => order[y] - order[x])[0];
}

function logEvent(level, message) {
  events = [{ timestamp: new Date().toISOString(), level, message }, ...events].slice(0, 20);
}

function computeHealth(tempStatus, vibStatus, rpmStatus) {
  const penalty = { NOMINAL: 0, WARNING: 25, CRITICAL: 55 };
  const raw = 100 - (penalty[tempStatus] + penalty[vibStatus] + penalty[rpmStatus]) / 1.6;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

export function getCurrentState() {
  const reading = getCurrentReading();
  const tempStatus = statusFor(reading.temperature, THRESHOLDS.temperature);
  const vibStatus = statusFor(reading.vibration, THRESHOLDS.vibration);
  const rpmStatus = statusFor(reading.rpm, THRESHOLDS.rpm);
  const overall = worst(tempStatus, vibStatus, rpmStatus);

  if (overall !== prevOverall) {
    const msgs = {
      WARNING: "Sensor drift entering warning band — schedule inspection",
      CRITICAL: "Critical threshold breached — maintenance required",
      NOMINAL: "Readings back within nominal range",
    };
    logEvent(overall, msgs[overall]);
    prevOverall = overall;
  }

  return {
    ...reading,
    status: { temperature: tempStatus, vibration: vibStatus, rpm: rpmStatus, overall },
    health: computeHealth(tempStatus, vibStatus, rpmStatus),
  };
}

export function getHistoryData() {
  return getHistory();
}

export function getEvents() {
  return events;
}

export function performMaintenance() {
  resetDegradation();
  logEvent("NOMINAL", "Maintenance performed — degradation reset, sensors recalibrated");
  prevOverall = "NOMINAL";
  return getCurrentState();
}
