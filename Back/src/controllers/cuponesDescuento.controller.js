import CuponDescuento from "../models/CuponDescuento.js";

export const createCupon = async (req, res) => {
  try {
    const nuevoCupon = await CuponDescuento.create(req.body);
    res.status(201).json(nuevoCupon);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCuponesDescuento = async (req, res) => {
  try {
    const cupones = await CuponDescuento.findAll({
      where: { activo: true },
    });
    res.json(cupones);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCuponDescuentoById = async (req, res) => {
  try {
    const cupon = await CuponDescuento.findOne({
      where: {
        id: req.params.id,
        activo: true,
      },
    });

    if (!cupon) {
      return res.status(404).json({ msg: "Cupón no encontrado" });
    }

    res.json(cupon);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateCupon = async (req, res) => {
  try {
    const cupon = await CuponDescuento.findOne({
      where: {
        id: req.params.id,
        activo: true,
      },
    });

    if (!cupon) {
      return res.status(404).json({ msg: "Cupón no encontrado" });
    }

    await cupon.update(req.body);

    res.json(cupon);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteCupon = async (req, res) => {
  try {
    const cupon = await CuponDescuento.findByPk(req.params.id);

    if (!cupon) {
      return res.status(404).json({ msg: "Cupón no encontrado" });
    }

    await cupon.update({ activo: false });

    res.json({ msg: "Cupón desactivado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const validarCupon = async (req, res) => {
  try {
    const { codigoCupon } = req.params;
//req.params contiene los parámetros de la ruta. Por ejemplo: 
//GET /api/cupones/validar/BIENVENIDO26

//findOne devolver el primer registro que coincida o null si no existe

    const cupon = await CuponDescuento.findOne({
      where: {
        codigoCupon: codigoCupon.trim().toUpperCase(),
        activo: true,
      },
    });

    /*a la base de datos: SELECT *
FROM cupones
WHERE codigoCupon = 'BIENVENIDO26'
AND activo = true
LIMIT 1;*/

//trim elimina espacios al principio y al final y uppercase convierte a mayusculas

    if (!cupon) {
      return res.status(404).json({
        msg: "Cupón inválido o inactivo",//esto recibe el front
      });
    }
// el cupon es un objeto
    res.json({
      nombreCupon: cupon.nombreCupon,
      codigoCupon: cupon.codigoCupon,
      porcentajeDescuento: cupon.porcentajeDescuento,
    });
  } catch (error) {//si a BD esta caida, error de conexion, error tecnico
    res.status(500).json({ msg: error.message });

  }
};

/*Es una función asincrónica que recibe el código del cupón desde la URL mediante req.params. Luego realiza una consulta a la base de datos usando Sequelize, buscando un cupón cuyo codigoCupon coincida con el valor recibido (normalizado a mayúsculas y sin espacios) y que esté activo. Si no encuentra coincidencia, responde con un error 404 indicando que el cupón es inválido o inactivo. Si encuentra el cupón, devuelve al frontend un objeto JSON con el nombre del cupón, el código y el porcentaje de descuento, que el frontend usará para calcular los precios con descuento.*/