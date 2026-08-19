// Owns the degradation/noise math for the simulated conveyor drive unit.
// Ticks once per second, keeps current state + rolling history in memory.

const MAX_HISTORY = 60;
const TICK_MS = 1000;

const state = {
  degradation: 0,
  temperature: 68,
  vibration: 1.8,
  rpm: 1500,
  history: [],
};

function noise(spread) {
  return (Math.random() - 0.5) * spread;
}

function tick() {
  state.degradation = Math.min(100, state.degradation + 0.55 + Math.random() * 0.25);

  state.temperature = Math.max(0, 68 + state.degradation * 0.32 + noise(2.2));
  state.vibration = Math.max(0, 1.8 + state.degradation * 0.045 + noise(0.22));
  state.rpm = Math.max(0, 1500 - state.degradation * 1.05 + noise(10));

  const reading = {
    timestamp: new Date().toISOString(),
    temperature: Number(state.temperature.toFixed(2)),
    vibration: Number(state.vibration.toFixed(2)),
    rpm: Number(state.rpm.toFixed(0)),
  };

  state.history.push(reading);
  if (state.history.length > MAX_HISTORY) state.history.shift();
}

export function startSimulator() {
  tick();
  setInterval(tick, TICK_MS);
}

export function getCurrentReading() {
  const last = state.history[state.history.length - 1];
  return {
    timestamp: last ? last.timestamp : new Date().toISOString(),
    temperature: state.temperature,
    vibration: state.vibration,
    rpm: state.rpm,
  };
}

export function getHistory() {
  return state.history;
}

export function resetDegradation() {
  state.degradation = 0;
}
