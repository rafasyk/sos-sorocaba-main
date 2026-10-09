import type {
  Atendimento,
  Gravidade,
  Ocorrencia,
  RegistroProvidencia,
  TipoProvidencia
} from "../types/historico";
import { adicionarDias, diasEntre } from "./datas";

/* ---------- Atendimentos: entradas, saídas, permanência e ausência ---------- */

export type LinhaAtendimento = Atendimento & {
  emAndamento: boolean; // ainda está no abrigo
  permanenciaDias: number; // da entrada até a saída (ou até hoje)
  ausenciaDias: number | null; // da saída até a próxima entrada (ou até hoje)
  ausenciaEmAndamento: boolean; // saiu e ainda não voltou
};

export function calcularAtendimentos(lista: Atendimento[], hoje: string): LinhaAtendimento[] {
  const ordenada = [...lista].sort((a, b) => a.entrada.localeCompare(b.entrada));

  return ordenada.map((atendimento, indice) => {
    const proximo = ordenada[indice + 1];
    const emAndamento = atendimento.saida === null;
    const fim = atendimento.saida ?? hoje;

    let ausenciaDias: number | null = null;
    let ausenciaEmAndamento = false;

    if (atendimento.saida !== null) {
      if (proximo) {
        ausenciaDias = diasEntre(atendimento.saida, proximo.entrada);
      } else {
        ausenciaDias = diasEntre(atendimento.saida, hoje);
        ausenciaEmAndamento = true;
      }
    }

    return {
      ...atendimento,
      emAndamento,
      permanenciaDias: diasEntre(atendimento.entrada, fim),
      ausenciaDias,
      ausenciaEmAndamento
    };
  });
}

export type ResumoAtendimentos = {
  entradas: number;
  totalPermanenciaDias: number;
  mediaPermanenciaDias: number;
  mediaAusenciaDias: number | null; // só conta ausências já encerradas
  ausenciaAtualDias: number | null; // se está fora agora
};

export function resumirAtendimentos(linhas: LinhaAtendimento[]): ResumoAtendimentos {
  const totalPermanenciaDias = linhas.reduce((soma, l) => soma + l.permanenciaDias, 0);

  const ausenciasEncerradas = linhas.filter(
    l => l.ausenciaDias !== null && !l.ausenciaEmAndamento
  );
  const somaAusencias = ausenciasEncerradas.reduce((soma, l) => soma + (l.ausenciaDias ?? 0), 0);

  return {
    entradas: linhas.length,
    totalPermanenciaDias,
    mediaPermanenciaDias: linhas.length ? Math.round(totalPermanenciaDias / linhas.length) : 0,
    mediaAusenciaDias: ausenciasEncerradas.length
      ? Math.round(somaAusencias / ausenciasEncerradas.length)
      : null,
    ausenciaAtualDias: linhas.find(l => l.ausenciaEmAndamento)?.ausenciaDias ?? null
  };
}

/* ---------- Providências e atividades: frequência e participação ---------- */

export type LinhaFrequencia = {
  tipo: TipoProvidencia;
  hoje: number;
  ultimos7: number;
  ultimos28: number;
  moradoresPraticantes: number; // quantos moradores fizeram nos últimos 28 dias
};

function somarQuantidade(registros: RegistroProvidencia[]): number {
  return registros.reduce((soma, r) => soma + r.quantidade, 0);
}

export function calcularFrequencias(
  tipos: TipoProvidencia[],
  registros: RegistroProvidencia[],
  moradorId: number,
  hoje: string
): LinhaFrequencia[] {
  const inicio7 = adicionarDias(hoje, -6); // 7 dias contando hoje
  const inicio28 = adicionarDias(hoje, -27); // 28 dias contando hoje

  return tipos.map(tipo => {
    const doTipo = registros.filter(r => r.tipoId === tipo.id && r.data <= hoje);
    const doMorador = doTipo.filter(r => r.moradorId === moradorId);
    const recentes = doTipo.filter(r => r.data >= inicio28);

    return {
      tipo,
      hoje: somarQuantidade(doMorador.filter(r => r.data === hoje)),
      ultimos7: somarQuantidade(doMorador.filter(r => r.data >= inicio7)),
      ultimos28: somarQuantidade(doMorador.filter(r => r.data >= inicio28)),
      moradoresPraticantes: new Set(recentes.map(r => r.moradorId)).size
    };
  });
}

/* ---------- Ocorrências: reincidência ---------- */

export type GrupoOcorrencia = {
  tipo: string;
  total: number;
  primeira: string;
  ultima: string;
  gravidadeMaxima: Gravidade;
  reincidente: boolean; // 2 ou mais ocorrências do mesmo tipo
};

const pesoGravidade: Record<Gravidade, number> = { Leve: 1, Moderada: 2, Grave: 3 };

export function agruparOcorrencias(lista: Ocorrencia[]): GrupoOcorrencia[] {
  const grupos = new Map<string, Ocorrencia[]>();

  for (const ocorrencia of lista) {
    const atuais = grupos.get(ocorrencia.tipo) ?? [];
    atuais.push(ocorrencia);
    grupos.set(ocorrencia.tipo, atuais);
  }

  return Array.from(grupos.entries())
    .map(([tipo, itens]) => {
      const datas = itens.map(i => i.data).sort();
      const gravidadeMaxima = itens.reduce<Gravidade>(
        (maior, i) => (pesoGravidade[i.gravidade] > pesoGravidade[maior] ? i.gravidade : maior),
        "Leve"
      );

      return {
        tipo,
        total: itens.length,
        primeira: datas[0],
        ultima: datas[datas.length - 1],
        gravidadeMaxima,
        reincidente: itens.length >= 2
      };
    })
    .sort((a, b) => b.total - a.total || b.ultima.localeCompare(a.ultima));
}
