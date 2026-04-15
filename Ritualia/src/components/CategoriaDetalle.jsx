import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { getImageUrl } from "../utils/imagenUtils";
import { ArrowLeft, Sparkles } from "lucide-react";

const CategoriaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoria = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/categorias/${id}`);
        setCategoria(res.data);
      } catch (error) {
        console.error("Error al traer la categoría", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoria();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfbf7] text-[#3e5c4d]">
        <Sparkles className="animate-pulse mb-4" size={32} />
        <span className="font-serif uppercase tracking-[0.3em] text-sm">
          Cargando...
        </span>
      </div>
    );
  }

  if (!categoria) {
    return (
      <div className="text-center py-20 bg-[#fdfbf7] min-h-screen font-serif text-[#3e5c4d]">
        La categoría no ha sido hallada.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[#5a766c] hover:text-[#b89e6e] transition-all uppercase text-[10px] font-bold tracking-[0.2em]"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Volver
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Imagen */}
        <div className="w-full aspect-square bg-white border border-[#e0d7c6] overflow-hidden rounded-sm shadow-sm">
          <img
            src={getImageUrl(`uploads/categorias/${categoria.imagenUrl}`)}
            alt={categoria.nombre}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Información */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-serif text-[#3e5c4d] leading-tight lowercase first-letter:uppercase">
              {categoria.nombre}
            </h1>
          </div>

          <div className="h-px bg-[#e0d7c6]" />

          <div className="bg-[#f4f1ea]/50 p-8 rounded-sm border-l-2 border-[#b89e6e] relative">
            <span className="absolute top-2 left-4 text-4xl text-[#b89e6e]/20 font-serif">
              “
            </span>

            <p className="text-[#465c54] leading-relaxed text-base font-light italic whitespace-pre-line px-2">
              {categoria.descripcion}
            </p>

            <span className="absolute bottom-0 right-4 text-4xl text-[#b89e6e]/20 font-serif">
              ”
            </span>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default CategoriaDetalle;
