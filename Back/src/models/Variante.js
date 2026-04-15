import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Variante = sequelize.define(
  "Variante",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },

    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "variantes",
    timestamps: true,
  },
);

export default Variante;
