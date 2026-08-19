import { Router } from "express";
import { getCurrentState, getHistoryData, getEvents, performMaintenance } from "../services/twinService.js";

const router = Router();

router.get("/current", (req, res) => {
  res.json(getCurrentState());
});

router.get("/history", (req, res) => {
  res.json({ readings: getHistoryData() });
});

router.get("/events", (req, res) => {
  res.json({ events: getEvents() });
});

router.post("/maintenance", (req, res) => {
  const state = performMaintenance();
  res.json({ message: "Maintenance performed", health: state.health });
});

export default router;
