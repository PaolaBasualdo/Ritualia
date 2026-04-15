import Categoria from "./Categoria.js";
import Producto from "./Producto.js";
import ProductoImagen from "./ProductoImagen.js";
import Mensaje from "./Mensaje.js";
import Variante from "./Variante.js"
import CuponDescuento from "./CuponDescuento.js"

/* Asociaciones mínimas */
Categoria.hasMany(Producto, { foreignKey: "idCategoria" });
Producto.belongsTo(Categoria, { foreignKey: "idCategoria" });

Producto.hasMany(ProductoImagen, { foreignKey: "idProducto" });
ProductoImagen.belongsTo(Producto, { foreignKey: "idProducto" });

Producto.hasMany(Mensaje, { foreignKey: "productoId" });
Mensaje.belongsTo(Producto, { foreignKey: "productoId" });

Producto.hasMany(Variante, { foreignKey: "productoId" });
Variante.belongsTo(Producto, { foreignKey: "productoId" });


export {
  Categoria,
  Producto,
  ProductoImagen,
  Mensaje,
  Variante,
  CuponDescuento, 
};