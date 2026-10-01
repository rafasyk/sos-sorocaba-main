import { Users, House, MapPin, BedDouble, UserPlus, AlertTriangle } from "lucide-react";
import StatCard from "../components/StatCard";
import { dashboard, abrigos } from "../data/dashboard";
import { moradores } from "../data/moradores";

export default function Dashboard() {
  return (
    <>
      <div className="page-heading">
        <div><span className="eyebrow">SOS SOROCABA</span><h1>Painel de Controle</h1><p>Visão geral da operação social e dos moradores cadastrados.</p></div>
        <div className="update">ÚLTIMA ATUALIZAÇÃO<strong>20:28</strong><button>↻ Atualizar</button></div>
      </div>

      <div className="notice"><AlertTriangle size={18} /> Dados demonstrativos para apresentação do protótipo.</div>

      <div className="stats-grid">
        <StatCard label="Moradores cadastrados" value={dashboard.moradores.toLocaleString("pt-BR")} description="Total registrado no sistema" icon={<Users />} />
        <StatCard label="Moradores abrigados" value={dashboard.abrigados} description="Atualmente em acolhimento" icon={<House />} tone="green" />
        <StatCard label="Em situação de rua" value={dashboard.naRua} description="Sem abrigo registrado" icon={<MapPin />} tone="orange" />
        <StatCard label="Ocupação dos abrigos" value={`${dashboard.ocupacao}%`} description={`${dashboard.vagas} vagas disponíveis`} icon={<BedDouble />} tone="pink" />
      </div>

      <section className="panel">
        <div className="panel-heading"><div><h2>Resumo operacional</h2><p>Indicadores gerais do atendimento.</p></div><span className="live">● Leitura demonstrativa</span></div>
        <div className="pipeline">
          <div><UserPlus size={22}/><strong>{dashboard.cadastrosMes}</strong><span>Cadastros no mês</span></div>
          <div><Users size={22}/><strong>{dashboard.moradores}</strong><span>Total cadastrados</span></div>
          <div><House size={22}/><strong>{dashboard.abrigados}</strong><span>Abrigados</span></div>
          <div><MapPin size={22}/><strong>{dashboard.naRua}</strong><span>Na rua</span></div>
          <div><BedDouble size={22}/><strong>{dashboard.vagas}</strong><span>Vagas livres</span></div>
        </div>
      </section>

      <div className="two-columns">
        <section className="panel">
          <div className="panel-heading"><div><h2>Ocupação dos abrigos</h2><p>Capacidade e ocupação atual.</p></div></div>
          <div className="shelters">
            {abrigos.map(a => <div className="shelter" key={a.nome}><div className="shelter-line"><strong>{a.nome}</strong><span>{a.ocupacao}%</span></div><div className="progress"><i style={{width: `${a.ocupacao}%`}} /></div><small>{a.moradores} de {a.capacidade} vagas ocupadas</small></div>)}
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading"><div><h2>Últimos cadastros</h2><p>Registros recentes.</p></div></div>
          <div className="mini-list">
            {moradores.slice(0, 5).map(m => <div className="mini-row" key={m.id}><div className="avatar small">{m.nome[0]}</div><div><strong>{m.nome}</strong><span>{m.dataCadastro}</span></div><b className={m.situacao === "Abrigado" ? "tag green" : "tag orange"}>{m.situacao}</b></div>)}
          </div>
        </section>
      </div>
    </>
  );
}