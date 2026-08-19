# Problem Statement — TwinForge

## The problem
Factory machines (motors, conveyors, pumps) fail unpredictably. Maintenance
teams typically rely on **fixed schedules** (check every 30 days) or **reactive
fixes** (repair after breakdown) — both waste money: scheduled maintenance
replaces parts that still work, and reactive maintenance causes costly
downtime and safety risk.

## Why it happens
Machines emit early warning signs before failure — rising temperature,
increased vibration, dropping RPM under load — but without continuous
monitoring, these signs go unnoticed until the failure is already in progress.

## The opportunity
A **digital twin** — a live virtual replica of the machine driven by real (or
simulated) sensor data — lets you:
- Watch a machine's health continuously instead of on a schedule
- Catch early degradation trends (warning) before they become failures (critical)
- Test "what happens if I don't fix this" safely, without real-world risk
- Decide *when* maintenance is actually needed, not just *when it's scheduled*

## What TwinForge solves
TwinForge is a small-scale proof of concept: a simulated conveyor drive unit
whose temperature, vibration, and RPM drift realistically over time as
"wear" accumulates. The system:
- Streams this telemetry in real time
- Flags nominal / warning / critical status per sensor and overall
- Scores machine health (0–100%)
- Logs state-change events
- Lets an operator perform "maintenance" to reset wear

## Who this is for
- Recruiters/interviewers evaluating IoT + real-time systems + full-stack skills
- A stand-in for real industrial use cases: predictive maintenance,
  condition-based monitoring, SCADA-style dashboards

## Out of scope (for this project)
- Real sensor hardware (simulated data only, for now)
- Multi-machine fleets (single machine twin only)
- Production-grade auth/security