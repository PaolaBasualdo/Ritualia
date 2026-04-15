import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Mensaje = sequelize.define(
  "Mensaje",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "mensajes",
    timestamps: true,
  }
);

export default Mensaje;