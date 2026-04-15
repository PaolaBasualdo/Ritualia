import { useContext } from "react";
import { CuponDescuentoContext } from "../contexts/cuponDescuento.context";

const Precio = ({ producto }) => {
  const { cupon } = useContext(CuponDescuentoContext);

  const tieneDescuento = producto.descuento > 0;

  let precioFinal = producto.precio;

  const porcentaje = cupon?.porcentajeDescuento || 0;

  const hayDescuentos = porcentaje > 0 || tieneDescuento;

  const precioDescuento =
    producto.precio - (producto.precio * producto.descuento) / 100;

  const precioDescuentoCupon =
    producto.precio - (producto.precio * porcentaje) / 100;

  if (porcentaje > 0) {
    precioFinal = precioDescuentoCupon;
  } else if (tieneDescuento) {
    precioFinal = precioDescuento;
  }

  return (
    <div>
      {hayDescuentos ? (
        <div className="flex items-baseline gap-3 mb-4 font-serif">
          {/* Precio original tachado */}
          <p className="text-[#b89e6e] font-bold text-xl line-through opacity-70">
            ${Number(producto.precio).toLocaleString("es-AR")}
          </p>

          {/* Precio con descuento: más chico y rojo */}
          <p className="text-red-600 font-bold text-base">
            ${Number(precioFinal).toLocaleString("es-AR")}
          </p>
        </div>
      ) : (
        <p className="text-[#b89e6e] font-bold text-xl mb-4 font-serif">
          ${Number(producto.precio).toLocaleString("es-AR")}
        </p>
      )}
    </div>
  );
};

export default Precio;
