import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //Crea la carpeta si no existe. Indica dónde guardar el archivo físicamente.
    const dir = "uploads/categorias";
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    //Genera un nombre basado en timestamp.Ese nombre es el que termina en req.file.filename.
    cb(null, `${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  //Permite solo archivos cuyo mimetype empiece con image/.
  else cb(new Error("Solo imágenes"), false);
};

export const uploadCategoriaImagen = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
