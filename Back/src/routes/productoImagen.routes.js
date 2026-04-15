import { Router } from "express";
import { uploadProductoImagen } from "../middlewares/upload.js";
import {
  getImagenesByProducto,
  createProductoImagen,
} from "../controllers/productoImagen.controller.js";

const router = Router();

router.get(
  "/productos/:productoId/imagenes",
  getImagenesByProducto
);

router.post(
  "/productos/:productoId/imagenes",
  uploadProductoImagen.array("imagenes", 5),
  createProductoImagen
);

export default router;