import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ProductoImagen = sequelize.define(
  "ProductoImagen",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    orden: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    idProducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "producto_imagenes",
    timestamps: true,
  }
);

export default ProductoImagen;