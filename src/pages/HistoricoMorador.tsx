import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  Clock,
  Hourglass,
  LogIn,
  Palette,
  Repeat,
  Utensils
} from "lucide-react";
import StatCard from "../components/StatCard";
import { moradores } from "../data/moradores";
import {
  DATA_REFERENCIA,
  atendimentos,
  ocorrencias,
  registrosProvidencia,
  tiposProvidencia
} from "../data/historico";
import { formatarData, formatarDuracao } from "../utils/datas";
import {
  agruparOcorrencias,
  calcularAtendimentos,
  calcularFrequencias,
  resumirAtendimentos
} from "../utils/historico";
import type { Gravidade } from "../types/historico";

type Aba = "atendimentos" | "providencias" | "ocorrencias";

const corGravidade: Record<Gravidade, string> = {
  Leve: "gray",
  Moderada: "orange",
  Grave: "red"
};

export default function HistoricoMorador() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aba, setAba] = useState<Aba>("atendimentos");

  const moradorId = Number(id);
  const morador = moradores.find(m => m.id === moradorId);

  const linhasAtendimento = useMemo(
    () =>
      calcularAtendimentos(
        atendimentos.filter(a => a.moradorId === moradorId),
        DATA_REFERENCIA
      ),
    [moradorId]
  );
  const resumo = useMemo(() => resumirAtendimentos(linhasAtendimento), [linhasAtendimento]);

  const frequencias = useMemo(
    () => calcularFrequencias(tiposProvidencia, registrosProvidencia, moradorId, DATA_REFERENCIA),
    [moradorId]
  );
  const consumo = frequencias.filter(f => f.tipo.categoria === "consumo");
  const atividades = frequencias.filter(f => f.tipo.categoria === "atividade");

  const ocorrenciasDoMorador = useMemo(
    () =>
      ocorrencias
        .filter(o => o.moradorId === moradorId)
        .sort((a, b) => b.data.localeCompare(a.data)),
    [moradorId]
  );
  const grupos = useMemo(() => agruparOcorrencias(ocorrenciasDoMorador), [ocorrenciasDoMorador]);
  const reincidentes = grupos.filter(g => g.reincidente);
  const tiposReincidentes = new Set(reincidentes.map(g => g.tipo));

  if (!morador) {
    return <div className="empty-state">Morador não encontrado.</div>;
  }

  const abas: { chave: Aba; titulo: string; total: number }[] = [
    { chave: "atendimentos", titulo: "Atendimentos", total: linhasAtendimento.length },
    { chave: "providencias", titulo: "Providências e atividades", total: frequencias.length },
    { chave: "ocorrencias", titulo: "Ocorrências", total: ocorrenciasDoMorador.length }
  ];

  return (
    <>
      <button className="back-btn" onClick={() => navigate(`/morador/${morador.id}`)}>
        <ArrowLeft size={18} />
        Voltar para o perfil
      </button>

      <div className="page-heading">
        <div>
          <span className="eyebrow">MORADORES / HISTÓRICO</span>
          <h1>{morador.nome}</h1>
          <p>Atendimentos, providências, atividades e ocorrências do morador.</p>
        </div>

        <span className={`tag big ${morador.situacao === "Abrigado" ? "green" : "orange"}`}>
          {morador.situacao}
        </span>
      </div>

      <div className="notice">
        <AlertTriangle size={18} />
        Dados fictícios para o protótipo. Cálculos com base em {formatarData(DATA_REFERENCIA)}.
      </div>

      <div className="tabs" role="tablist" aria-label="Seções do histórico">
        {abas.map(item => (
          <button
            key={item.chave}
            type="button"
            role="tab"
            id={`aba-${item.chave}`}
            aria-selected={aba === item.chave}
            aria-controls={`painel-${item.chave}`}
            className={`tab ${aba === item.chave ? "active" : ""}`}
            onClick={() => setAba(item.chave)}
          >
            {item.titulo}
            <span className="tab-count">{item.total}</span>
          </button>
        ))}
      </div>

      {/* ---------------- ATENDIMENTOS ---------------- */}
      {aba === "atendimentos" && (
        <div role="tabpanel" id="painel-atendimentos" aria-labelledby="aba-atendimentos">
          <div className="stats-grid">
            <StatCard
              label="Entradas na ONG"
              value={resumo.entradas}
              description="Quantas vezes o morador entrou"
              icon={<LogIn />}
            />
            <StatCard
              label="Tempo total na ONG"
              value={formatarDuracao(resumo.totalPermanenciaDias)}
              description="Soma de todas as permanências"
              icon={<Clock />}
              tone="green"
            />
            <StatCard
              label="Permanência média"
              value={resumo.entradas ? formatarDuracao(resumo.mediaPermanenciaDias) : "—"}
              description="Média por entrada"
              icon={<Hourglass />}
              tone="orange"
            />
            <StatCard
              label="Ausência média"
              value={
                resumo.mediaAusenciaDias === null ? "—" : formatarDuracao(resumo.mediaAusenciaDias)
              }
              description={
                resumo.ausenciaAtualDias === null
                  ? "Tempo fora entre uma entrada e outra"
                  : `Fora há ${formatarDuracao(resumo.ausenciaAtualDias)}`
              }
              icon={<Repeat />}
              tone="pink"
            />
          </div>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2>Entradas e saídas</h2>
                <p>Cada entrada do morador, com o tempo de permanência e o tempo fora depois da saída.</p>
              </div>
            </div>

            {linhasAtendimento.length === 0 ? (
              <div className="empty-inline">Nenhum atendimento registrado.</div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Nº</th>
                      <th>ENTRADA</th>
                      <th>SAÍDA</th>
                      <th>PERMANÊNCIA</th>
                      <th>AUSÊNCIA APÓS SAIR</th>
                      <th>ABRIGO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {linhasAtendimento.map((linha, indice) => (
                      <tr key={linha.id}>
                        <td>{indice + 1}</td>
                        <td><strong>{formatarData(linha.entrada)}</strong></td>
                        <td>
                          {linha.saida ? (
                            formatarData(linha.saida)
                          ) : (
                            <span className="tag green">No abrigo</span>
                          )}
                        </td>
                        <td>
                          {formatarDuracao(linha.permanenciaDias)}
                          {linha.emAndamento && " (até hoje)"}
                        </td>
                        <td>
                          {linha.ausenciaDias === null ? (
                            "—"
                          ) : linha.ausenciaEmAndamento ? (
                            <>
                              {formatarDuracao(linha.ausenciaDias)}{" "}
                              <span className="tag orange">ainda fora</span>
                            </>
                          ) : (
                            formatarDuracao(linha.ausenciaDias)
                          )}
                        </td>
                        <td>{linha.abrigo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      )}

      {/* ---------------- PROVIDÊNCIAS E ATIVIDADES ---------------- */}
      {aba === "providencias" && (
        <div role="tabpanel" id="painel-providencias" aria-labelledby="aba-providencias">
          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2><Utensils size={19} /> Itens consumidos</h2>
                <p>O que o morador recebeu dentro da ONG.</p>
              </div>
            </div>
            <div className="table-wrap">
              <table className="table-compact">
                <thead>
                  <tr>
                    <th>ITEM</th>
                    <th>HOJE</th>
                    <th>ÚLTIMOS 7 DIAS</th>
                    <th>ÚLTIMOS 28 DIAS</th>
                  </tr>
                </thead>
                <tbody>
                  {consumo.map(linha => (
                    <tr key={linha.tipo.id}>
                      <td><strong>{linha.tipo.descricao}</strong></td>
                      <td>{linha.hoje}</td>
                      <td>{linha.ultimos7}</td>
                      <td>{linha.ultimos28}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2><Palette size={19} /> Atividades recreativas</h2>
                <p>Quantas vezes o morador pratica e quantos moradores participam de cada atividade.</p>
              </div>
            </div>
            <div className="table-wrap">
              <table className="table-compact">
                <thead>
                  <tr>
                    <th>ATIVIDADE</th>
                    <th>HOJE</th>
                    <th>ÚLTIMOS 7 DIAS</th>
                    <th>MÉDIA POR SEMANA</th>
                    <th>MORADORES QUE PRATICAM</th>
                  </tr>
                </thead>
                <tbody>
                  {atividades.map(linha => {
                    const percentual = Math.round(
                      (linha.moradoresPraticantes / moradores.length) * 100
                    );

                    return (
                      <tr key={linha.tipo.id}>
                        <td><strong>{linha.tipo.descricao}</strong></td>
                        <td>{linha.hoje}</td>
                        <td>{linha.ultimos7}</td>
                        <td>{(linha.ultimos28 / 4).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}</td>
                        <td>
                          <div className="participacao">
                            <span>
                              {linha.moradoresPraticantes} de {moradores.length}
                            </span>
                            <div className="progress">
                              <i style={{ width: `${percentual}%` }} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="table-note">
              Média por semana = total dos últimos 28 dias dividido por 4. A coluna de moradores
              considera todos os moradores que praticaram a atividade nos últimos 28 dias.
            </p>
          </section>
        </div>
      )}

      {/* ---------------- OCORRÊNCIAS ---------------- */}
      {aba === "ocorrencias" && (
        <div role="tabpanel" id="painel-ocorrencias" aria-labelledby="aba-ocorrencias">
          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2><Repeat size={19} /> Reincidências</h2>
                <p>Tipos de ocorrência que se repetiram (2 vezes ou mais).</p>
              </div>
              <span className={`tag ${reincidentes.length ? "red" : "green"}`}>
                {reincidentes.length} {reincidentes.length === 1 ? "tipo" : "tipos"}
              </span>
            </div>

            {reincidentes.length === 0 ? (
              <div className="empty-inline">Nenhuma reincidência registrada.</div>
            ) : (
              <div className="reincidencias">
                {reincidentes.map(grupo => (
                  <div className="reincidencia" key={grupo.tipo}>
                    <div className="reincidencia-topo">
                      <strong>{grupo.tipo}</strong>
                      <span className={`tag ${corGravidade[grupo.gravidadeMaxima]}`}>
                        {grupo.gravidadeMaxima}
                      </span>
                    </div>
                    <span className="reincidencia-total">{grupo.total} ocorrências</span>
                    <small>
                      De {formatarData(grupo.primeira)} até {formatarData(grupo.ultima)}
                    </small>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2>Todas as ocorrências</h2>
                <p>Da mais recente para a mais antiga.</p>
              </div>
            </div>

            {ocorrenciasDoMorador.length === 0 ? (
              <div className="empty-inline">Nenhuma ocorrência registrada.</div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>DATA</th>
                      <th>TIPO</th>
                      <th>GRAVIDADE</th>
                      <th>DESCRIÇÃO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ocorrenciasDoMorador.map(o => (
                      <tr key={o.id}>
                        <td><strong>{formatarData(o.data)}</strong></td>
                        <td>
                          {o.tipo}{" "}
                          {tiposReincidentes.has(o.tipo) && <span className="tag red">reincidente</span>}
                        </td>
                        <td><span className={`tag ${corGravidade[o.gravidade]}`}>{o.gravidade}</span></td>
                        <td>{o.descricao}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
