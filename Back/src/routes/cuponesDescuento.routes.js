import { Router } from "express";
import {
  createCupon,
  getCuponesDescuento,
  getCuponDescuentoById, 
  updateCupon,
  deleteCupon, 
  validarCupon
} from "../controllers/cuponesDescuento.controller.js";



const router = Router();

router.get("/", getCuponesDescuento);
router.get("/validar/:codigoCupon", validarCupon);
router.get("/:id", getCuponDescuentoById);
router.post("/", createCupon);
router.patch("/:id", updateCupon);
router.delete("/:id", deleteCupon);



export default router;