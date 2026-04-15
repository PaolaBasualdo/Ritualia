import { Router } from "express";

import categoriasRoutes from "./categorias.routes.js";
import productosRoutes from "./productos.routes.js";
import productoImagenRoutes from "./productoImagen.routes.js";
import mensajesRoutes from "./mensajes.routes.js";
import variantesRoutes from "./variantes.routes.js";
import cuponesDescuentoRoutes from "./cuponesDescuento.routes.js";

const router = Router();

router.use("/categorias", categoriasRoutes);
router.use("/productos", productosRoutes);
router.use("/", mensajesRoutes);
router.use("/", productoImagenRoutes);
router.use("/", variantesRoutes);
router.use("/cupones", cuponesDescuentoRoutes);

export default router;