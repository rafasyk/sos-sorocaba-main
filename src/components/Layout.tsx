import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // fecha o menu ao trocar de página (importante no celular)
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // fecha o menu com a tecla Esc
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="app-shell">
      <Sidebar open={menuOpen} />
      {menuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className="main-area">
        <Header onMenuClick={() => setMenuOpen(o => !o)} menuOpen={menuOpen} />
        <main className="content"><Outlet /></main>
      </div>
    </div>
  );
}
