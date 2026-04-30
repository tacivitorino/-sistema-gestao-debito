import { test, expect } from '@playwright/test';
import { DebitosPage } from '../pages/debitos.page';
import { debitosFixture } from '../fixtures/debitos.fixture';


let debitos: DebitosPage;

test.beforeEach(async ({ page }) => {
  debitos = new DebitosPage(page);
});

test('SD01 Consultar por identificador existente', async ({ page }) => {
  await debitos.visit();
  await debitos.preencherIdentificador(debitosFixture.identificadorExistente);
  await debitos.clicarConsultar();
  await debitos.aguardarResultados();
});

test('SD02 Consultar por nome existente', async ({ page }) => {
  await debitos.visit();
  await debitos.preencherNome(debitosFixture.nomeDevedor);
  await debitos.clicarConsultar();
  await debitos.aguardarResultados();
});

test('SD03 Consultar por CPF existente', async ({ page }) => {
  await debitos.visit();
  await debitos.preencherCPF(debitosFixture.cpf);
  await debitos.clicarConsultar();
  await debitos.aguardarResultados();
});

test('SD04 Consultar por faixa de valores', async ({ page }) => {
  await debitos.visit();
  await debitos.preencherValorMinimo(debitosFixture.valorMinimo);
  await debitos.preencherValorMaximo(debitosFixture.valorMaximo);
  await debitos.clicarConsultar();
  await debitos.aguardarResultados();
});

test('SD05 Consultar por periodo', async ({ page }) => {
  await debitos.visit();
  await debitos.preencherDataInicio(debitosFixture.dataInicio);
  await debitos.preencherDataFim(debitosFixture.dataFim);
  await debitos.clicarConsultar();
  await debitos.aguardarResultados();
});

test('SD06 Validar período invertido', async ({ page }) => {
  await debitos.visit();
  await debitos.preencherDataInicioMaior(debitosFixture.dataInicioMaior);
  await debitos.preencherDataFimMenor(debitosFixture.dataFimMenor);
  await debitos.clicarConsultar();
  await debitos.aguardarResultados();
});

test('SD07 Limpar filtros ', async ({ page }) => {
  await debitos.visit();
  await debitos.preencherCPF(debitosFixture.cpf);
  await debitos.clicarLimpar();
  await debitos.validarFiltrosLimpos();
});
  
test('SD08 Consultar por identificador inexistente', async ({ page }) => {
  await debitos.visit();
  await debitos.preencherIdentificador(debitosFixture.identificadorInexistente);
  await debitos.clicarConsultar();
  await debitos.aguardarResultados();
});

test('SD09 Navegar para detalhes', async ({ page }) => {
  await debitos.visit();
  await debitos.preencherNome(debitosFixture.nomeDevedor);
  await debitos.clicarConsultar();
  await debitos.clicarDetalhes();
  await debitos.aguardarResultados();
});

test('SD10 Navegar para cadastro', async ({ page }) => {
  await debitos.visit();
  await debitos.clicarNovoDebito();
  await debitos.aguardarResultados();
});