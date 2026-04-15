import { useState, useContext } from "react";
import { CuponDescuentoContext } from "../contexts/cuponDescuento.context";

function CuponInput() {
  const { validarCupon, limpiarCupon, cupon, loading, mensaje } =
    useContext(CuponDescuentoContext);

  const [codigo, setCodigo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codigo.trim()) return;
    await validarCupon(codigo);
  };

  const handleEliminar = () => {
    limpiarCupon();
    setCodigo("");
  };

  return (
    <div className="mt-6 p-4 border border-[#e0d7c6] bg-[#fdfcfb] rounded-sm shadow-sm">
      <h3 className="text-[#b89e6e] font-serif text-sm uppercase tracking-widest mb-3 font-bold">
        ¿Tienes un cupón?
      </h3>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Introduce el código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.toUpperCase())} // Lo forzamos a mayúsculas para estética
            disabled={loading || cupon}
            className={`w-full px-4 py-2 text-sm border font-sans transition-all duration-300 outline-none
              ${cupon 
                ? "bg-green-50 border-green-200 text-green-700" 
                : "bg-white border-[#e0d7c6] focus:border-[#b89e6e] text-gray-700"
              } rounded-sm`}
          />
        </div>

        {!cupon ? (
          <button
            type="submit"
            disabled={loading || !codigo}
            className="bg-[#b89e6e] text-white px-6 py-2 text-[10px] uppercase tracking-widest font-bold 
                       hover:bg-[#a68d5f] transition-colors disabled:opacity-50 rounded-sm shadow-sm"
          >
            {loading ? "..." : "Aplicar"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleEliminar}
            className="text-red-500 hover:text-red-700 text-[10px] uppercase tracking-widest font-bold border border-red-200 px-4 rounded-sm transition-colors"
          >
            Quitar
          </button>
        )}
      </form>

      {/* Mensajes de Feedback */}
      {mensaje && !cupon && (
        <p className="mt-2 text-xs text-red-500 font-sans italic">
          {mensaje}
        </p>
      )}

      {cupon && (
        <div className="mt-3 flex items-center justify-between bg-white border border-green-100 p-2 rounded-sm animate-fade-in">
          <p className="text-xs text-green-700 font-sans font-medium">
            ¡Cupón <span className="font-bold">{cupon.codigo}</span> aplicado con éxito!
          </p>
          <p className="text-sm font-serif font-bold text-green-700">
            -{cupon.porcentajeDescuento}%
          </p>
        </div>
      )}
    </div>
  );
}

export default CuponInput;