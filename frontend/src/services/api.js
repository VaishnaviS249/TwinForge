// All backend fetch calls live here (per architecture.md).

const BASE_URL = "/api/twin";

async function request(path, options) {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function getCurrent() {
  return request("/current");
}

export function getHistory() {
  return request("/history");
}

export function getEvents() {
  return request("/events");
}

export function runMaintenance() {
  return request("/maintenance", { method: "POST" });
}
