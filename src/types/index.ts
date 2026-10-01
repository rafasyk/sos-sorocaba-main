export type Situacao = "Abrigado" | "Na rua";

export type RegistroAcolhimento = {
  chegada: string;
  saida: string;
  ac: string;
};

export type Morador = {
  id: number;

  // para identificar o morador no sistema
  nome: string;
  dataFicha: string;
  enderecoAtual: string;
  bairro: string;
  cidadeAtual: string;
  estadoAtual: string;
  dataNascimento: string;
  idade: string;
  naturalidade: string;
  estadoNaturalidade: string;
  estadoCivil: string;

  temDocumento: boolean;
  tipoDocumento: string;
  numeroDocumento: string;

  sexo: string;
  profissao: string;

  recebeBeneficio: boolean;

  analfabeto: boolean;
  grauEscolaridade: string;

  // dados sobre a familia do morador
  nomePai: string;
  paiFalecido: boolean;
  nomeMae: string;
  maeFalecida: boolean;
  pessoaContato: string;
  telefoneContato: string;

  // caracteristicas do morador
  deficiencia: boolean;
  doencaMental: boolean;
  refugiadoImigrante: boolean;
  identidadeTrans: boolean;
  trajetoriaRua: boolean;
  indigena: boolean;
  egressoSistemaPrisional: boolean;
  povoTradicional: boolean;

  dependenciaQuimica: boolean;
  bebidaAlcoolica: boolean;
  drogas: boolean;

  // qual a procedencia do morador
  cidadeProcedencia: string;
  estadoProcedencia: string;
  zonaProcedencia: string;
  motivoSorocaba: string;

  // historico do morador
  historicoProvidencias: string;

  // qual sua situação no sistema atualmemte
  situacao: Situacao;
  abrigo: string | null;

  latitude: number;
  longitude: number;

  registrosAcolhimento: RegistroAcolhimento[];
};