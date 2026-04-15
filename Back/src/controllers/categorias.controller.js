import Categoria from "../models/Categoria.js";

export const getCategorias = async (req, res) => {
  const categorias = await Categoria.findAll({ where: { activo: true } });
  res.json(categorias);
};

export const getCategoriaById = async (req, res) => {
  const categoria = await Categoria.findByPk(req.params.id);
  if (!categoria) return res.status(404).json({ message: "No encontrada" });
  res.json(categoria);
};

export const createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion, activo } = req.body;

    const imagenUrl = req.file ? req.file.filename : null;

    const categoria = await Categoria.create({
      nombre,
      descripcion, 
      activo,
      imagenUrl,
    });

    res.status(201).json(categoria);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};