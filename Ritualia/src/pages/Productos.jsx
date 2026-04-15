import React from 'react'
import FormProducto from "../components/FormProducto";
import ProductoList from '../components/ProductoList';

function Productos() {
  return (
      <> {/*<div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
       <FormProducto />
     </div>*/}
     <div className="min-h-screen bg-[#fdfbf7] py-12 px-6 flex justify-center">
  <ProductoList />
</div>
     </>
   )
}

export default Productos