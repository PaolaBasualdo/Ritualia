import React from "react";
import { Ban } from "lucide-react";

const VarianteCard = ({ variante }) => {
  if (!variante) return null;

  const sinStock = variante.stock === 0;

  

  return (
    <div
      className={`
        p-4 border rounded-sm flex items-center justify-between
        ${sinStock
          ? "bg-gray-50 border-[#e0d7c6] opacity-60"
          : "bg-white border-[#e0d7c6]"
        }
      `}
    >
      <div className="flex flex-col gap-1">
        {/* nombre */}
        <span
          className={`font-serif text-lg lowercase first-letter:uppercase ${
            sinStock ? "text-red-500" : "text-[#3e5c4d]"
          }`}
        >
          {variante.nombre}
        </span>

        {/* precio y stock en la misma línea */}
        <span
          className={`text-sm font-serif ${
            sinStock ? "text-red-500" : "text-[#5a766c]"
          }`}
        >
          Precio: ${Number(variante.precio).toLocaleString("es-AR")} | Stock:{" "}
          {variante.stock} unidades
          {sinStock && " (No disponible)"}
        </span>
      </div>

      {/* icono si no hay stock */}
      {sinStock && (
        <Ban size={16} className="text-red-400" />
      )}
    </div>
  );
};

export default VarianteCard;