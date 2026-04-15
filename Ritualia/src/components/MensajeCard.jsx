import React from "react";
import { Quote } from "lucide-react";

const MensajeCard = ({ mensaje }) => {
  if (!mensaje) return null;

  // Formateo de fecha elegante
  const fechaFormateada = new Date(mensaje.createdAt).toLocaleDateString(
    "es-AR",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="relative border border-[#e0d7c6] bg-[#fdfbf7]/50 p-6 rounded-sm transition-all duration-300 hover:border-[#b89e6e] group">
      {/* Icono de comilla sutil en la esquina */}
      <Quote 
        size={16} 
        className="absolute top-4 right-4 text-[#e0d7c6] group-hover:text-[#b89e6e] transition-colors duration-500 opacity-40" 
      />

      <div className="space-y-4">
        {/* Cuerpo del Mensaje */}
        <p className="text-[#465c54] text-base leading-relaxed font-light italic">
          "{mensaje.texto}"
        </p>

        {/* Pie de Card: Usuario (si existiera) y Fecha */}
        <div className="flex items-center justify-between pt-2 border-t border-[#e0d7c6]/40">
          <span className="font-serif text-[11px] text-[#3e5c4d] lowercase first-letter:uppercase tracking-wider">
            {mensaje.nombreUsuario || "Anonimo"}
          </span>
          
          <span className="text-[9px] text-[#b89e6e] uppercase tracking-[0.2em] font-bold">
            {fechaFormateada}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MensajeCard;