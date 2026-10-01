import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CadastroMorador from "./pages/CadastroMorador";
import PesquisaMoradores from "./pages/PesquisaMoradores";
import PerfilMorador from "./pages/PerfilMorador";
import Mapa from "./pages/Mapa";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cadastro" element={<CadastroMorador />} />
          <Route path="/pesquisa" element={<PesquisaMoradores />} />
          <Route path="/morador/:id" element={<PerfilMorador />} />
          <Route path="/mapa" element={<Mapa />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}