import { Router } from "express";
import {
  getMensajesByProducto,
  createMensaje,
} from "../controllers/mensajes.controller.js";

const router = Router();

router.get("/productos/:productoId/mensajes", getMensajesByProducto);
router.post("/productos/:productoId/mensajes", createMensaje);

export default router;