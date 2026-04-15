import { useState } from "react";
import { postMultipart } from "../services/upload.service";

export default function FormCategoria({ onCreated }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    try {
      setLoading(true);

      const response = await postMultipart("/categorias", {
        nombre,
        descripcion,
        imagen,
      });

      setNombre("");
      setDescripcion("");
      setImagen(null);
      setPreview(null);

      if (onCreated) {
        onCreated(response.data);
      }

    } catch (err) {
      setError("Error al crear la categoría");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-[#2d4037] mb-1">
          Nombre de Categoría
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border border-[#c5b8a0] rounded-lg px-3 py-2 bg-[#fdfbf7] text-[#2d4037] focus:outline-none focus:ring-2 focus:ring-[#b89e6e] focus:border-transparent transition-all placeholder-gray-400"
          placeholder="Ej: Velas Aromáticas"
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
          placeholder="Breve descripción de la categoría"
        />
      </div>

      {/* Imagen */}
      <div>
        <label className="block text-sm font-medium text-[#2d4037] mb-1">
          Imagen Representativa
        </label>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center px-4 py-2 border border-[#c5b8a0] bg-white text-[#2d4037] text-sm font-medium rounded-lg cursor-pointer hover:bg-[#fdfbf7] transition-colors focus-within:ring-2 focus-within:ring-[#b89e6e]">
            <span>Seleccionar Archivo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
            />
          </label>
          <span className="text-sm text-gray-500">
            {imagen ? imagen.name : "Ningún archivo seleccionado"}
          </span>
        </div>
      </div>

      {/* Preview */}
      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt="Preview"
            className="h-32 w-full object-cover rounded-lg border border-[#c5b8a0]"
          />
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
        {loading ? "Guardando..." : "Crear Categoría"}
      </button>
    </form>
  );
}
