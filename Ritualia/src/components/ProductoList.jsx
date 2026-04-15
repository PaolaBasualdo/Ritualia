import { useEffect, useState } from "react";
import API from "../api";
import ProductoCard from "./ProductoCard";
import CuponInput from "./CuponInput";

const ProductoList = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await API.get("/productos");
        setProductos(res.data);
      } catch (error) {
        console.error("Error cargando productos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40">
      <div className="w-8 h-8 border-4 border-[#e0d7c6] border-t-[#b89e6e] rounded-full animate-spin mb-4"></div>
      <p className="text-[#3e5c4d] font-serif italic tracking-widest">Invocando elementos...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      {/* Cabecera de la Lista */}
      <header className="py-12 flex flex-col items-center text-center">
        <h2 className="text-[#3e5c4d] font-serif text-3xl md:text-4xl mb-4 uppercase tracking-[0.25em]">
          Nuestros Elementos
        </h2>
        <div className="w-20 h-[1px] bg-[#b89e6e] mb-8"></div>
        
        {/* Contenedor del Cupón: Limitado y centrado */}
        <div className="w-full max-w-md">
           <CuponInput />
        </div>
      </header>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 justify-items-center">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
            />
          ))
        ) : (
          <p className="col-span-full text-[#b89e6e] font-serif italic">No se encontraron elementos en esta colección.</p>
        )}
      </div>
    </div>
  );
};

export default ProductoList;