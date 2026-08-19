# TwinForge — Project Overview

## What it is
TwinForge is a real-time digital twin dashboard for a simulated industrial
machine (a conveyor drive unit). It streams synthetic sensor telemetry,
classifies machine health, and visualizes it live — the same pattern used in
real predictive-maintenance and condition-monitoring systems.

## Why it matters
Unplanned machine downtime is expensive. Digital twins let operators watch
live sensor trends and catch early warning signs (rising temperature,
vibration, RPM drop) before they become failures — instead of relying on
fixed maintenance schedules or waiting for a breakdown.

## What it demonstrates
- Real-time data pipelines (simulate → classify → serve → visualize)
- Full-stack architecture (Node/Express backend, React/Vite frontend)
- Meaningful data visualization (time-series charts, radial gauge, status
  schematic)
- Simple rule-based anomaly detection (threshold-based status classification)
- Clean separation of concerns (simulation, business logic, API, UI)

## Tech stack
React, Vite, Recharts, Node.js, Express

## Live demo flow
1. Machine starts healthy (100% health, NOMINAL status)
2. Simulated wear accumulates — sensor readings drift upward/downward
3. Dashboard updates live: charts animate, health score drops, status badge
   changes color, event log records the transition
4. Operator clicks "Run Maintenance" → wear resets, machine returns to
   NOMINAL, action is logged