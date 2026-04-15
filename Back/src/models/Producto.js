import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Producto = sequelize.define(
  "Producto",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, unique: true, allowNull: false },
    descripcion: { type: DataTypes.TEXT },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    oferta: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    descuento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      },
    },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },

    imagenPrincipal: { type: DataTypes.STRING },

    idCategoria: { type: DataTypes.INTEGER, allowNull: true },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: "productos",
    timestamps: true,
  },
);
export default Producto;
