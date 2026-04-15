import React from "react";
import MensajeCard from "./MensajeCard";
import { MessageSquareQuote } from "lucide-react";

const MensajeList = ({ mensajes = [] }) => {
  if (!mensajes.length) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center">
        <MessageSquareQuote size={32} className="text-[#e0d7c6] mb-4 stroke-1" />
        <p className="text-sm text-[#5a766c] italic font-serif">
          El silencio envuelve este elemento. <br />
          <span className="text-[10px] uppercase tracking-widest not-italic opacity-70">Sé el primero en compartir tu experiencia.</span>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Encabezado interno más sutil */}
      <div className="flex items-center gap-4">
        <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#b89e6e]">
          Testimonios ({mensajes.length})
        </h2>
        <div className="h-px bg-[#e0d7c6] flex-1 opacity-50" />
      </div>

      {/* Contenedor de las Cards con scroll suave si son muchas */}
      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {mensajes.map((mensaje) => (
          <div key={mensaje.id} className="transition-all duration-300 hover:translate-x-1">
            <MensajeCard mensaje={mensaje} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MensajeList;