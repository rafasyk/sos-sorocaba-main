import logo from "../assets/sos-sorocaba-logo.png";
import { LockKeyhole, Mail, Eye, HeartHandshake } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <section className="login-brand-panel">
        <div className="decor decor-one" />
        <div className="decor decor-two" />
        <div className="login-logo">
          <img src={logo} alt="SOS Sorocaba" />
        </div>
        <div className="login-caption">
          <div />
          <span>SISTEMA DE GESTÃO SOCIAL</span>
        </div>
      </section>

      <section className="login-form-panel">
        <div className="login-form">
          <div className="login-lock"><LockKeyhole size={22} /></div>
          <h1>Acesse sua conta</h1>
          <p>Utilize suas credenciais para continuar.</p>

          <label>E-mail</label>
          <div className="input-wrap"><Mail size={19} /><input placeholder="seu@email.com" /></div>

          <label>Senha</label>
          <div className="input-wrap"><LockKeyhole size={19} /><input type="password" placeholder="••••••••" /><Eye size={19} /></div>

          <button className="primary-btn login-btn" onClick={() => navigate("/dashboard")}>Entrar</button>
        </div>
        <footer>Powered by <strong>SOS Sorocaba</strong></footer>
      </section>
    </div>
  );
}