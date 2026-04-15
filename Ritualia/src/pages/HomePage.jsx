import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import ProductoCard from "../components/ProductoCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero 3.png";

function HomePage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const featuredProducts = productos.slice(0, 4);

  const sliderData = [
    {
      id: 1,
      image: hero1,
      headline: "Colección Esencial",
      desc: "El origen de nuestra energía",
      link: "/categorias"
    },
    {
      id: 2,
      image: hero2,
      headline: "Armonía Natural",
      desc: "Equilibrio en cada espacio",
      link: "/productos"
    },
    {
      id: 3,
      image: hero3,
      headline: "Rituales Nocturnos",
      desc: "Para tu descanso profundo",
      link: "/productos"
    }
  ];

  // Auto-avance del slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 bg-[#fdfbf7] min-h-screen">
        <div className="w-8 h-8 border-4 border-[#e0d7c6] border-t-[#b89e6e] rounded-full animate-spin mb-4"></div>
        <p className="text-[#3e5c4d] font-serif italic tracking-widest">Invocando elementos...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfbf7] min-h-screen fade-in">
      {/* Hero Slider Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden bg-[#e0d7c6] group">
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Imagen de fondo cover con un sutil efecto de zoom (Ken Burns) */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ${
                 index === currentSlide ? "scale-105" : "scale-100"
              }`}
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            ></div>
            {/* Overlay oscuro para contraste de texto */}
            <div className="absolute inset-0 bg-[#2d4037]/50"></div>

            {/* Contenido centrado del slide */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
              <span className="text-[#b89e6e] text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-bold drop-shadow-md">
                Nueva Colección
              </span>
              <h1 className="text-4xl md:text-6xl text-[#fdfbf7] font-serif mb-6 uppercase tracking-widest drop-shadow-md max-w-4xl leading-tight">
                {slide.headline}
              </h1>
              <p className="text-[#e0d7c6] text-base md:text-lg font-light mb-8 max-w-2xl drop-shadow-md tracking-wide">
                {slide.desc}
              </p>
              <Link
                to={slide.link}
                className="bg-[#b89e6e] text-[#fdfbf7] px-8 py-3.5 uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-[#a68c5b] hover:shadow-lg transition-all duration-300"
              >
                Explorar Ahora
              </Link>
            </div>
          </div>
        ))}

        {/* Controles de Slider (Flechas) */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
        >
          <ChevronRight size={24} strokeWidth={1.5} />
        </button>
        
        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {sliderData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                idx === currentSlide ? "bg-[#b89e6e] w-8" : "bg-white/40 hover:bg-white/70 w-2"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-[#3e5c4d] font-serif text-3xl md:text-4xl mb-6 uppercase tracking-[0.25em]">
            Elementos Destacados
          </h2>
          <div className="w-16 h-[1px] bg-[#b89e6e] mb-8"></div>
          <p className="text-[#5a766c] max-w-2xl font-light text-sm md:text-base leading-relaxed">
            Nuestra selección cuidadosamente elegida de elementos para enriquecer tus rituales y transformar tus espacios cotidianos.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
            ))
          ) : (
            <p className="text-[#b89e6e] font-serif text-center italic mt-8 w-full">
              No hay elementos disponibles en este momento.
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <Link
            to="/productos"
            className="border border-[#3e5c4d] text-[#3e5c4d] px-10 py-4 uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-[#3e5c4d] hover:text-[#fdfbf7] transition-all duration-300"
          >
            Ver todos los elementos
          </Link>
        </div>
      </section>

      {/* Hero Banner Secundario / Separador */}
      <section className="bg-[#3e5c4d] text-[#fdfbf7] py-32 px-4 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 opacity-5 pointer-events-none">
           {/* Un elemento decorativo abstracto */}
           <svg width="400" height="400" viewBox="0 0 100 100" className="animate-[spin_60s_linear_infinite]">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2,4"/>
              <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.2" fill="none"/>
           </svg>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <span className="text-[#b89e6e] text-xs tracking-[0.4em] uppercase mb-4 font-bold">
            Filosofía
          </span>
          <h2 className="font-serif text-3xl md:text-5xl mb-8 tracking-widest uppercase leading-snug">
            El Arte del Bienestar
          </h2>
          <p className="text-[#e0d7c6] text-base md:text-lg max-w-2xl font-light leading-relaxed mb-12">
            En Ritualia, creemos que los objetos que nos rodean tienen el poder de influir en nuestra energía y estado de ánimo. Hemos creado un espacio donde puedes encontrar piezas únicas para tus rituales diarios, elevando lo ordinario a lo extraordinario.
          </p>
          <Link
            to="/categorias"
            className="bg-[#fdfbf7] text-[#3e5c4d] px-10 py-4 uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-[#e0d7c6] hover:shadow-lg transition-all duration-300"
          >
            Explorar Colecciones
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;