# Requirements — TwinForge

## Functional requirements

### Simulation engine (backend)
- FR1: Generate synthetic sensor readings for temperature (°C), vibration (mm/s), and RPM
- FR2: Apply a gradual "degradation" trend that increases wear over time
- FR3: Add random noise to each reading so data looks realistic, not linear
- FR4: Emit a new reading on a fixed interval (e.g. every 1 second)
- FR5: Support a "run maintenance" action that resets degradation to zero

### Status & health logic (backend)
- FR6: Classify each sensor as Nominal / Warning / Critical against fixed thresholds
- FR7: Compute an overall machine status as the worst of the three sensor statuses
- FR8: Compute a health score (0–100%) derived from accumulated degradation
- FR9: Detect status transitions (e.g. Nominal → Warning) and generate a log event

### API (backend)
- FR10: Expose current sensor readings + status + health score
- FR11: Expose recent history (last N readings) for charting
- FR12: Expose the event log (recent state-change events)
- FR13: Accept a maintenance action request

### Dashboard (frontend)
- FR14: Display live-updating values for temperature, vibration, RPM
- FR15: Display strip charts (time-series) for each sensor with warning/critical reference lines
- FR16: Display a radial health score gauge
- FR17: Display an overall status badge (Nominal/Warning/Critical), color-coded
- FR18: Display a machine schematic with sensor indicator dots that color-code by status
- FR19: Display a scrolling event log
- FR20: Provide a "Run Maintenance" button that calls the backend and resets state

## Non-functional requirements
- NFR1: Dashboard updates at least once per second without visible lag
- NFR2: Works in Chrome at both desktop and typical laptop widths
- NFR3: Code organized into clear frontend/backend modules (see architecture.md)
- NFR4: No hardcoded secrets/credentials committed to the repo
- NFR5: README allows a new developer to clone, install, and run the app in under 5 minutes

## Success criteria
- A recruiter/interviewer can run the app locally in minutes and see a
  believable, live, interactive industrial monitoring dashboard
- The system demonstrably distinguishes healthy vs. degrading vs. failing states
- Code is clean enough to walk through in an interview