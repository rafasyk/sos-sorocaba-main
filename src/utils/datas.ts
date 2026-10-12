// Funções de data usadas no histórico do morador.
// Trabalham sempre com texto AAAA-MM-DD e fazem as contas em UTC,
// para o fuso horário do navegador não "mudar" o dia.

const MS_POR_DIA = 86_400_000;

function paraUTC(iso: string): number {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return Date.UTC(ano, mes - 1, dia);
}

/** Quantidade de dias entre duas datas (fim - início). */
export function diasEntre(inicio: string, fim: string): number {
  return Math.round((paraUTC(fim) - paraUTC(inicio)) / MS_POR_DIA);
}

export function adicionarDias(iso: string, dias: number): string {
  return new Date(paraUTC(iso) + dias * MS_POR_DIA).toISOString().slice(0, 10);
}

/** 0 = domingo, 1 = segunda ... 6 = sábado */
export function diaDaSemana(iso: string): number {
  return new Date(paraUTC(iso)).getUTCDay();
}

/** 2026-10-08 -> 08/10/2026 */
export function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

/** 0 -> "menos de 1 dia", 1 -> "1 dia", 75 -> "75 dias (≈ 3 meses)" */
export function formatarDuracao(dias: number): string {
  if (dias <= 0) return "menos de 1 dia";
  const base = `${dias} ${dias === 1 ? "dia" : "dias"}`;
  if (dias < 60) return base;
  return `${base} (≈ ${Math.round(dias / 30)} meses)`;
}

/** Data de hoje no fuso do navegador, como AAAA-MM-DD. */
export function hojeISO(): string {
  const agora = new Date();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  return `${agora.getFullYear()}-${mes}-${dia}`;
}

/** A maior (mais recente) entre a data base e as outras datas. */
export function maiorData(base: string, outras: string[]): string {
  return outras.reduce((maior, data) => (data > maior ? data : maior), base);
}
