import type { Morador } from "../types";

const base: Omit<Morador, "id" | "nome" | "situacao" | "abrigo" | "latitude" | "longitude"> = {
  dataFicha: "",
  enderecoAtual: "",
  bairro: "",
  cidadeAtual: "Sorocaba",
  estadoAtual: "SP",
  dataNascimento: "",
  idade: "",
  naturalidade: "",
  estadoNaturalidade: "",
  estadoCivil: "",
  temDocumento: false,
  tipoDocumento: "",
  numeroDocumento: "",
  sexo: "",
  profissao: "",
  recebeBeneficio: false,
  analfabeto: false,
  grauEscolaridade: "",
  nomePai: "",
  paiFalecido: false,
  nomeMae: "",
  maeFalecida: false,
  pessoaContato: "",
  telefoneContato: "",
  deficiencia: false,
  doencaMental: false,
  refugiadoImigrante: false,
  identidadeTrans: false,
  trajetoriaRua: false,
  indigena: false,
  egressoSistemaPrisional: false,
  povoTradicional: false,
  dependenciaQuimica: false,
  bebidaAlcoolica: false,
  drogas: false,
  cidadeProcedencia: "",
  estadoProcedencia: "",
  zonaProcedencia: "",
  motivoSorocaba: "",
  historicoProvidencias: "",
  registrosAcolhimento: [],
};

type Dados = Partial<Morador> &
  Pick<Morador, "id" | "nome" | "situacao" | "abrigo" | "latitude" | "longitude">;

const criar = (dados: Dados): Morador => ({ ...base, ...dados });

export const moradores: Morador[] = [
  criar({ id: 1, nome: "João da Silva", temDocumento: true, tipoDocumento: "CPF", numeroDocumento: "123.456.789-00", dataFicha: "20/09/2026", situacao: "Abrigado", abrigo: "Abrigo Central", latitude: -23.5015, longitude: -47.4526 }),
  criar({ id: 2, nome: "Maria Oliveira", temDocumento: true, tipoDocumento: "CPF", numeroDocumento: "987.654.321-00", dataFicha: "18/09/2026", situacao: "Na rua", abrigo: null, latitude: -23.5067, longitude: -47.4583 }),
  criar({ id: 3, nome: "Carlos Santos", temDocumento: true, tipoDocumento: "CPF", numeroDocumento: "456.789.123-00", dataFicha: "17/09/2026", situacao: "Abrigado", abrigo: "Abrigo Nova Esperança", latitude: -23.4982, longitude: -47.4461 }),
  criar({ id: 4, nome: "Ana Paula Souza", temDocumento: true, tipoDocumento: "CPF", numeroDocumento: "321.654.987-00", dataFicha: "16/09/2026", situacao: "Na rua", abrigo: null, latitude: -23.5108, longitude: -47.4624 }),
  criar({ id: 5, nome: "José Roberto", temDocumento: true, tipoDocumento: "CPF", numeroDocumento: "741.852.963-00", dataFicha: "15/09/2026", situacao: "Abrigado", abrigo: "Abrigo Central", latitude: -23.5031, longitude: -47.4501 }),
  criar({ id: 6, nome: "Marcos Antônio", temDocumento: true, tipoDocumento: "CPF", numeroDocumento: "159.357.486-00", dataFicha: "14/09/2026", situacao: "Na rua", abrigo: null, latitude: -23.5059, longitude: -47.4557 }),
  criar({ id: 7, nome: "Luciana Alves", temDocumento: true, tipoDocumento: "CPF", numeroDocumento: "852.963.741-00", dataFicha: "13/09/2026", situacao: "Abrigado", abrigo: "Abrigo Nova Esperança", latitude: -23.4947, longitude: -47.4402 }),
  criar({ id: 8, nome: "Pedro Henrique", temDocumento: true, tipoDocumento: "CPF", numeroDocumento: "258.369.147-00", dataFicha: "12/09/2026", situacao: "Na rua", abrigo: null, latitude: -23.5126, longitude: -47.4681 }),
];