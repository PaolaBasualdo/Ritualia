import { Router } from "express";
import {
  getVariantesByProducto
} from "../controllers/variantes.controllers.js";

const router = Router();

router.get("/productos/:productoId/variantes", getVariantesByProducto);


export default router;