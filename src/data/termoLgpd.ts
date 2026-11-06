// Texto do termo de autorização (LGPD - Lei nº 13.709/2018).
// ATENÇÃO: é um modelo para o protótipo. Antes de usar de verdade, o texto
// precisa ser revisado pela SOS Sorocaba e por um(a) advogado(a).
// Se mudar o texto, mude também a VERSAO_TERMO_LGPD.

export const VERSAO_TERMO_LGPD = "1.0";

export type SecaoTermo = { titulo: string; paragrafos: string[] };

export const termoLgpd: SecaoTermo[] = [
  {
    titulo: "1. Quem cuida dos seus dados",
    paragrafos: [
      "A SOS Sorocaba é a responsável por guardar e usar os dados pessoais registrados na ficha de identificação, nos termos da Lei Geral de Proteção de Dados (LGPD)."
    ]
  },
  {
    titulo: "2. Quais dados são coletados",
    paragrafos: [
      "Dados de identificação (nome, data de nascimento, documentos, naturalidade, profissão), dados de contato e de família, local onde a pessoa vive ou costuma ficar, histórico de atendimentos e das providências recebidas.",
      "Também podem ser registradas informações sensíveis, como condições de saúde, deficiência, uso de álcool e outras drogas e passagem pelo sistema prisional. A lei exige um cuidado maior com esses dados, e eles só são registrados com a sua autorização."
    ]
  },
  {
    titulo: "3. Para que os dados são usados",
    paragrafos: [
      "Somente para acolher e acompanhar a pessoa: organizar os atendimentos, a entrada e a saída do abrigo, as providências e atividades, e encaminhar para os serviços de que ela precisa.",
      "Dados agrupados, sem identificar a pessoa, podem ser usados em estatísticas e relatórios, como o mapa de concentração e os números de atendimento."
    ]
  },
  {
    titulo: "4. Com quem os dados podem ser compartilhados",
    paragrafos: [
      "Apenas quando for necessário para o atendimento, com serviços da rede de proteção social e de saúde, como CRAS, CREAS, Centro POP, unidades de saúde e órgãos da Prefeitura de Sorocaba.",
      "Os dados não são vendidos e não são compartilhados para publicidade."
    ]
  },
  {
    titulo: "5. Por quanto tempo os dados ficam guardados",
    paragrafos: [
      "Pelo tempo em que a pessoa for atendida e pelo prazo que a lei ou as regras dos serviços de assistência social exigirem. Depois disso, os dados são apagados ou anonimizados."
    ]
  },
  {
    titulo: "6. Seus direitos",
    paragrafos: [
      "A pessoa pode, a qualquer momento, perguntar quais dados foram registrados, pedir correção, pedir que sejam apagados ou anonimizados, saber com quem foram compartilhados e retirar esta autorização.",
      "Recusar ou retirar a autorização não impede a pessoa de ser acolhida e atendida; apenas limita os dados que podem ser registrados e compartilhados."
    ]
  },
  {
    titulo: "7. Como falar com a SOS Sorocaba sobre seus dados",
    paragrafos: [
      "Basta procurar a equipe de atendimento da SOS Sorocaba. [PREENCHER: nome e contato da pessoa responsável pelos dados na organização]."
    ]
  },
  {
    titulo: "8. Autorização",
    paragrafos: [
      "Ao marcar a caixa de autorização no cadastro, a pessoa declara que o texto foi lido por ela ou lido em voz alta pela equipe, que entendeu e que autoriza, de forma livre e informada, o registro e o compartilhamento dos seus dados nas condições descritas acima."
    ]
  }
];
