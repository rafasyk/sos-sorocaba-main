import type {
  Atendimento,
  Ocorrencia,
  RegistroProvidencia,
  TipoProvidencia
} from "../types/historico";
import { adicionarDias, diaDaSemana } from "../utils/datas";

// Dados FICTÍCIOS, só para o protótipo.
// Quando o backend estiver pronto, estes dados passam a vir da API
// e DATA_REFERENCIA vira a data de hoje (new Date()).
export const DATA_REFERENCIA = "2026-10-08";

export const tiposProvidencia: TipoProvidencia[] = [
  { id: 1, descricao: "Café da manhã", categoria: "consumo" },
  { id: 2, descricao: "Almoço", categoria: "consumo" },
  { id: 3, descricao: "Jantar", categoria: "consumo" },
  { id: 4, descricao: "Lanche", categoria: "consumo" },
  { id: 5, descricao: "Roupas", categoria: "consumo" },
  { id: 6, descricao: "Kit de higiene", categoria: "consumo" },
  { id: 7, descricao: "Desenho", categoria: "atividade" },
  { id: 8, descricao: "Costura", categoria: "atividade" },
  { id: 9, descricao: "Agricultura", categoria: "atividade" },
  { id: 10, descricao: "Cozinha", categoria: "atividade" }
];

export const atendimentos: Atendimento[] = [
  // 1 - João da Silva (abrigado): 3 entradas
  { id: 1, moradorId: 1, abrigo: "Abrigo Central", entrada: "2026-01-12", saida: "2026-02-20", formaAcesso: "Busca ativa" },
  { id: 2, moradorId: 1, abrigo: "Abrigo Central", entrada: "2026-03-05", saida: "2026-05-30", formaAcesso: "Demanda espontânea" },
  { id: 3, moradorId: 1, abrigo: "Abrigo Central", entrada: "2026-06-18", saida: null, formaAcesso: "Demanda espontânea" },
  // 2 - Maria Oliveira (na rua): 2 entradas
  { id: 4, moradorId: 2, abrigo: "Abrigo Central", entrada: "2026-04-02", saida: "2026-04-09", formaAcesso: "Encaminhamento CREAS" },
  { id: 5, moradorId: 2, abrigo: "Abrigo Central", entrada: "2026-08-14", saida: "2026-08-21", formaAcesso: "Busca ativa" },
  // 3 - Carlos Santos (abrigado)
  { id: 6, moradorId: 3, abrigo: "Abrigo Nova Esperança", entrada: "2026-02-01", saida: null, formaAcesso: "Encaminhamento CREAS" },
  // 4 - Ana Paula Souza (na rua): 2 entradas
  { id: 7, moradorId: 4, abrigo: "Abrigo Nova Esperança", entrada: "2026-05-10", saida: "2026-06-02", formaAcesso: "Demanda espontânea" },
  { id: 8, moradorId: 4, abrigo: "Abrigo Nova Esperança", entrada: "2026-07-01", saida: "2026-07-04", formaAcesso: "Demanda espontânea" },
  // 5 - José Roberto (abrigado)
  { id: 9, moradorId: 5, abrigo: "Abrigo Central", entrada: "2026-08-10", saida: null, formaAcesso: "Busca ativa" },
  // 6 - Marcos Antônio (na rua): 3 entradas
  { id: 10, moradorId: 6, abrigo: "Abrigo Central", entrada: "2026-03-20", saida: "2026-04-10", formaAcesso: "Busca ativa" },
  { id: 11, moradorId: 6, abrigo: "Abrigo Central", entrada: "2026-04-12", saida: "2026-05-02", formaAcesso: "Demanda espontânea" },
  { id: 12, moradorId: 6, abrigo: "Abrigo Central", entrada: "2026-09-01", saida: "2026-09-15", formaAcesso: "Demanda espontânea" },
  // 7 - Luciana Alves (abrigada)
  { id: 13, moradorId: 7, abrigo: "Abrigo Nova Esperança", entrada: "2026-01-05", saida: null, formaAcesso: "Encaminhamento CREAS" },
  // 8 - Pedro Henrique (na rua)
  { id: 14, moradorId: 8, abrigo: "Abrigo Central", entrada: "2026-09-20", saida: "2026-09-27", formaAcesso: "Busca ativa" }
];

// Atividades que cada morador pratica e em quais dias da semana
// (0 = domingo, 1 = segunda ... 6 = sábado).
const rotinasAtividades: Record<number, { tipoId: number; diasSemana: number[] }[]> = {
  1: [{ tipoId: 7, diasSemana: [1, 3, 5] }, { tipoId: 10, diasSemana: [2, 4] }],
  3: [{ tipoId: 9, diasSemana: [1, 2, 3, 4, 5] }],
  5: [{ tipoId: 8, diasSemana: [2, 4, 6] }, { tipoId: 7, diasSemana: [6] }],
  6: [{ tipoId: 7, diasSemana: [2, 4] }],
  7: [{ tipoId: 10, diasSemana: [1, 2, 3, 4, 5] }, { tipoId: 8, diasSemana: [3] }, { tipoId: 9, diasSemana: [5] }],
  8: [{ tipoId: 7, diasSemana: [1, 3] }]
};

