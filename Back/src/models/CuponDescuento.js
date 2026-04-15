import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CuponDescuento = sequelize.define(
  "CuponDescuento",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombreCupon: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Nombre descriptivo para el cupón",
    },

    codigoCupon: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: "El codigo que el usuario ingresara",
    },

    porcentajeDescuento:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "El porcentaje de descuento a aplicar",
        validate: {
        isInt: true,
        min: 0,
        max: 100,
      },
    },

    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
        comment: "Indica si el cupon puede ser utilizado"
    },
  },

  {
    tableName: "cupones",
    timestamps: true,
  },
);

export default CuponDescuento;
