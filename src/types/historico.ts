// Tipos do histórico do morador.
// Os nomes seguem as tabelas do diagrama do banco (Miro):
//   Atendimento             -> ATENDIMENTOS
//   TipoProvidencia         -> TIPOS_PROVIDENCIAS
//   RegistroProvidencia     -> ATENDIMENTO_PROVIDENCIAS
//   Ocorrencia              -> OCORRENCIAS
// Datas ficam no formato AAAA-MM-DD (igual ao DATE do banco).

export type Atendimento = {
  id: number;
  moradorId: number;
  abrigo: string;
  entrada: string; // data_chegada
  saida: string | null; // data_saida (null = ainda está no abrigo)
  formaAcesso: string; // forma_acesso
};

export type CategoriaProvidencia = "consumo" | "atividade";

export type TipoProvidencia = {
  id: number;
  descricao: string;
  // ATENÇÃO: o diagrama atual do banco não tem este campo.
  // Ele é necessário para separar "itens consumidos" de "atividades".
  categoria: CategoriaProvidencia;
};

export type RegistroProvidencia = {
  id: number;
  moradorId: number;
  tipoId: number;
  data: string;
  quantidade: number;
  observacao?: string;
};

export type Gravidade = "Leve" | "Moderada" | "Grave";

export type Ocorrencia = {
  id: number;
  moradorId: number;
  data: string;
  tipo: string; // tipo_ocorrencia
  gravidade: Gravidade;
  descricao: string;
};
