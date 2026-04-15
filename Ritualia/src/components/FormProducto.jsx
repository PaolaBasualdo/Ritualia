import { useState } from "react";
import API from "../api";
import { postMultipart } from "../services/upload.service";

const categoriasEnum = [
  { id: 1, nombre: "Herramientas rituales" },
  { id: 2, nombre: "Botanica y materia natural" },
  { id: 3, nombre: "Fuego y combustion" },
  { id: 4, nombre: "Aceites y Posimas" },
  { id: 5, nombre: "Amuletos y Talismanes" },
  { id: 6, nombre: "Escritura y registro" },
  { id: 7, nombre: "Oraculo y adivinacion" },
];

export default function FormProducto() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState(0);
  const [idCategoria, setIdCategoria] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const MAX_IMAGENES = 5;

  const handleImageChange = (e) => {
    const nuevas = Array.from(e.target.files);

    setImagenes((prev) => {
      const combinadas = [...prev, ...nuevas];
      return combinadas.slice(0, MAX_IMAGENES);
    });

    e.target.value = null; // permite volver a seleccionar la misma imagen
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      // 1️⃣ Crear producto
      const response = await API.post("/productos", {
        nombre,
        descripcion,
        precio,
        stock,
        idCategoria,
      });

      const productoCreado = response.data;

      // 2️⃣ Subir imágenes si existen
      if (imagenes.length > 0) {
        await postMultipart(`/productos/${productoCreado.id}/imagenes`, {
          imagenes, // clave debe coincidir con .array("imagenes")
        });
      }

      // Reset
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock(0);
      setIdCategoria("");
      setImagenes([]);
    } catch (err) {
      setError("Error al crear el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-[#2d4037] mb-1">
          Nombre del Producto
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border border-[#c5b8a0] rounded-lg px-3 py-2 bg-[#fdfbf7] text-[#2d4037] focus:outline-none focus:ring-2 focus:ring-[#b89e6e] focus:border-transparent transition-all placeholder-gray-400"
          placeholder="Ej: Vela de Lavanda"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium text-[#2d4037] mb-1">
          Descripción
        </label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows={3}
          className="w-full border border-[#c5b8a0] rounded-lg px-3 py-2 bg-[#fdfbf7] text-[#2d4037] focus:outline-none focus:ring-2 focus:ring-[#b89e6e] focus:border-transparent transition-all placeholder-gray-400 resize-none"
          placeholder="Detalles y características del producto"
        />
      </div>

      {/* Precio y Stock en grid */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#2d4037] mb-1">
            Precio
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
            <input
              type="number"
              step="0.01"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="w-full border border-[#c5b8a0] rounded-lg pl-8 pr-3 py-2 bg-[#fdfbf7] text-[#2d4037] focus:outline-none focus:ring-2 focus:ring-[#b89e6e] focus:border-transparent transition-all placeholder-gray-400"
              placeholder="0.00"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2d4037] mb-1">
            Stock
          </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border border-[#c5b8a0] rounded-lg px-3 py-2 bg-[#fdfbf7] text-[#2d4037] focus:outline-none focus:ring-2 focus:ring-[#b89e6e] focus:border-transparent transition-all placeholder-gray-400"
            placeholder="0"
          />
        </div>
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium text-[#2d4037] mb-1">
          Categoría
        </label>
        <select
          value={idCategoria}
          onChange={(e) => setIdCategoria(e.target.value)}
          className="w-full border border-[#c5b8a0] rounded-lg px-3 py-2 bg-[#fdfbf7] text-[#2d4037] focus:outline-none focus:ring-2 focus:ring-[#b89e6e] focus:border-transparent transition-all"
        >
          <option value="">Seleccionar categoría</option>
          {categoriasEnum.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Imágenes */}
      <div>
        <label className="block text-sm font-medium text-[#2d4037] mb-1">
          Imágenes del producto (máximo 5)
        </label>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center px-4 py-2 border border-[#c5b8a0] bg-white text-[#2d4037] text-sm font-medium rounded-lg cursor-pointer hover:bg-[#fdfbf7] transition-colors focus-within:ring-2 focus-within:ring-[#b89e6e]">
            <span>Seleccionar Imágenes</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
            />
          </label>
          <span className="text-sm text-gray-500">
            {imagenes.length} / 5 seleccionadas
          </span>
        </div>
      </div>

      {/* Preview Imágenes */}
      {imagenes.length > 0 && (
        <div className="flex gap-3 mt-3 flex-wrap p-3 border border-[#e0d7c6] bg-white rounded-lg">
          {imagenes.map((img, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-20 h-20 object-cover rounded shadow-sm border border-[#e0d7c6]"
              />
              <button
                type="button"
                onClick={() =>
                  setImagenes((prev) => prev.filter((_, i) => i !== index))
                }
                className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#2d4037] text-[#fdfbf7] py-2.5 rounded-lg font-medium hover:bg-[#b89e6e] hover:text-[#2d4037] transition-colors duration-300 disabled:opacity-50"
      >
        {loading ? "Guardando..." : "Crear Producto"}
      </button>
    </form>
  );
}
