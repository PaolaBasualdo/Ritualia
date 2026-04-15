import { createContext, useState } from "react";
import API from "../api";

const CuponDescuentoContext = createContext();

function CuponDescuentoProviderWrapper({ children }) {

  // cupón activo
  const [cupon, setCupon] = useState(null);

  // estado de carga
  const [loading, setLoading] = useState(false);

  // mensaje de error o éxito
  const [mensaje, setMensaje] = useState(null);


  // validar cupón contra el backend
  const validarCupon = async (codigoCupon) => {

    if (!codigoCupon || codigoCupon.trim() === "") {
      setCupon(null);
      setMensaje("Debe ingresar un código de cupón");
      return false;
    }

    try {

      setLoading(true);
      setMensaje(null);

      const codigo = codigoCupon.trim().toUpperCase();

      const response = await API.get(`/cupones/validar/${codigo}`);

      setCupon(response.data);// res.json({
      //nombreCupon: cupon.nombreCupon,
      //codigoCupon: cupon.codigoCupon,
    //porcentajeDescuento: cupon.porcentajeDescuento,
    //});

      setMensaje(
        `Cupón "${response.data.nombreCupon}" (${response.data.porcentajeDescuento}%) aplicado`
      );

      return true;

    } catch (error) {

      setCupon(null);

      setMensaje("Cupón inválido o inactivo");

      return false;

    } finally {

      setLoading(false);

    }
  };


  // quitar cupón manualmente
  const limpiarCupon = () => {

    setCupon(null);

    setMensaje("Cupón eliminado");

  };


  return (
    <CuponDescuentoContext.Provider
      value={{
        cupon,
        loading,
        mensaje,
        validarCupon,
        limpiarCupon,
      }}
    >
      {children}
    </CuponDescuentoContext.Provider>
  );
}


export { CuponDescuentoContext, CuponDescuentoProviderWrapper };