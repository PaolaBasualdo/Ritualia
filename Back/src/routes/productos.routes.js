import { Router } from "express";
import {
  getProductos,
  getProductoById,
  createProducto,
} from "../controllers/productos.controller.js";

const router = Router();

router.get("/", getProductos);
router.get("/:id", getProductoById);
router.post("/", createProducto);

export default router;