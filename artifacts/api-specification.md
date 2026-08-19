# API Specification — TwinForge Backend

Base URL: `http://localhost:4000/api/twin`

## GET /current
Returns the latest sensor reading, per-sensor status, overall status, and
health score.

**Response 200**
```json
{
  "timestamp": "2026-08-19T06:00:00.000Z",
  "temperature": 71.4,
  "vibration": 2.1,
  "rpm": 1487,
  "status": {
    "temperature": "NOMINAL",
    "vibration": "NOMINAL",
    "rpm": "NOMINAL",
    "overall": "NOMINAL"
  },
  "health": 96
}
```

## GET /history
Returns the last N readings (default 40) for charting.

**Response 200**
```json
{
  "readings": [
    { "timestamp": "2026-08-19T05:59:58.000Z", "temperature": 70.9, "vibration": 2.0, "rpm": 1491 }
  ]
}
```

## GET /events
Returns the most recent event log entries (status transitions, maintenance
actions), newest first.

**Response 200**
```json
{
  "events": [
    { "timestamp": "2026-08-19T06:00:00.000Z", "level": "WARNING", "message": "Sensor drift entering warning band" }
  ]
}
```

## POST /maintenance
Resets accumulated wear to zero and logs a maintenance event. No request
body required.

**Response 200**
```json
{ "message": "Maintenance performed", "health": 100 }
```

## Error format (all endpoints)
```json
{ "error": "Description of what went wrong" }
```