function moradorEstavaNoAbrigo(moradorId: number, dia: string): boolean {
  return atendimentos.some(
    a => a.moradorId === moradorId && a.entrada <= dia && (a.saida === null || dia < a.saida)
  );
}

// Gera os registros dos últimos 60 dias, somente nos dias em que o morador
// estava no abrigo. É uma regra fixa (sem sorteio), então o resultado é sempre o mesmo.
function gerarRegistros(): RegistroProvidencia[] {
  const lista: RegistroProvidencia[] = [];
  let proximoId = 1;
  const moradoresIds = Array.from(new Set(atendimentos.map(a => a.moradorId)));

  for (let i = 59; i >= 0; i--) {
    const dia = adicionarDias(DATA_REFERENCIA, -i);
    const semana = diaDaSemana(dia);

    for (const moradorId of moradoresIds) {
      if (!moradorEstavaNoAbrigo(moradorId, dia)) continue;

      const adicionar = (tipoId: number) =>
        lista.push({ id: proximoId++, moradorId, tipoId, data: dia, quantidade: 1 });

      adicionar(1); // café da manhã
      adicionar(2); // almoço
      if ((moradorId + i) % 9 !== 0) adicionar(3); // jantar (alguns dias não consome)
      if (semana >= 1 && semana <= 5 && (moradorId + i) % 2 === 0) adicionar(4); // lanche
      if (semana === 1) adicionar(6); // kit de higiene toda segunda
      if ((moradorId * 7 + i) % 21 === 0) adicionar(5); // roupas de vez em quando

      for (const rotina of rotinasAtividades[moradorId] ?? []) {
        if (rotina.diasSemana.includes(semana)) adicionar(rotina.tipoId);
      }
    }
  }

  return lista;
}

export const registrosProvidencia: RegistroProvidencia[] = gerarRegistros();

export const ocorrencias: Ocorrencia[] = [
  { id: 1, moradorId: 1, data: "2026-02-10", tipo: "Mau comportamento", gravidade: "Leve", descricao: "Discussão com outro morador no refeitório." },
  { id: 2, moradorId: 1, data: "2026-04-18", tipo: "Mau comportamento", gravidade: "Moderada", descricao: "Desrespeitou um monitor durante a atividade." },
  { id: 3, moradorId: 1, data: "2026-07-02", tipo: "Descumprimento de regras", gravidade: "Leve", descricao: "Chegou após o horário de recolhimento." },

  { id: 4, moradorId: 2, data: "2026-04-02", tipo: "Histórico prisional", gravidade: "Moderada", descricao: "Informou passagem pelo sistema prisional na entrada." },
  { id: 5, moradorId: 2, data: "2026-04-05", tipo: "Briga", gravidade: "Moderada", descricao: "Briga com outra moradora no dormitório." },
  { id: 6, moradorId: 2, data: "2026-08-18", tipo: "Briga", gravidade: "Grave", descricao: "Agressão física, foi necessário separar as envolvidas." },

  { id: 7, moradorId: 3, data: "2026-03-11", tipo: "Uso de substâncias", gravidade: "Moderada", descricao: "Encontrado sob efeito de álcool no abrigo." },
  { id: 8, moradorId: 3, data: "2026-05-02", tipo: "Uso de substâncias", gravidade: "Moderada", descricao: "Novo episódio de uso de álcool." },
  { id: 9, moradorId: 3, data: "2026-07-19", tipo: "Uso de substâncias", gravidade: "Grave", descricao: "Episódio de uso com necessidade de acompanhamento." },

  { id: 10, moradorId: 5, data: "2026-08-10", tipo: "Histórico prisional", gravidade: "Moderada", descricao: "Informou passagem pelo sistema prisional na entrada." },
  { id: 11, moradorId: 5, data: "2026-09-12", tipo: "Briga", gravidade: "Leve", descricao: "Desentendimento verbal, resolvido pela equipe." },

  { id: 12, moradorId: 6, data: "2026-03-25", tipo: "Briga", gravidade: "Leve", descricao: "Empurrão em outro morador na fila do almoço." },
  { id: 13, moradorId: 6, data: "2026-04-14", tipo: "Briga", gravidade: "Moderada", descricao: "Briga no pátio." },
  { id: 14, moradorId: 6, data: "2026-09-10", tipo: "Briga", gravidade: "Grave", descricao: "Agressão a outro morador." },
  { id: 15, moradorId: 6, data: "2026-09-12", tipo: "Mau comportamento", gravidade: "Leve", descricao: "Gritou com a equipe." },

  { id: 16, moradorId: 8, data: "2026-09-24", tipo: "Descumprimento de regras", gravidade: "Leve", descricao: "Saiu do abrigo sem avisar a equipe." }
];
