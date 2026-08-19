# Architecture — TwinForge

## Overview
TwinForge is a two-tier app: a **backend simulator/API** that generates and
serves machine state, and a **frontend dashboard** that polls/subscribes to
it and renders the live twin.
┌─────────────────────┐ HTTP (REST, polling ┌──────────────────────┐
│ frontend │ or WebSocket, 1s interval) │ backend │
│ (React + Vite) │ ─────────────────────────────────────▶ │ (Node + Express) │
│ │ ◀───────────────────────────────────── │ │
│ App.jsx │ JSON: reading, status, health, │ server.js │
│ components/ │ history, events │ routes/ │
│ Gauge, Schematic, │ │ twin.routes.js │
│ StripChart, EventLog│ │ services/ │
│ pages/ │ │ twinService.js │
│ Dashboard.jsx │ │ simulator/ │
│ services/ │ │ machineSimulator.js │
│ api.js (fetch calls)│ │ models/ │
│ │ │ Reading.js, Event.js │
└─────────────────────┘ └──────────────────────┘

## Backend responsibilities
- `simulator/machineSimulator.js` — owns the degradation/noise math (FR1–FR5),
  runs on a `setInterval` tick, keeps current state + rolling history in memory
- `services/twinService.js` — derives status/health/events from raw readings
  (FR6–FR9); the only place that knows the threshold values
- `routes/twin.routes.js` — thin HTTP layer exposing:
  - `GET /api/twin/current` — latest reading + status + health
  - `GET /api/twin/history` — last N readings (for charts)
  - `GET /api/twin/events` — recent event log
  - `POST /api/twin/maintenance` — triggers a reset
- `models/` — plain data shape definitions (Reading, Event) — no DB in v1,
  in-memory store is enough for a single-machine simulation

## Frontend responsibilities
- `services/api.js` — all `fetch` calls to the backend live here, nowhere else
- `pages/Dashboard.jsx` — top-level layout, polls the backend on an interval,
  holds state, passes data down
- `components/` — presentation-only, no data-fetching:
  - `StatusBadge`, `RadialHealth`, `Schematic`, `StripChart`, `EventLog`
- `App.jsx` — app shell/router entry point (single page for v1)

## Data flow
1. Simulator tick fires every 1s on the backend → new reading computed
2. `twinService` classifies it and appends any new event
3. Frontend polls `/api/twin/current` (and `/history`, `/events`) every 1s
4. Dashboard re-renders charts, gauge, schematic, and log from fresh data
5. "Run Maintenance" button → `POST /api/twin/maintenance` → simulator resets
   degradation → next poll reflects the reset

## Why polling over WebSockets (for v1)
Simpler to build, test, and explain in an interview; upgrading to WebSockets
later is a natural "v2 improvement" talking point (see docs/ui-design.md /
future work).

## Tech stack
- Frontend: React (Vite), Recharts for charts, plain CSS/inline styles
- Backend: Node.js, Express
- No database in v1 (in-memory state) — noted as a future improvement