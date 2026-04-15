import ProductoImagen from "../models/ProductoImagen.js";
import Producto from "../models/Producto.js";

export const getImagenesByProducto = async (req, res) => {
  const imagenes = await ProductoImagen.findAll({
    where: { idProducto: req.params.productoId },
  });
  res.json(imagenes);
};

export const createProductoImagen = async (req, res) => {
  try {
    const { productoId } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Sin imágenes" });
    }

    const data = req.files.map((file, index) => ({
      url: file.path,
      orden: index,
      idProducto: productoId,
    }));

    const imagenes = await ProductoImagen.bulkCreate(data);

    const producto = await Producto.findByPk(productoId);

    if (producto && !producto.imagenPrincipal) {
      await producto.update({
        imagenPrincipal: req.files[0].path,
      });
    }

    res.status(201).json(imagenes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno" });
  }
};
