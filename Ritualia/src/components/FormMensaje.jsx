import { useState } from "react";
import API from "../api";
import { Send, Sparkles } from "lucide-react";

export default function FormMensaje({ productoId, onCreated }) {
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!texto.trim()) return;

    try {
      setLoading(true);
      const response = await API.post(
        `/productos/${productoId}/mensajes`,
        { texto }
      );

      setTexto("");

      if (onCreated) onCreated(response.data);

    } catch (err) {
      setError("El mensaje no pudo ser entregado. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fdfbf7] border border-[#e0d7c6] rounded-sm p-8 w-full shadow-sm mt-12 relative overflow-hidden">
      {/* Detalle decorativo de fondo */}
      <Sparkles className="absolute -top-2 -right-2 text-[#e0d7c6]/20" size={60} />

      <div className="mb-8">
        <h2 className="text-2xl font-serif text-[#3e5c4d] lowercase first-letter:uppercase tracking-wide">
          Deja tu intención
        </h2>
        <div className="h-px bg-[#b89e6e] w-12 mt-2" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label className="block text-[15px] font-bold text-[#b89e6e] uppercase tracking-[0.2em] mb-2">
            Tu mensaje para este elemento
          </label>
          <textarea
            rows="3"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="w-full bg-transparent border-b border-[#e0d7c6] focus:border-[#b89e6e] py-3 outline-none text-[#465c54] font-light italic placeholder:text-[#c5b8a0] transition-colors resize-none"
            placeholder="Comparte tu experiencia o intención..."
          />
        </div>

        {error && (
          <div className="text-[11px] text-red-700 bg-red-50/50 p-3 border-l-2 border-red-700 font-serif italic">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group w-full bg-[#3e5c4d] text-[#fdfbf7] py-4 rounded-sm flex items-center justify-center gap-3 hover:bg-[#2d4037] transition-all duration-500 disabled:opacity-50 uppercase text-[15px] font-bold tracking-[0.3em] shadow-lg shadow-[#3e5c4d]/10"
        >
          {loading ? (
            "Enviando..."
          ) : (
            <>
              <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Compartir Mensaje
            </>
          )}
        </button>
      </form>
    </div>
  );
}