import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail} from 'lucide-react';

const FooterPage = () => {
  return (
    <footer className="bg-[#e0d7c6] text-[#3e5c4d] py-12 px-8 mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Sección 1: Logo y Slogan */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Link to="/">
            {/* Aquí puedes poner tu logo o un texto estilizado */}
            <span className="font-serif text-3xl font-bold text-[#b89e6e]">Ritualia</span>
            {/* Para el logo importado: <img src={logo} alt="Ritualia" className="h-16 w-auto" /> */}
          </Link>
          <p className="text-sm font-light italic text-[#5a766c]">
            Despertando la magia interior. Herramientas para la intención y el despertar natural.
          </p>
        </div>

        {/* Sección 2: Navegación Rápida */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <h4 className="text-lg font-semibold mb-2 text-[#b89e6e]">Explorar</h4>
          <Link to="/productos" className="hover:underline text-base transition-colors duration-300 hover:text-[#7a907e]">Productos</Link>
          <Link to="/categorias" className="hover:underline text-base transition-colors duration-300 hover:text-[#7a907e]">Categorías</Link>

        </div>

        {/* Sección 3: Información y Redes Sociales (Ejemplo) */}
        <div className="flex flex-col items-center md:items-start space-y-3">
  <h4 className="text-lg font-semibold mb-2 text-[#b89e6e]">Comunicate</h4>
  
  {/* Este div con 'flex' pone el sobre y el mail en la misma línea */}
  <div className="flex items-center gap-2 group cursor-pointer">
    <Mail size={18} className="text-[#b89e6e]" />
    <p className="text-base text-[#3e5c4d] group-hover:text-[#b89e6e] transition-colors">
      info@ritualia.com
    </p>
  </div>

  <div className="flex space-x-4 mt-2">
    <a href="#" className="hover:text-[#b89e6e] transition-transform hover:scale-110 duration-300">
      <Instagram size={24} />
    </a>
    <a href="#" className="hover:text-[#b89e6e] transition-transform hover:scale-110 duration-300">
      <Facebook size={24} />
    </a>
  </div>
</div>
      </div>

      {/* Derechos de Autor */}
      <div className="mt-12 pt-8 border-t border-[#c5b8a0] text-center text-sm text-[#5a766c]">
        <p>&copy; {new Date().getFullYear()} Ritualia. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default FooterPage;