import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const productoId = req.params.productoId || "general";
    const dir = `uploads/productos/${productoId}`;

    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Solo imágenes"), false);
};

export const uploadProductoImagen = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});