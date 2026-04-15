import React from 'react'

function stock() {
  return (
    <div><div className="text-right">
                <p className="text-[10px] text-[#5a766c] uppercase tracking-widest font-bold">
                  Disponibilidad
                </p>
                <p
                  className={`text-sm font-serif ${producto.stock < 5 && producto.stock > 0 ? "text-red-700 animate-pulse" : "text-[#3e5c4d]"}`}
                >
                  {producto.stock === 0
                    ? "Agotado"
                    : producto.stock < 5
                      ? `¡Últimas ${producto.stock} piezas!`
                      : `${producto.stock} unidades`}
                </p>
              </div></div>
  )
}

export default stock