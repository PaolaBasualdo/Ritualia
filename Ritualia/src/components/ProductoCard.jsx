import { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/imagenUtils";
import { CuponDescuentoContext } from "../contexts/cuponDescuento.context";
import Precio from "./Precio";

import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Plus,
  Minus,
  Moon,
} from "lucide-react";

const ProductoCard = ({ producto }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cantidad, setCantidad] = useState(1);

  // Unificar imágenes para el slider
  const allImages = useMemo(() => {
    const lista = [];

    // 1. Añadir la principal
    if (producto?.imagenPrincipal) {
      lista.push(producto.imagenPrincipal);
    }

    // 2. Añadir las secundarias (Sequelize usa ProductoImagens por defecto)
    const secundarias = producto?.ProductoImagens || [];
    secundarias.forEach((img) => {
      // Evitar duplicados si la principal ya está en el array de secundarias
      if (img.url && img.url !== producto.imagenPrincipal) {
        lista.push(img.url);
      }
    });

    return lista;
  }, [producto]);

  if (!producto) return null;
  //para la imagen
  const conOferta = producto.oferta;

  const tieneDescuento = producto.descuento > 0;

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleDetail = () => {
    // Esto redirige a /productos/5 (si el id es 5)
    navigate(`/productos/${producto.id}`);
  };

  return (
    <div className="bg-[#fdfbf7] border border-[#e0d7c6] rounded-sm overflow-hidden w-72 shadow-sm hover:shadow-xl transition-all duration-500 group">
      {/* Contenedor Imagen / Slider */}
      <div className="relative h-80 overflow-hidden bg-[#f4f1ea] cursor-pointer">
        {allImages.length > 0 ? (
          <div className="relative w-full max-w-xl aspect-square bg-white border border-[#e0d7c6] overflow-hidden rounded-sm shadow-sm">
            {/* Chip de Oferta - Renderizado Condicional */}
            {conOferta && (
              <div
                className="absolute top-3 right-3 z-10 bg-[#b1a48e]  hover:bg-[#b1a48e]/90
              transition-all duration-300
              backdrop-blur-smtext-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md"
              >
                Oferta
              </div>
            )}
            {tieneDescuento && (
              <div
                className="absolute bottom-3 right-3 z-10
 bg-[#b1a48e]/70
  hover:bg-[#b1a48e]/90
  transition-all duration-300
  backdrop-blur-sm
  text-white
  text-[10px]
  font-bold
  uppercase
  tracking-widest
  px-3 py-1
  rounded-full
  shadow-md"
              >
                {producto.descuento}%
              </div>
            )}
            <img
              src={getImageUrl(allImages[currentIndex])}
              alt={producto.nombre}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onClick={handleDetail} // Suponiendo que tienes la función de navegación
            />{" "}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#c5b8a0]">
            <span className="text-[10px] uppercase tracking-widest">
              Sin imagen
            </span>
          </div>
        )}

        {/* Flechas: Solo aparecen al hacer HOVER sobre la card */}
        {allImages.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button
              onClick={prevImage}
              className="pointer-events-auto bg-white/40 backdrop-blur-sm p-1 rounded-full text-[#3e5c4d]/70 hover:text-[#b89e6e] hover:bg-white/90 shadow-sm transition-all"
            >
              <ChevronLeft size={16} /> {/* Tamaño reducido */}
            </button>

            <button
              onClick={nextImage}
              className="pointer-events-auto bg-white/40 backdrop-blur-sm p-1 rounded-full text-[#3e5c4d]/70 hover:text-[#b89e6e] hover:bg-white/90 shadow-sm transition-all"
            >
              <ChevronRight size={14} /> {/* Tamaño reducido */}
            </button>
          </div>
        )}

        {/* Puntitos: Siempre visibles pero muy suaves */}
        {allImages.length > 1 && (
          /* Cambié bg-black/5 por bg-[#3e5c4d]/10 para que el fondo de la cápsula sea un verde muy traslúcido */
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-2.5 py-1.5 rounded-full bg-[#3e5c4d]/10 backdrop-blur-md">
            {allImages.map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-300 rounded-full ${
                  i === currentIndex
                    ? "w-4 h-1 bg-[#b89e6e] shadow-sm" // El activo es bronce/oro con sombra
                    : "w-1.5 h-1.5 bg-[#fdfbf7] border border-[#3e5c4d]/10" // El inactivo es color "manteca" con un borde sutil
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Información del Producto */}
      <div className="p-6 flex flex-col items-center">
        <h3 className="font-serif text-lg text-[#3e5c4d] mb-1 uppercase tracking-[0.15em] text-center leading-tight">
          {producto.nombre}
        </h3>

        <Precio producto={producto} />

        {/* Controles de Compra */}
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between border-b border-[#e0d7c6] pb-2">
            <span className="text-[10px] uppercase tracking-widest text-[#5a766c] font-bold">
              Cantidad
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
                className="text-[#3e5c4d] hover:text-[#b89e6e] transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="font-medium text-[#3e5c4d] min-w-[20px] text-center">
                {cantidad}
              </span>
              <button
                onClick={() =>
                  setCantidad((prev) =>
                    prev < producto.stock ? prev + 1 : prev,
                  )
                }
                className="text-[#3e5c4d] hover:text-[#b89e6e] transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <button
            disabled={producto.stock === 0}
            className="w-full bg-[#3e5c4d] text-[#fdfbf7] py-3 flex items-center justify-center gap-3 hover:bg-[#2d4037] transition-all duration-300 disabled:bg-[#d1d5db] disabled:cursor-not-allowed uppercase text-[10px] tracking-[0.2em] font-bold shadow-lg shadow-black/5"
          >
            <ShoppingCart size={14} />
            {producto.stock === 0 ? "Agotado" : "Añadir al Carrito"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;
