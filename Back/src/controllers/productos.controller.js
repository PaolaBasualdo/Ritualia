import { Producto, ProductoImagen } from "../models/index.js";

export const getProductos = async (req, res) => {
  const productos = await Producto.findAll({
    where: { activo: true },
    include: [
      {
        model: ProductoImagen,
        where: { activo: true },
        required: false,
      },
    ],
  });

  res.json(productos);
};

export const getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, {
      include: [
        {
          model: ProductoImagen,
          where: { activo: true },
          required: false, // Importante: para que si no tiene imágenes extra, igual traiga el producto
        },
      ],
    });

    if (!producto) return res.status(404).json({ message: "No encontrado" });
    
    res.json(producto);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

export const createProducto = async (req, res) => {
  const producto = await Producto.create(req.body);
  res.status(201).json(producto);
};