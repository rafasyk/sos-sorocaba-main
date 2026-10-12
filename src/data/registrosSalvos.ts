import { proximoId, type RegistrosSalvos } from "../utils/registro";

// Guarda no navegador (localStorage) o que foi lançado na tela "Registro diário".
// É só do protótipo: quando o backend estiver pronto, estas funções passam a
// chamar a API (POST /atendimento-providencias e POST /ocorrencias).

const CHAVE = "sos-registros-diarios";

const VAZIO: RegistrosSalvos = { providencias: [], ocorrencias: [] };

export function lerRegistrosSalvos(): RegistrosSalvos {
  try {
    const texto = localStorage.getItem(CHAVE);
    if (!texto) return VAZIO;
    const dados = JSON.parse(texto) as Partial<RegistrosSalvos>;
    return {
      providencias: Array.isArray(dados.providencias) ? dados.providencias : [],
      ocorrencias: Array.isArray(dados.ocorrencias) ? dados.ocorrencias : []
    };
  } catch {
    return VAZIO;
  }
}

function gravar(dados: RegistrosSalvos): boolean {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(dados));
    return true;
  } catch {
    return false;
  }
}

/** Adiciona registros novos. Devolve false se o navegador não deixou gravar. */
export function adicionarRegistros(novos: RegistrosSalvos): boolean {
  const atuais = lerRegistrosSalvos();
  return gravar({
    providencias: [...atuais.providencias, ...novos.providencias],
    ocorrencias: [...atuais.ocorrencias, ...novos.ocorrencias]
  });
}

export function removerProvidencia(id: number): boolean {
  const atuais = lerRegistrosSalvos();
  return gravar({ ...atuais, providencias: atuais.providencias.filter(r => r.id !== id) });
}

export function removerOcorrencia(id: number): boolean {
  const atuais = lerRegistrosSalvos();
  return gravar({ ...atuais, ocorrencias: atuais.ocorrencias.filter(o => o.id !== id) });
}

export function proximoIdSalvo(): number {
  return proximoId(lerRegistrosSalvos());
}
