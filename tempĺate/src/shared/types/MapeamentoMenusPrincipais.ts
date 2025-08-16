			export interface MenuMapping {
  modNomModulo: string;
  nomeApresentacao: string;
  modActModulo: string;
}

export const MapeamentoMenusPrincipais: MenuMapping[] = [
  { modNomModulo: 'PORTALRH_DEMONSTRATIVOS',nomeApresentacao: 'Demonstrativos',  modActModulo: 'http://localhost:8080/portalrh/faces/restrito/pages/demonstrativos/dashboardDemonstrativos.xhtml'},
  { modNomModulo: 'PORTALRH_GESTAO_DESEMPENHO',nomeApresentacao: 'Gestão de desempenho', modActModulo: 'http://localhost:8080/portalrh/faces/restrito/pages/gestaoDesemp/avaliacao/dashboardAvaliacao.xhtml'},
  { modNomModulo: 'PORTALRH_ELEICOES',nomeApresentacao: 'Eleições', modActModulo: 'http://localhost:8080/portalrh/faces/restrito/pages/eleicao/dashboardEleicao.xhtml'},
  { modNomModulo: 'PORTALRH_FERIAS',nomeApresentacao: 'Férias', modActModulo: 'http://localhost:8080/portalrh/faces/restrito/pages/ferias/dashboardFerias/dashboardFerias.xhtml'},
  { modNomModulo: 'PORTALRH_PCCR',nomeApresentacao: 'Plano de cargos', modActModulo: 'http://localhost:8080/portalrh/faces/restrito/pages/pccr/dashboard/dashboardPromocao.xhtml'},
  { modNomModulo: 'PORTALRH_BANCO_TALENTOS',nomeApresentacao: 'Banco de talentos', modActModulo: 'http://localhost:8080/portalrh/faces/restrito/pages/bancoTalentos/dashboardBancoTalentos.xhtml'},
  { modNomModulo: 'PORTALRH_VALES',nomeApresentacao: 'Vales', modActModulo: 'http://localhost:8080/portalrh/faces/restrito/pages/vale/dashboardValeColaborador.xhtml'},
];

