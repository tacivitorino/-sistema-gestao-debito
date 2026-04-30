
import { test, expect } from '@playwright/test';
import { DebitosPage } from '../pages/debitos.page';
import { debitosFixture } from '../fixtures/debitos.fixture';


let debitos: DebitosPage;

test.beforeEach(async ({ page }) => {
  debitos = new DebitosPage(page);
});

test('SD-23.1 Ortografia do cabeçalho', async ({ page }) => {
  await debitos.visit();
  await debitos.validarTituloCabecalho(debitosFixture.validarTituloCabecalho);
});

test('SD-23.2 Ortografia do título da tela de Cadastro de Débito', async ({ page }) => {
  await debitos.visit();
  await debitos.clicarNovoDebito();
  await debitos.validarTitulo(debitosFixture.tituloCadastroDebito);
});

test('SD-23.3 Ortografia do título da tela de Detalhes do Débito', async ({ page }) => {
  await debitos.visit();
  await debitos.abrirDetalhesPrimeiroDebito();
  await debitos.validarTitulo(debitosFixture.tituloDetalhesDebito);
});


test('SD-24 Ortografia dos rótulos', async ({ page }) => {
  await debitos.visit();
  await debitos.validarOrtografiaRotulosFiltros(debitosFixture.rotulosFiltrosConsulta);
});

test('SD-25.1 Consistência de rótulos (tela de Cadastro de Débito x Detalhes do Débito,', async ({ page }) => {
  await debitos.visit();
  await debitos.clicarNovoDebito();

  const rotulosCadastro = await debitos.obterRotulosTelaCadastroDebito();
  await debitos.clicarCancelar();
  await debitos.abrirDetalhesPrimeiroDebito();

  const rotulosDetalhes = await debitos.obterRotulosTelaDetalhesDebito();
  expect(
    rotulosDetalhes.identificador,
    'Rótulo do campo Identificador está inconsistente'
  ).toBe(rotulosCadastro.identificador);

  expect(
    rotulosDetalhes.nomeDevedor,
    'Rótulo do campo Nome do Devedor está inconsistente'
  ).toBe(rotulosCadastro.nomeDevedor);

  expect(
    rotulosDetalhes.cpfDevedor,
    'Rótulo do campo CPF do Devedor está inconsistente'
  ).toBe(rotulosCadastro.cpfDevedor);

  expect(
    rotulosDetalhes.valorDebito,
    'Rótulo do campo Valor do Débito está inconsistente'
  ).toBe(rotulosCadastro.valorDebito);

  expect(
    rotulosDetalhes.dataDebito,
    'Rótulo do campo Data do Débito está inconsistente'
  ).toBe(rotulosCadastro.dataDebito);

  expect(
    rotulosDetalhes.origemDebito,
    'Rótulo do campo Origem do Débito está inconsistente ou ausente'
  ).toBe(rotulosCadastro.origemDebito);
});

test('SD-25.2 Consistência de rótulos - Resultado da Consulta x Detalhes do Débito', async ({ page }) => {
  await debitos.visit();

  const rotulosResultado = await debitos.obterCabecalhosResultadoConsulta();
  await debitos.abrirDetalhesPrimeiroDebito();

  const rotulosDetalhes = await debitos.obterRotulosTelaDetalhesDebito();
  expect.soft(
    rotulosResultado.identificador,
    'Rótulo do campo Identificador está inconsistente entre Resultado e Detalhes'
  ).toBe(rotulosDetalhes.identificador);

  expect.soft(
    rotulosResultado.nomeDevedor,
    'Rótulo do campo Nome do Devedor está inconsistente entre Resultado e Detalhes'
  ).toBe(rotulosDetalhes.nomeDevedor);

  expect.soft(
    rotulosResultado.cpfDevedor,
    'Rótulo do campo CPF do Devedor está inconsistente entre Resultado e Detalhes'
  ).toBe(rotulosDetalhes.cpfDevedor);

  expect.soft(
    rotulosResultado.valorDebito,
    'Rótulo do campo Valor do Débito está inconsistente entre Resultado e Detalhes'
  ).toBe(rotulosDetalhes.valorDebito);

  expect.soft(
    rotulosResultado.dataDebito,
    'Rótulo do campo Data do Débito está inconsistente entre Resultado e Detalhes'
  ).toBe(rotulosDetalhes.dataDebito);

  expect.soft(
    rotulosResultado.origemDebito,
    'Rótulo do campo Origem do Débito está inconsistente ou ausente entre Resultado e Detalhes'
  ).toBe(rotulosDetalhes.origemDebito);
});
