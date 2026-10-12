import type {
  Gravidade,
  Ocorrencia,
  RegistroProvidencia
} from "../types/historico";

// Lógica pura do "Registro diário" (sem React), para ser fácil de testar.

export type FormularioRegistro = {
  moradorId: number | null;
  data: string; // AAAA-MM-DD
  /** tipoId -> quantidade (só os itens/atividades marcados) */
  itens: Record<number, number>;
  ocorrencia: {
    registrar: boolean;
    tipo: string;
    gravidade: Gravidade;
    descricao: string;
  };
  observacao: string;
};

export type RegistrosSalvos = {
  providencias: RegistroProvidencia[];
  ocorrencias: Ocorrencia[];
};

/** Devolve a lista de erros (vazia = formulário válido). */
export function validarRegistro(form: FormularioRegistro, hoje: string): string[] {
  const erros: string[] = [];

  if (form.moradorId === null) erros.push("Escolha o morador.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(form.data)) erros.push("Informe a data.");
  else if (form.data > hoje) erros.push("A data não pode ser no futuro.");

  const quantidades = Object.values(form.itens);
  if (quantidades.some(q => !Number.isInteger(q) || q < 1)) {
    erros.push("A quantidade de cada item marcado deve ser um número inteiro maior que zero.");
  }

  const temItens = quantidades.length > 0;
  const temOcorrencia = form.ocorrencia.registrar;
  if (!temItens && !temOcorrencia) {
    erros.push("Marque pelo menos um item, uma atividade ou registre uma ocorrência.");
  }
  if (temOcorrencia && form.ocorrencia.descricao.trim().length < 3) {
    erros.push("Descreva a ocorrência.");
  }

  return erros;
}

/** Transforma o formulário nos registros que serão guardados. */
export function montarRegistros(
  form: FormularioRegistro,
  proximoId: number
): RegistrosSalvos {
  const moradorId = form.moradorId as number;
  const observacao = form.observacao.trim() || undefined;
  let id = proximoId;

  const providencias: RegistroProvidencia[] = Object.entries(form.itens).map(
    ([tipoId, quantidade]) => ({
      id: id++,
      moradorId,
      tipoId: Number(tipoId),
      data: form.data,
      quantidade,
      observacao
    })
  );

  const ocorrencias: Ocorrencia[] = form.ocorrencia.registrar
    ? [
        {
          id: id++,
          moradorId,
          data: form.data,
          tipo: form.ocorrencia.tipo,
          gravidade: form.ocorrencia.gravidade,
          descricao: form.ocorrencia.descricao.trim()
        }
      ]
    : [];

  return { providencias, ocorrencias };
}

/** Maior id já usado + 1 (ids novos começam em 100000 para não colidir com os de exemplo). */
export function proximoId(salvos: RegistrosSalvos): number {
  const ids = [...salvos.providencias, ...salvos.ocorrencias].map(r => r.id);
  return Math.max(99_999, ...ids) + 1;
}
