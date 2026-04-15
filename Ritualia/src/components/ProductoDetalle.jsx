import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { getImageUrl } from "../utils/imagenUtils";
import MensajeList from "./MensajeList";
import FormMensaje from "./FormMensaje";
import VarianteList from "./VarianteList";
import Precio from "./Precio";

import {
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus,
  Star,
  Sparkles,
} from "lucide-react";

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  const [expandirDescripcion, setExpandirDescripcion] = useState(false);

  const [mensajes, setMensajes] = useState([]);
  const [loadingMensajes, setLoadingMensajes] = useState(true);

  const [variantes, setVariantes] = useState([]);
  const [loadingVariantes, setLoadingVariantes] = useState([]);

  useEffect(() => {
    const fetchProducto = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/productos/${id}`);
        setProducto(res.data);
        setMainImage(res.data.imagenPrincipal);
      } catch (error) {
        console.error("Error al traer el detalle", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  useEffect(() => {
    //Cuando el componente se monta. Cada vez que cambia el id del producto en la URL.
    const fetchMensajes = async () => {
      setLoadingMensajes(true);
      try {
        const res = await API.get(`/productos/${id}/mensajes`);
        setMensajes(res.data);
      } catch (error) {
        console.error("Error al traer el mensaje", error);
      } finally {
        setLoadingMensajes(false);
      }
    };
    fetchMensajes();
  }, [id]);

  useEffect(() => {
    const fetchVariantes = async () => {
      setLoadingVariantes(true);
      try {
        const res = await API.get(`/productos/${id}/variantes`);
        setVariantes(res.data);
      } catch (error) {
        console.error("Error al traer las variantes del producto", error);
      } finally {
        setLoadingVariantes(false);
      }
    };
    fetchVariantes();
  }, [id]);

  const handleMensajeCreado = (nuevoMensaje) => {
    setMensajes((prev) => [nuevoMensaje, ...prev]);
  }; //el fromulario para un nuevo mensaje al crear el mensaje, por el controlador lo devuelve el nuevo mensaje
  //emtoncesesta funcion cambia el estado del array mensajes, lo incorpora al nuevo para que aparezaca en la lista
  //setMensajes((prev) => ...) Es la forma correcta cuando el nuevo estado depende del anterior.
  const allImages = useMemo(() => {
    if (!producto) return [];
    const lista = [];
    if (producto.imagenPrincipal) lista.push(producto.imagenPrincipal);
    const secundarias = producto.ProductoImagens || [];
    secundarias.forEach((img) => {
      if (img.url && img.url !== producto.imagenPrincipal) {
        lista.push(img.url);
      }
    });
    return lista;
  }, [producto]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfbf7] text-[#3e5c4d]">
        <Sparkles className="animate-pulse mb-4" size={32} />
        <span className="font-serif uppercase tracking-[0.3em] text-sm">
          Cargando...
        </span>
      </div>
    );

  if (!producto)
    return (
      <div className="text-center py-20 bg-[#fdfbf7] min-h-screen font-serif text-[#3e5c4d]">
        El producto no ha sido hallado.
      </div>
    );

  const LIMITE = 400;
  const descripcion = producto.descripcion || "";
  const esLarga = descripcion.length > LIMITE;

  const conOferta = producto.oferta;
  const tieneDescuento = producto.descuento > 0;
  {/*const precioDescuento =
    producto.precio - (producto.precio * producto.descuento) / 100;*/}

  return (
    <div className="min-h-screen bg-[#fdfbf7] pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[#5a766c] hover:text-[#b89e6e] transition-all uppercase text-sm font-bold tracking-[0.2em]"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Volver a la colección
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* COLUMNA IZQUIERDA: GALERÍA */}
        <div className="lg:col-span-6 flex flex-col items-center">
          {/* Imagen Principal */}
          <div className="relative w-full max-w-xl aspect-square bg-white border border-[#e0d7c6] overflow-hidden rounded-sm shadow-sm">
            {/* Chip de Oferta - Renderizado Condicional */}
            {conOferta && (
              <div
                className="absolute top-3 right-3 z-10 
              bg-[#b1a48e]/70
              hover:bg-[#b1a48e]/90
              transition-all duration-300
              backdrop-blur-sm
              text-white 
              text-[10px] 
              font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md"
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
              src={getImageUrl(mainImage)}
              alt={producto.nombre}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out"
            />
          </div>

          {/* Miniaturas */}
          <div
            className="w-full max-w-xl mt-4 grid gap-3 
                  grid-cols-[repeat(auto-fit,minmax(80px,1fr))]"
          >
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`relative aspect-square border transition-all duration-300 rounded-sm overflow-hidden ${
                  mainImage === img
                    ? "border-[#b89e6e] ring-1 ring-[#b89e6e]"
                    : "border-[#e0d7c6] opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={getImageUrl(img)}
                  className="w-full h-full object-cover"
                  alt={`Vista ${idx}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA: INFO DEL PRODUCTO */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-1 text-[#b89e6e]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} fill="currentColor" />
              ))}
              <span className="text-[15px] text-[#5a766c] ml-3 tracking-[0.3em] uppercase font-bold">
                Elemento de Poder
              </span>
            </div>
            <h1 className="text-5xl font-serif text-[#3e5c4d] leading-tight lowercase first-letter:uppercase">
              {producto.nombre}
            </h1>

              <Precio producto={producto} />
           

          <div className="h-px bg-[#e0d7c6]" />

          {/* Formato de Descripción*/}
          <div className="space-y-5">
            <div
              className={`bg-[#f4f1ea]/50 p-8 rounded-sm border-l-2 border-[#b89e6e] relative transition-all duration-300 ${
                expandirDescripcion ? "" : "max-h-64 overflow-y-auto"
              }`}
            >
              <span className="absolute top-2 left-4 text-4xl text-[#b89e6e]/20 font-serif">
                “
              </span>

              <p className="text-[#465c54] leading-relaxed text-base font-light italic whitespace-pre-line px-2">
                {producto?.descripcion}
              </p>

              <span className="absolute bottom-0 right-4 text-4xl text-[#b89e6e]/20 font-serif">
                ”
              </span>
            </div>

            <button
              onClick={() => setExpandirDescripcion(!expandirDescripcion)}
              className="text-xs uppercase tracking-widest font-bold text-[#b89e6e] hover:underline"
            >
              {expandirDescripcion ? "Ver menos" : "Ver mas"}
            </button>
          </div>

          {/* Compra  */}
          <div className="pt-4 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center border border-[#e0d7c6] rounded-sm bg-white">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="p-3 text-[#3e5c4d] hover:bg-[#f4f1ea] transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-serif text-[#3e5c4d]">
                  {cantidad}
                </span>
                <button
                  onClick={() =>
                    setCantidad(Math.min(producto.stock, cantidad + 1))
                  }
                  className="p-3 text-[#3e5c4d] hover:bg-[#f4f1ea] transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button
              disabled={producto.stock === 0}
              className="w-full bg-[#3e5c4d] text-[#fdfbf7] py-5 flex items-center justify-center gap-4 hover:bg-[#2d4037] transition-all duration-500 uppercase text-xs tracking-[0.3em] font-bold shadow-lg shadow-[#3e5c4d]/10 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
            >
              <ShoppingCart size={18} />
              {producto.stock === 0 ? "Sin existencias" : "Añadir al Carrito"}
            </button>
          </div>

          <div>
            {loadingVariantes ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Sparkles
                  className="animate-pulse text-[#b89e6e] mb-4"
                  size={24}
                />
                <span className="text-sm uppercase tracking-widest text-[#5a766c]">
                  Buscando variantes...
                </span>
              </div>
            ) : (
              <VarianteList variantes={variantes} /> //simple map para renderizar las card, no hay fetch en el componente. Los estados de mensajes lo maneja ProductoDetalle
            )}
          </div>

          {/* Detalles de Calidad */}
          <div className="pt-8 grid grid-cols-2 gap-8 border-t border-[#e0d7c6]">
            <div className="space-y-1">
              <span className="block text-[15px] font-bold text-[#b89e6e] uppercase tracking-tighter">
                Esencia
              </span>
              <span className="text-[15px] text-[#5a766c] uppercase tracking-wider">
                Origen Orgánico
              </span>
            </div>
            <div className="space-y-1">
              <span className="block text-[15px] font-bold text-[#b89e6e] uppercase tracking-tighter">
                Entrega
              </span>
              <span className="text-[15px] text-[#5a766c] uppercase tracking-wider">
                Despacho Protegido
              </span>
            </div>
          </div>
        </div>
      </div>

      

    </div>

    {/* SECCIÓN DE MENSAJES / RESEÑAS */}
      <div className="max-w-7xl mx-auto px-6 mt-24">
        {" "}
        {/* Usamos max-w-7xl para igualar al ancho principal */}
        {/* Encabezado de la sección */}
        <div className="flex flex-col items-center mb-16">
          <div className="h-px bg-[#e0d7c6] w-24 mb-6" />
          <h2 className="font-serif text-4xl text-[#3e5c4d] lowercase first-letter:uppercase tracking-tight">
            Ecos de la comunidad
          </h2>
          <p className="text-sm text-[#b89e6e] uppercase tracking-[0.4em] font-bold mt-3">
            Testimonios e intenciones
          </p>
        </div>
        <div className="grid grid-cols-1 gap-16">
          {/* Lista de Mensajes */}
          <div className="order-2 lg:order-1">
            {loadingMensajes ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Sparkles
                  className="animate-pulse text-[#b89e6e] mb-4"
                  size={24}
                />
                <span className="text-sm uppercase tracking-widest text-[#5a766c]">
                  Invocando mensajes...
                </span>
              </div>
            ) : (
              <MensajeList mensajes={mensajes} /> //simple map para renderizar las card, no hay fetch en el componente. Los estados de mensajes lo maneja ProductoDetalle
            )}
          </div>

          {/* Formulario para nuevo mensaje */}
          <div className="order-1 lg:order-2 border-t border-[#e0d7c6] pt-16">
            <div className="w-full mx-auto">
              <FormMensaje productoId={id} onCreated={handleMensajeCreado} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
