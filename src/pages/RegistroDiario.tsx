import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { AlertTriangle, CheckCircle2, Palette, Trash2, Utensils } from "lucide-react";
import { moradores } from "../data/moradores";
import { tiposOcorrencia, tiposProvidencia } from "../data/historico";
import {
  adicionarRegistros,
  lerRegistrosSalvos,
  proximoIdSalvo,
  removerOcorrencia,
  removerProvidencia
} from "../data/registrosSalvos";
import { formatarData, hojeISO } from "../utils/datas";
import { montarRegistros, validarRegistro } from "../utils/registro";
import type { FormularioRegistro } from "../utils/registro";
import type { Gravidade } from "../types/historico";

const gravidades: Gravidade[] = ["Leve", "Moderada", "Grave"];
const corGravidade: Record<Gravidade, string> = { Leve: "gray", Moderada: "orange", Grave: "red" };

const consumo = tiposProvidencia.filter(t => t.categoria === "consumo");
const atividades = tiposProvidencia.filter(t => t.categoria === "atividade");

function formularioVazio(data: string): FormularioRegistro {
  return {
    moradorId: null,
    data,
    itens: {},
    ocorrencia: { registrar: false, tipo: tiposOcorrencia[0], gravidade: "Leve", descricao: "" },
    observacao: ""
  };
}

