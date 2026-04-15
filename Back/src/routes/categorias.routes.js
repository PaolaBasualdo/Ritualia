import { Router } from "express";
import {
  getCategorias,
  getCategoriaById,
  createCategoria,
} from "../controllers/categorias.controller.js";
import { uploadCategoriaImagen } from "../middlewares/uploadCategoria.js";


const router = Router();

router.get("/", getCategorias);
router.get("/:id", getCategoriaById);
//router.post("/", createCategoria);
router.post(
  "/",
  uploadCategoriaImagen.single("imagen"),
  createCategoria
);
export default router;