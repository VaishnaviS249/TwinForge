import express from "express";
import cors from "cors";
import twinRoutes from "./routes/twin.routes.js";
import { startSimulator } from "./simulator/machineSimulator.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/twin", twinRoutes);

app.get("/", (req, res) => {
  res.json({ message: "TwinForge backend is running", endpoints: ["/api/twin/current", "/api/twin/history", "/api/twin/events", "POST /api/twin/maintenance"] });
});

const PORT = process.env.PORT || 4000;
startSimulator();
app.listen(PORT, () => console.log(`TwinForge backend listening on http://localhost:${PORT}`));