export default function RegistroDiario() {
  const hoje = hojeISO();
  const [form, setForm] = useState<FormularioRegistro>(() => formularioVazio(hoje));
  const [erros, setErros] = useState<string[]>([]);
  const [sucesso, setSucesso] = useState("");
  const [salvos, setSalvos] = useState(lerRegistrosSalvos);

  const nomeDoMorador = (id: number) => moradores.find(m => m.id === id)?.nome ?? `Morador ${id}`;
  const nomeDoTipo = (id: number) => tiposProvidencia.find(t => t.id === id)?.descricao ?? "Item";

  // Lançamentos do dia escolhido (os mais recentes primeiro)
  const doDia = useMemo(
    () => ({
      providencias: salvos.providencias.filter(r => r.data === form.data).sort((a, b) => b.id - a.id),
      ocorrencias: salvos.ocorrencias.filter(o => o.data === form.data).sort((a, b) => b.id - a.id)
    }),
    [salvos, form.data]
  );

  function alternarItem(tipoId: number, marcado: boolean) {
    setForm(atual => {
      const itens = { ...atual.itens };
      if (marcado) itens[tipoId] = 1;
      else delete itens[tipoId];
      return { ...atual, itens };
    });
  }

  function mudarQuantidade(tipoId: number, texto: string) {
    setForm(atual => ({ ...atual, itens: { ...atual.itens, [tipoId]: Number(texto) } }));
  }

  function salvar(evento: FormEvent) {
    evento.preventDefault();
    setSucesso("");

    const problemas = validarRegistro(form, hoje);
    setErros(problemas);
    if (problemas.length > 0) return;

    const novos = montarRegistros(form, proximoIdSalvo());
    if (!adicionarRegistros(novos)) {
      setErros(["Não foi possível salvar neste navegador (armazenamento bloqueado ou cheio)."]);
      return;
    }

    setSalvos(lerRegistrosSalvos());
    setSucesso(
      `Registro de ${nomeDoMorador(form.moradorId as number)} salvo em ${formatarData(form.data)}.`
    );
    // mantém a data para facilitar lançar o próximo morador do mesmo dia
    setForm(formularioVazio(form.data));
  }

  function apagarProvidencia(id: number) {
    removerProvidencia(id);
    setSalvos(lerRegistrosSalvos());
  }

  function apagarOcorrencia(id: number) {
    removerOcorrencia(id);
    setSalvos(lerRegistrosSalvos());
  }

  function linhaItem(tipo: { id: number; descricao: string }) {
    const marcado = tipo.id in form.itens;
    return (
      <div className={`item-linha ${marcado ? "marcado" : ""}`} key={tipo.id}>
        <label>
          <input
            type="checkbox"
            checked={marcado}
            onChange={e => alternarItem(tipo.id, e.target.checked)}
          />
          {tipo.descricao}
        </label>
        {marcado && (
          <input
            type="number"
            min={1}
            step={1}
            className="item-qtd"
            aria-label={`Quantidade de ${tipo.descricao}`}
            value={form.itens[tipo.id]}
            onChange={e => mudarQuantidade(tipo.id, e.target.value)}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">MORADORES / REGISTRO</span>
          <h1>Registro diário</h1>
          <p>Lance o que o morador usou do abrigo, as atividades que fez e as ocorrências do dia.</p>
        </div>
      </div>

      <div className="notice">
        <AlertTriangle size={18} />
        Protótipo: os registros ficam salvos só neste navegador e já aparecem no histórico do morador.
      </div>

      <form className="panel form-panel" onSubmit={salvar} noValidate>
        <div className="form-section-title">1. Quem e quando</div>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="rd-morador">Morador</label>
            <select
              id="rd-morador"
              value={form.moradorId ?? ""}
              onChange={e =>
                setForm({ ...form, moradorId: e.target.value ? Number(e.target.value) : null })
              }
            >
              <option value="">Selecione...</option>
              {moradores.map(m => (
                <option key={m.id} value={m.id}>
                  {m.nome} ({m.situacao})
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="rd-data">Dia</label>
            <input
              id="rd-data"
              type="date"
              max={hoje}
              value={form.data}
              onChange={e => setForm({ ...form, data: e.target.value })}
            />
          </div>
        </div>

        <div className="form-section-title"><Utensils size={17} /> 2. Itens do abrigo usados</div>
        <div className="item-lista">{consumo.map(linhaItem)}</div>

        <div className="form-section-title"><Palette size={17} /> 3. Atividades realizadas</div>
        <div className="item-lista">{atividades.map(linhaItem)}</div>

        <div className="form-section-title"><AlertTriangle size={17} /> 4. Ocorrência</div>
        <div className="form-grid">
          <div className="field full">
            <div className="item-linha">
              <label>
                <input
                  type="checkbox"
                  checked={form.ocorrencia.registrar}
                  onChange={e =>
                    setForm({ ...form, ocorrencia: { ...form.ocorrencia, registrar: e.target.checked } })
                  }
                />
                Houve uma ocorrência neste dia
              </label>
            </div>
          </div>

          {form.ocorrencia.registrar && (
            <>
              <div className="field">
                <label htmlFor="rd-tipo-oc">Tipo</label>
                <select
                  id="rd-tipo-oc"
                  value={form.ocorrencia.tipo}
                  onChange={e => setForm({ ...form, ocorrencia: { ...form.ocorrencia, tipo: e.target.value } })}
                >
                  {tiposOcorrencia.map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="rd-grav">Gravidade</label>
                <select
                  id="rd-grav"
                  value={form.ocorrencia.gravidade}
                  onChange={e =>
                    setForm({
                      ...form,
                      ocorrencia: { ...form.ocorrencia, gravidade: e.target.value as Gravidade }
                    })
                  }
                >
                  {gravidades.map(g => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="field full">
                <label htmlFor="rd-desc">O que aconteceu</label>
                <textarea
                  id="rd-desc"
                  rows={3}
                  value={form.ocorrencia.descricao}
                  onChange={e =>
                    setForm({ ...form, ocorrencia: { ...form.ocorrencia, descricao: e.target.value } })
                  }
                />
              </div>
            </>
          )}

          <div className="field full">
            <label htmlFor="rd-obs">Observação (opcional, vale para os itens e atividades)</label>
            <input
              id="rd-obs"
              type="text"
              value={form.observacao}
              onChange={e => setForm({ ...form, observacao: e.target.value })}
            />
          </div>
        </div>

        {erros.length > 0 && (
          <ul className="erro-form" role="alert">
            {erros.map(e => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}

        <div className="form-footer">
          {sucesso && (
            <span className="success-message" role="status">
              <CheckCircle2 size={14} /> {sucesso}
            </span>
          )}
          <button type="submit" className="primary-btn">Salvar registro</button>
        </div>
      </form>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Lançado em {formatarData(form.data)}</h2>
            <p>Registros feitos nesta tela para o dia escolhido.</p>
          </div>
        </div>

        {doDia.providencias.length === 0 && doDia.ocorrencias.length === 0 ? (
          <div className="empty-inline">Nada lançado neste dia ainda.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>MORADOR</th>
                  <th>REGISTRO</th>
                  <th>DETALHE</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {doDia.providencias.map(r => (
                  <tr key={`p${r.id}`}>
                    <td><strong>{nomeDoMorador(r.moradorId)}</strong></td>
                    <td>{nomeDoTipo(r.tipoId)}</td>
                    <td>
                      {r.quantidade}x{r.observacao ? ` — ${r.observacao}` : ""}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label="Apagar registro"
                        onClick={() => apagarProvidencia(r.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {doDia.ocorrencias.map(o => (
                  <tr key={`o${o.id}`}>
                    <td><strong>{nomeDoMorador(o.moradorId)}</strong></td>
                    <td>
                      Ocorrência: {o.tipo}{" "}
                      <span className={`tag ${corGravidade[o.gravidade]}`}>{o.gravidade}</span>
                    </td>
                    <td>{o.descricao}</td>
                    <td>
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label="Apagar ocorrência"
                        onClick={() => apagarOcorrencia(o.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
