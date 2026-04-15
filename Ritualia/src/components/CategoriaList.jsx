import { useEffect, useState } from "react";
import API from "../api";
import CategoriaCard from "./CategoriaCard";

const CategoriaList = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await API.get("/categorias");
        setCategorias(res.data);
      } catch (error) {
        console.error("Error cargando categorías", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategorias();
  }, []);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <span className="font-serif text-[#3e5c4d] uppercase tracking-[0.4em] text-xs animate-pulse">
        Revelando colecciones...
      </span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Encabezado de la Sección */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-[#3e5c4d] font-serif text-4xl uppercase tracking-[0.2em]">
          Nuestras Colecciones
        </h2>
        <p className="text-[#b89e6e] uppercase text-[10px] tracking-[0.4em] font-bold">
          Selecciona tu intención
        </p>
      </div>

      {/* Grid de Categorías */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 justify-items-center">
        {categorias.map((cat) => (
          <CategoriaCard key={cat.id} categoria={cat} />
        ))}
      </div>
    </div>
  );
};

export default CategoriaList;