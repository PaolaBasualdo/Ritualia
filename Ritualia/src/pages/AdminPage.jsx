import React from 'react';
import FormCategoria from '../components/FormCategoria';
import FormProducto from '../components/FormProducto';

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-[#fdfbf7] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif text-[#2d4037] text-center mb-10">Panel de Administración</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section className="bg-white p-6 rounded-lg shadow-md border border-[#e0d7c6]">
            <h2 className="text-2xl font-semibold text-[#b89e6e] mb-6 border-b border-[#e0d7c6] pb-2">Añadir Categoría</h2>
            <FormCategoria />
          </section>
          
          <section className="bg-white p-6 rounded-lg shadow-md border border-[#e0d7c6]">
            <h2 className="text-2xl font-semibold text-[#b89e6e] mb-6 border-b border-[#e0d7c6] pb-2">Añadir Producto</h2>
            <FormProducto />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
