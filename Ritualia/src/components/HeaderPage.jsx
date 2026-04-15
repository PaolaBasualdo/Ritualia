import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo 3.png'; 

const HeaderPage = () => {
  return (
    <header className="bg-[#e0d7c6] border-b border-[#c5b8a0] shadow-md px-8 py-3">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Contenedor del Logo - Ahora con más presencia */}
        <div className="flex items-center">
          <Link to="/" className="transition-transform hover:scale-105 duration-300">
            <img 
              src={logo} 
              alt="Ritualia Logo" 
              className="h-20 w-auto object-contain mix-blend-multiply drop-shadow-sm" 
              /* Aumenté la altura a h-20 y agregué drop-shadow para que resalte más */
            />
          </Link>
        </div>

        {/* Enlaces de navegación - Colores más profundos */}
        <ul className="flex space-x-12 items-center">
          <li>
            <Link 
              to="/productos" 
              className="text-[#2d4037] font-semibold text-lg tracking-widest hover:text-[#b89e6e] transition-colors duration-300 relative group uppercase"
            >
              Productos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#b89e6e] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link 
              to="/categorias" 
              className="text-[#2d4037] font-semibold text-lg tracking-widest hover:text-[#b89e6e] transition-colors duration-300 relative group uppercase"
            >
              Categorías
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#b89e6e] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>

          <li>
            <Link 
              to="/admin" 
              className="text-[#2d4037] font-semibold text-lg tracking-widest hover:text-[#b89e6e] transition-colors duration-300 relative group uppercase"
            >
              Admin
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#b89e6e] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>

      </nav>
    </header>
  );
};

export default HeaderPage;
