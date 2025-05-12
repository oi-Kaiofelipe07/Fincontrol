import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TransacoesPage from "./pages/TransacoesPage";
import Layout from "./components/Layout";
import CategoriasPage from "./pages/CategoriasPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transacoes" element={<TransacoesPage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
      </Route>
    </Routes>
  );
}

export default App;
