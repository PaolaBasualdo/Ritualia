import Variante from "../models/Variante.js";

export const getVariantesByProducto = async (req, res) => {
  const variantes = await Variante.findAll({
    where: { productoId: req.params.productoId },//parametros de  rutas para segmentos dinamicos.
  });
  res.json(variantes);
  };