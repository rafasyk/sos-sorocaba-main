import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { VERSAO_TERMO_LGPD, termoLgpd } from "../data/termoLgpd";

type Props = {
  aberto: boolean;
  onFechar: () => void;
};

export default function TermoLgpdModal({ aberto, onFechar }: Props) {
  const botaoFechar = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;
    botaoFechar.current?.focus();

    const aoApertar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFechar();
    };
    document.addEventListener("keydown", aoApertar);
    return () => document.removeEventListener("keydown", aoApertar);
  }, [aberto, onFechar]);

  if (!aberto) return null;

  return (
    <div className="modal-fundo" onClick={onFechar}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="termo-titulo"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-topo">
          <div>
            <h2 id="termo-titulo">Termo de autorização de uso de dados</h2>
            <small>LGPD (Lei nº 13.709/2018) · versão {VERSAO_TERMO_LGPD}</small>
          </div>
          <button type="button" className="icon-btn" ref={botaoFechar} onClick={onFechar} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>

        <div className="modal-corpo">
          {termoLgpd.map(secao => (
            <section key={secao.titulo}>
              <h3>{secao.titulo}</h3>
              {secao.paragrafos.map(p => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        <div className="modal-rodape">
          <button type="button" className="primary-btn" onClick={onFechar}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
