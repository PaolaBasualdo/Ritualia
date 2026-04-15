import React from "react";
import VarianteCard from "./VarianteCard";
import { Layers } from "lucide-react";

const VarianteList = ({ variantes = [] }) => {
  // Estado vacío coherente con el producto
  if (!variantes.length) {
    return (
      <div className="py-10 border border-dashed border-[#e0d7c6] rounded-sm flex flex-col items-center justify-center text-center bg-[#fdfbf7]/50 mt-6">
        <Layers size={20} className="text-[#c5b8a0] mb-3 stroke-1" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#5a766c] font-bold">
          Edición Única
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {/* Separador estético */}
      <div className="flex items-center gap-4">
        <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#b89e6e] whitespace-nowrap">
          Disponibles
        </h2>
        <div className="h-px bg-[#e0d7c6] w-full opacity-60" />
      </div>

      {/* Lista de Cards */}
      <div className="grid grid-cols-1 gap-4">
        {variantes.map((variante) => (
          <div
            key={variante.id}
            className="transition-all duration-500 hover:translate-x-1"
          >
            <VarianteCard variante={variante} />
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default VarianteList;
