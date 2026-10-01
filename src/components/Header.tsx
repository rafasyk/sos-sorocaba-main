import { CircleHelp, Search, Bell, UserRound } from "lucide-react";

export default function Header() {
  return (
    <header className="topbar">
      <div className="top-search">
        <Search size={19} />
        <span>Buscar morador, documento...</span>
      </div>
      <div className="top-actions">
        <div className="status"><i /> Sistema ativo</div>
        <button className="icon-btn"><CircleHelp size={19} /></button>
        <button className="icon-btn"><Bell size={19} /></button>
        <div className="profile">
          <div className="profile-icon"><UserRound size={18} /></div>
          <div><strong>Administrador</strong><span>SOS Sorocaba</span></div>
        </div>
      </div>
    </header>
  );
}