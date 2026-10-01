import logo from "../assets/sos-sorocaba-logo.png";
import { NavLink } from "react-router-dom";
import { BarChart3, Map, Search, UserPlus, LogOut, ChevronDown, HeartHandshake } from "lucide-react";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `side-link ${isActive ? "active" : ""}`;

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <img src={logo} alt="SOS Sorocaba" />
        </div>
        <div>
          <strong>SOS</strong>
          <span>Sorocaba</span>
        </div>
      </div>

      <div className="workspace">
        <small>ORGANIZAÇÃO</small>
        <strong>SOS Sorocaba</strong>
        <span>Gestão social</span>
      </div>

      <nav>
        <NavLink to="/dashboard" className={linkClass}>
          <BarChart3 size={19} /> Visão Geral
        </NavLink>

        <div className="nav-section">
          <div className="nav-title">MORADORES <ChevronDown size={15} /></div>
          <NavLink to="/cadastro" className={linkClass}>
            <UserPlus size={18} /> Cadastrar morador
          </NavLink>
          <NavLink to="/pesquisa" className={linkClass}>
            <Search size={18} /> Pesquisar moradores
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-title">MAPA <ChevronDown size={15} /></div>
          <NavLink to="/mapa" className={linkClass}>
            <Map size={18} /> Mapa de calor
          </NavLink>
        </div>
      </nav>

      <div className="sidebar-bottom">
        <div className="user-mini">
          <div className="avatar">A</div>
          <div><strong>Administrador</strong><span>SOS Sorocaba</span></div>
        </div>
        <NavLink to="/login" className="logout"><LogOut size={18} /> Sair</NavLink>
      </div>
    </aside>
  );
}