//import './App.css'
import { Routes, Route } from "react-router-dom";
import HeaderPage from "./components/HeaderPage";
import FooterPage from "./components/FooterPage";
import HomePage from "./pages/HomePage";
import Productos from "./pages/Productos";
import ProductoDetalle from "./components/ProductoDetalle"
import Categorias from "./pages/Categorias";
import Contacto from "./pages/ContactoPage";
import CategoriaDetalle from "./components/CategoriaDetalle";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <>
    <HeaderPage/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/productos/:id" element={<ProductoDetalle />} />
      <Route path="/categorias" element={<Categorias />} />
      <Route path="/categorias/:id" element={<CategoriaDetalle />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
    <FooterPage/>
    </>
  );
}

export default App;

