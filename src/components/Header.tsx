import { CircleHelp, Search, Bell, UserRound, Menu, X } from "lucide-react";

type HeaderProps = {
  onMenuClick?: () => void;
  menuOpen?: boolean;
};

export default function Header({ onMenuClick, menuOpen = false }: HeaderProps) {
  return (
    <header className="topbar">
      <button
        type="button"
        className="icon-btn menu-btn"
        onClick={onMenuClick}
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div className="top-search">
        <Search size={19} />
        <span>Buscar morador, documento...</span>
      </div>
      <div className="top-actions">
        <div className="status"><i /> Sistema ativo</div>
        <button className="icon-btn help-btn"><CircleHelp size={19} /></button>
        <button className="icon-btn"><Bell size={19} /></button>
        <div className="profile">
          <div className="profile-icon"><UserRound size={18} /></div>
          <div><strong>Administrador</strong><span>SOS Sorocaba</span></div>
        </div>
      </div>
    </header>
  );
}
