# Test Plan — TwinForge

## Scope
Manual + light automated testing for the v1 simulation, API, and dashboard.

## Backend tests
| # | Scenario | Expected result |
|---|----------|------------------|
| B1 | Simulator runs for 60s untouched | Degradation increases monotonically (with noise) |
| B2 | Temperature crosses 80°C | Status flips NOMINAL → WARNING |
| B3 | Temperature crosses 95°C | Status flips WARNING → CRITICAL |
| B4 | RPM drops below 1250 | RPM status becomes CRITICAL (inverse threshold) |
| B5 | POST /maintenance called | Degradation resets to 0, health returns to 100, event logged |
| B6 | GET /history requested | Returns readings capped at MAX_POINTS, oldest dropped first |
| B7 | Overall status logic | Overall = worst of the three sensor statuses |

## Frontend tests
| # | Scenario | Expected result |
|---|----------|------------------|
| F1 | Dashboard loads | All components render without console errors |
| F2 | Backend running, 60s elapse | Charts populate, values change every ~1s |
| F3 | Status changes on backend | Badge color updates, schematic dot colors update |
| F4 | Click "Run Maintenance" | Health jumps back to 100%, event log adds an entry |
| F5 | Backend unreachable | Dashboard shows a clear error/empty state, doesn't crash |

## Manual smoke test (pre-demo checklist)
- [ ] `npm run dev` (frontend) starts cleanly
- [ ] Backend starts cleanly, no port conflicts
- [ ] Dashboard loads in Chrome with no console errors
- [ ] Left running 2+ minutes, status visibly transitions at least once
- [ ] Maintenance button visibly resets state
- [ ] Responsive down to a 1280px-wide window

## Out of scope for v1
Automated CI test suite, load testing, cross-browser testing beyond Chrome