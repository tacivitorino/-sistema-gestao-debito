
import { test, expect } from '@playwright/test';
import { DebitosPage } from '../pages/debitos.page';
import { debitosFixture } from '../fixtures/debitos.fixture';


let debitos: DebitosPage;

test.beforeEach(async ({ page }) => {
  debitos = new DebitosPage(page);
});

test('SD11 Cadastro com dados válidos (fluxo completo)', async ({ page }) => {
  await debitos.visit();
  await debitos.clicarNovoDebito();
  await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorCadastro);
  await debitos.preencherCPFDevedor(debitosFixture.cpfCadastro);
  await debitos.preencherValorDebito(debitosFixture.valorDebito);
  await debitos.preencherDataDebito(debitosFixture.dataDebito);
  await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
  await debitos.clicarSalvar();
  await debitos.confirmarSalvar();
  await debitos.voltarConsulta();
  await debitos.aguardarResultados();
});

test('SD12 Cadastro com campos vazios', async ({ page }) => {
  await debitos.visit();
  await debitos.clicarNovoDebito();
  await debitos.clicarSalvar();
  await debitos.aguardarResultados();
});

test('SD13 Cadastro com CPF com letras ', async ({ page }) => {
  await debitos.visit();
  await debitos.clicarNovoDebito();
  await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorCadastro);
  await debitos.preencherCPFDevedor(debitosFixture.cpfInvalido);
  await debitos.preencherValorDebito(debitosFixture.valorDebito);
  await debitos.preencherDataDebito(debitosFixture.dataDebito);
  await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
  await debitos.clicarSalvar();
  await debitos.confirmarSalvar();
  await debitos.voltarConsulta();
  await debitos.aguardarResultados();
});

test('SD14 Cadastro com valor de débito inválido ', async ({ page }) => {
  await debitos.visit();
  await debitos.clicarNovoDebito();
  await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorCadastro);
  await debitos.preencherCPFDevedor(debitosFixture.cpfCadastro);
  await debitos.preencherValorDebito(debitosFixture.valorInvalido);
  await debitos.preencherDataDebito(debitosFixture.dataDebito);
  await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
  await debitos.clicarSalvar();
  await debitos.confirmarSalvar();
  await debitos.voltarConsulta();
  await debitos.aguardarResultados();
});

test('SD15 Cadastro com valor R$0,00 ', async ({ page }) => {
  await debitos.visit();
  await debitos.clicarNovoDebito();
  await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorCadastro);
  await debitos.preencherCPFDevedor(debitosFixture.cpfCadastro);
  await debitos.preencherValorDebito(debitosFixture.valorNulo);
  await debitos.preencherDataDebito(debitosFixture.dataDebito);
  await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
  await debitos.clicarSalvar();
  await debitos.confirmarSalvar();
  await debitos.voltarConsulta();
  await debitos.aguardarResultados();
});

test('SD16 Cadastro com data futura ', async ({ page }) => {
  await debitos.visit();
  await debitos.clicarNovoDebito();
  await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorCadastro);
  await debitos.preencherCPFDevedor(debitosFixture.cpfCadastro);
  await debitos.preencherValorDebito(debitosFixture.valorInvalido);
  await debitos.preencherDataDebito(debitosFixture.datainvalida);
  await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
  await debitos.clicarSalvar();
  await debitos.confirmarSalvar();
  await debitos.voltarConsulta();
  await debitos.aguardarResultados();
});


test('SD18 Verificar que o identificador gerado segue o padrão AAAA.MM.SSSSSSS ', async ({ page }) => {
  await debitos.visit();
  await debitos.clicarNovoDebito();
  await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorInvalido);
  await debitos.preencherCPFDevedor(debitosFixture.cpfCadastro);
  await debitos.preencherValorDebito(debitosFixture.valorDebito);
  await debitos.preencherDataDebito(debitosFixture.dataDebito);
  await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
  await debitos.clicarSalvar();
  await debitos.confirmarSalvar();
  await debitos.voltarConsulta();
  await debitos.aguardarResultados();
});

test('SD-19.1 Cancelar Cadastro - botão exibido com nome incorreto', async ({ page }) => {
  await debitos.visit();
  await debitos.clicarNovoDebito();
  await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorInvalido);
  await debitos.preencherCPFDevedor(debitosFixture.cpfCadastro);
  await debitos.preencherValorDebito(debitosFixture.valorDebito);
  await debitos.preencherDataDebito(debitosFixture.dataDebito);
  await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
  await debitos.clicarCanclear();
  await debitos.aguardarResultados();
});

test('SD-19.2 Cancelar Cadastro - validação do nome correto do botão) ', async ({ page }) => {
  await debitos.visit();
  await debitos.clicarNovoDebito();
  await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorInvalido);
  await debitos.preencherCPFDevedor(debitosFixture.cpfCadastro);
  await debitos.preencherValorDebito(debitosFixture.valorDebito);
  await debitos.preencherDataDebito(debitosFixture.dataDebito);
  await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
  await debitos.clicarCancelar();
  await debitos.aguardarResultados();
});

test('SD20 Modal clicar Não', async ({ page }) => {
  await debitos.visit();
  await debitos.clicarNovoDebito();
  await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorCadastro);
  await debitos.preencherCPFDevedor(debitosFixture.cpfCadastro);
  await debitos.preencherValorDebito(debitosFixture.valorDebito);
  await debitos.preencherDataDebito(debitosFixture.dataDebito);
  await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
  await debitos.clicarSalvar();
  await debitos.clicarNaoSalvar();
  await debitos.aguardarResultados();
});