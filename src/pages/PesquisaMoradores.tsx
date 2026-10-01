import { useMemo, useState } from "react";
import { Search, Eye, SlidersHorizontal } from "lucide-react";
import { moradores } from "../data/moradores";
import { useNavigate } from "react-router-dom";

export default function PesquisaMoradores() {
  const [query, setQuery] = useState("");
  const [situacao, setSituacao] = useState("Todas");
  const navigate = useNavigate();

  const results = useMemo(() => moradores.filter(m => {
    const q = query.toLowerCase();
    const matchesText = m.nome.toLowerCase().includes(q) || m.documento.includes(q);
    const matchesStatus = situacao === "Todas" || m.situacao === situacao;
    return matchesText && matchesStatus;
  }), [query, situacao]);

  return (
    <>
      <div className="page-heading"><div><span className="eyebrow">MORADORES</span><h1>Pesquisa de moradores</h1><p>Consulte os registros cadastrados.</p></div></div>

      <section className="panel">
        <div className="panel-heading"><div><h2>Localizar morador</h2><p>Pesquise por nome ou documento.</p></div></div>
        <div className="filters">
          <div className="search-input"><Search size={19}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Nome ou documento..." /></div>
          <select value={situacao} onChange={e => setSituacao(e.target.value)}><option>Todas</option><option>Abrigado</option><option>Na rua</option></select>
          <button className="filter-btn"><SlidersHorizontal size={18}/> Filtros</button>
        </div>

        <div className="results-count">{results.length} resultado(s)</div>
        <div className="table-wrap">
          <table><thead><tr><th>Nome</th><th>Documento</th><th>Data do cadastro</th><th>Situação</th><th>Abrigo</th><th>Ação</th></tr></thead>
          <tbody>{results.map(m => <tr key={m.id}><td><strong>{m.nome}</strong></td><td>{m.documento}</td><td>{m.dataCadastro}</td><td><span className={`tag ${m.situacao === "Abrigado" ? "green" : "orange"}`}>{m.situacao}</span></td><td>{m.abrigo || "—"}</td><td><button className="table-action" onClick={() => navigate(`/morador/${m.id}`)}><Eye size={17}/> Visualizar</button></td></tr>)}</tbody></table>
        </div>
      </section>
    </>
  );
}