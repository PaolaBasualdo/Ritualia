import Mensaje from "../models/Mensaje.js";

export const getMensajesByProducto = async (req, res) => {
  const mensajes = await Mensaje.findAll({
    where: { productoId: req.params.productoId },//parametros de  rutas para segmentos dinamicos.
  });
  res.json(mensajes);
};
//findAll si encuentra registros devuelve un array con elementos, sino uno vacio. Nunca devuelve null ni undefined
export const createMensaje = async (req, res) => {
  const { texto } = req.body;

  const mensaje = await Mensaje.create({
    texto,
    productoId: req.params.productoId,
  });

  res.status(201).json(mensaje);
};