// 1. Cargar variables de entorno
import "dotenv/config";

import express from "express";
import sequelize from "./src/config/database.js";
import indexRoutes from "./src/routes/index.routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Middleware
app.use(express.json());

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

// 🔹 archivos subidos por Multer
app.use("/uploads", express.static("uploads"));

// Ruta de prueba
app.get("/", (_req, res) =>
  res.send("¡Backend de Ritualia funcionando correctamente!")
);

// API
app.use("/api", indexRoutes);

// Arranque
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("DB conectada.");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error DB:", error);
  }
}

startServer();