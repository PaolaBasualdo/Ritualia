// src/scripts/syncDatabase.js

import "dotenv/config"; // Carga las variables de entorno de .env
import sequelize from "../config/database.js";

import * as models from "../models/index.js";

const syncDatabase = async () => {
  try {
    console.log("🔄 Sincronizando base de datos...");

    await sequelize.authenticate();
    console.log("✅ Conexión a DB establecida."); // Sincronizar todos los modelos // { alter: true } intenta reflejar los cambios en la DB sin borrar datos (ideal para desarrollo). // Usa { force: true } si quieres borrar TODAS las tablas y crearlas desde cero.
   
    console.log(Object.keys(sequelize.models.Producto.rawAttributes));
    await sequelize.sync({ alter: true });
    console.log("✅ Modelos sincronizados exitosamente.");

    console.log("🎉 Sincronización completada.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error durante la sincronización:", error);
    process.exit(1);
  }
};

syncDatabase();
