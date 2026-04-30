import { cp } from "node:fs";

export const debitosFixture = {
  // Dados de consulta por identificador
  identificadorExistente: '2024.08.0000055',
  identificadorInexistente: '9999.99.9999999',

  // Dados de consulta por nome e CPF
  nomeDevedor: 'Maria',
  cpf: '123.456.789-00',

  // Filtros de valores para consulta
  valorMinimo: '100',
  valorMaximo: '2000',

  // Período válido para consulta
  dataInicio: '2024-01-01',
  dataFim: '2024-12-31',

  // Dados para testes de datas inválidas
  dataInicioMaior: '2024-12-31',
  dataFimMenor: '2024-01-01',

  // Dados de cadastro de débito válidos
  nomeDevedorCadastro: 'Marta de Souza',
  cpfCadastro: '987.654.321-00',
  valorDebito: '1500',
  dataDebito: '2024-06-15',
  selecionarOrigem: 'IPVA',

  // Dados inválidos para testes de validação
  cpfInvalido: 'abc.def.ghi-jk',
  valorInvalido: '-3500',
  valorNulo: '0',
  datainvalida: '2025-06-15',
  nomeDevedorInvalido: '1234567890',

  // Textos esperados para validação de título e rótulos
  validarTituloCabecalho: 'Sistema de Gestão de Débitos',

  rotulosFiltrosConsulta: [
    'N° IDENTIFICADOR',
    'NOME DO DEVEDOR',
    'CPF',
    'VALOR MÍNIMO',
    'VALOR MÁXIMO',
    'DATA INÍCIO',
    'DATA FIM',
  ],

  rotulosPadraoDebito: [
    'Nº IDENTIFICADOR',
    'NOME DO DEVEDOR',
    'CPF DO DEVEDOR',
    'VALOR DO DÉBITO (R$)',
    'DATA DO DÉBITO',
  ],

  // Títulos esperados nas telas
  tituloCadastroDebito: 'Cadastro de Débito',
  tituloDetalhesDebito: 'Detalhes do Débito',
};
