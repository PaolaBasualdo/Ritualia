import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/imagenUtils";

const CategoriaCard = ({ categoria }) => {
  const navigate = useNavigate();

  if (!categoria) return null;

  console.log("CategoriaCard:", categoria);

  // Al hacer click, llevamos al usuario a la lista de productos filtrada
  const handleNavigation = () => {
    navigate(`/categorias/${categoria.id}`);
  };

  return (
    <div 
      onClick={handleNavigation}
      className="group cursor-pointer flex flex-col items-center w-full max-w-[320px]"
    >
      {/* Contenedor de Imagen Única */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f4f1ea] border border-[#e0d7c6] rounded-sm shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:border-[#b89e6e]">
        {categoria.imagenUrl ? (
         <img
  // Agregamos manualmente el prefijo de la carpeta que falta
  src={getImageUrl(`uploads/categorias/${categoria.imagenUrl}`)}
  alt={categoria.nombre}
  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
/>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#c5b8a0]">
            <span className="text-[10px] uppercase tracking-[0.3em]">Sin Imagen</span>
          </div>
        )}
        
        {/* Overlay sutil al hacer hover */}
        <div className="absolute inset-0 bg-[#3e5c4d]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Información de la Categoría */}
      <div className="mt-6 text-center space-y-2 px-2">
        <h3 className="font-serif text-2xl text-[#3e5c4d] lowercase first-letter:uppercase tracking-wide transition-colors group-hover:text-[#b89e6e]">
          {categoria.nombre}
        </h3>
        
        {/* Línea decorativa que se expande en hover */}
        <div className="h-px bg-[#b89e6e] w-8 mx-auto transition-all duration-500 group-hover:w-20" />

        
      </div>
    </div>
  );
};

export default CategoriaCard;