import { test, expect } from '@playwright/test';
import { DebitosPage } from '../pages/debitos.page';
import { debitosFixture } from '../fixtures/debitos.fixture';

let debitos: DebitosPage;

test.beforeEach(async ({ page }) => {
  debitos = new DebitosPage(page);
});

test('SD-23.1 Ortografia do cabeçalho', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Validar o título do cabeçalho', async () => {
    await debitos.validarTituloCabecalho(debitosFixture.validarTituloCabecalho);
  });
});

test('SD-23.2 Ortografia do título da tela de Cadastro de Débito', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Navegar para o cadastro de débito', async () => {
    await debitos.clicarNovoDebito();
  });

  await test.step('3. Validar o título da tela de cadastro', async () => {
    await debitos.validarTitulo(debitosFixture.tituloCadastroDebito);
  });
});

test('SD-23.3 Ortografia do título da tela de Detalhes do Débito', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Abrir o detalhe do primeiro débito', async () => {
    await debitos.abrirDetalhesPrimeiroDebito();
  });

  await test.step('3. Validar o título da tela de detalhes', async () => {
    await debitos.validarTitulo(debitosFixture.tituloDetalhesDebito);
  });
});

test('SD-24 Ortografia dos rótulos', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Validar rótulos dos filtros de consulta', async () => {
    await debitos.validarOrtografiaRotulosFiltros(debitosFixture.rotulosFiltrosConsulta);
  });
});

test('SD-25.1 Consistência de rótulos (tela de Cadastro de Débito x Detalhes do Débito)', async ({ page }) => {
  let rotulosCadastro: Awaited<ReturnType<DebitosPage['obterRotulosTelaCadastroDebito']>>;
  let rotulosDetalhes: Awaited<ReturnType<DebitosPage['obterRotulosTelaDetalhesDebito']>>;

  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Abrir a tela de cadastro', async () => {
    await debitos.clicarNovoDebito();
  });

  await test.step('3. Capturar os rótulos da tela de cadastro', async () => {
    rotulosCadastro = await debitos.obterRotulosTelaCadastroDebito();
  });

  await test.step('4. Voltar e abrir a tela de detalhes para comparação', async () => {
    await debitos.clicarCancelar();
    await debitos.abrirDetalhesPrimeiroDebito();
  });

  await test.step('5. Capturar os rótulos da tela de detalhes', async () => {
    rotulosDetalhes = await debitos.obterRotulosTelaDetalhesDebito();
  });

  await test.step('6. Validar consistência dos rótulos entre cadastro e detalhes', async () => {
    expect(rotulosDetalhes.identificador, 'Rótulo do campo Identificador está inconsistente').toBe(rotulosCadastro.identificador);
    expect(rotulosDetalhes.nomeDevedor, 'Rótulo do campo Nome do Devedor está inconsistente').toBe(rotulosCadastro.nomeDevedor);
    expect(rotulosDetalhes.cpfDevedor, 'Rótulo do campo CPF do Devedor está inconsistente').toBe(rotulosCadastro.cpfDevedor);
    expect(rotulosDetalhes.valorDebito, 'Rótulo do campo Valor do Débito está inconsistente').toBe(rotulosCadastro.valorDebito);
    expect(rotulosDetalhes.dataDebito, 'Rótulo do campo Data do Débito está inconsistente').toBe(rotulosCadastro.dataDebito);
    expect(rotulosDetalhes.origemDebito, 'Rótulo do campo Origem do Débito está inconsistente ou ausente').toBe(rotulosCadastro.origemDebito);
  });
});

test('SD-25.2 Consistência de rótulos - Resultado da Consulta x Detalhes do Débito', async ({ page }) => {
  let rotulosResultado: Awaited<ReturnType<DebitosPage['obterCabecalhosResultadoConsulta']>>;
  let rotulosDetalhes: Awaited<ReturnType<DebitosPage['obterRotulosTelaDetalhesDebito']>>;

  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Capturar os rótulos do resultado da consulta', async () => {
    rotulosResultado = await debitos.obterCabecalhosResultadoConsulta();
  });

  await test.step('3. Abrir detalhes do primeiro débito', async () => {
    await debitos.abrirDetalhesPrimeiroDebito();
  });

  await test.step('4. Capturar os rótulos da tela de detalhes', async () => {
    rotulosDetalhes = await debitos.obterRotulosTelaDetalhesDebito();
  });

  await test.step('5. Validar consistência dos rótulos entre resultado e detalhes', async () => {
    expect.soft(rotulosResultado.identificador, 'Rótulo do campo Identificador está inconsistente entre Resultado e Detalhes').toBe(rotulosDetalhes.identificador);
    expect.soft(rotulosResultado.nomeDevedor, 'Rótulo do campo Nome do Devedor está inconsistente entre Resultado e Detalhes').toBe(rotulosDetalhes.nomeDevedor);
    expect.soft(rotulosResultado.cpfDevedor, 'Rótulo do campo CPF do Devedor está inconsistente entre Resultado e Detalhes').toBe(rotulosDetalhes.cpfDevedor);
    expect.soft(rotulosResultado.valorDebito, 'Rótulo do campo Valor do Débito está inconsistente entre Resultado e Detalhes').toBe(rotulosDetalhes.valorDebito);
    expect.soft(rotulosResultado.dataDebito, 'Rótulo do campo Data do Débito está inconsistente entre Resultado e Detalhes').toBe(rotulosDetalhes.dataDebito);
    expect.soft(rotulosResultado.origemDebito, 'Rótulo do campo Origem do Débito está inconsistente ou ausente entre Resultado e Detalhes').toBe(rotulosDetalhes.origemDebito);
  });
});
