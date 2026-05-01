import { test, expect } from '@playwright/test';
import { DebitosPage } from '../pages/debitos.page';
import { debitosFixture } from '../fixtures/debitos.fixture';

let debitos: DebitosPage;

test.beforeEach(async ({ page }) => {
  debitos = new DebitosPage(page);
});

test('SD01 Consultar por identificador existente', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Preencher identificador existente', async () => {
    await debitos.preencherIdentificador(debitosFixture.identificadorExistente);
  });

  await test.step('3. Consultar e aguardar resultados', async () => {
    await debitos.clicarConsultar();
    await debitos.aguardarResultados();
  });
});

test('SD02 Consultar por nome existente', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Preencher nome existente', async () => {
    await debitos.preencherNome(debitosFixture.nomeDevedor);
  });

  await test.step('3. Consultar e aguardar resultados', async () => {
    await debitos.clicarConsultar();
    await debitos.aguardarResultados();
  });
});

test('SD03 Consultar por CPF existente', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Preencher CPF existente', async () => {
    await debitos.preencherCPF(debitosFixture.cpf);
  });

  await test.step('3. Consultar e aguardar resultados', async () => {
    await debitos.clicarConsultar();
    await debitos.aguardarResultados();
  });
});

test('SD04 Consultar por faixa de valores', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Preencher faixa de valores', async () => {
    await debitos.preencherValorMinimo(debitosFixture.valorMinimo);
    await debitos.preencherValorMaximo(debitosFixture.valorMaximo);
  });

  await test.step('3. Consultar e aguardar resultados', async () => {
    await debitos.clicarConsultar();
    await debitos.aguardarResultados();
  });
});

test('SD05 Consultar por periodo', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Preencher período de consulta', async () => {
    await debitos.preencherDataInicio(debitosFixture.dataInicio);
    await debitos.preencherDataFim(debitosFixture.dataFim);
  });

  await test.step('3. Consultar e aguardar resultados', async () => {
    await debitos.clicarConsultar();
    await debitos.aguardarResultados();
  });
});

test('SD06 Validar período invertido', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Preencher período invertido', async () => {
    await debitos.preencherDataInicioMaior(debitosFixture.dataInicioMaior);
    await debitos.preencherDataFimMenor(debitosFixture.dataFimMenor);
  });

  await test.step('3. Consultar e aguardar resultados', async () => {
    await debitos.clicarConsultar();
    await debitos.aguardarResultados();
  });
});

test('SD07 Limpar filtros', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Preencher CPF e limpar filtros', async () => {
    await debitos.preencherCPF(debitosFixture.cpf);
    await debitos.clicarLimpar();
  });

  await test.step('3. Validar que os filtros foram limpos', async () => {
    await debitos.validarFiltrosLimpos();
  });
});

test('SD08 Consultar por identificador inexistente', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Preencher identificador inexistente', async () => {
    await debitos.preencherIdentificador(debitosFixture.identificadorInexistente);
  });

  await test.step('3. Consultar e aguardar resultados', async () => {
    await debitos.clicarConsultar();
    await debitos.aguardarResultados();
  });
});

test('SD09 Navegar para detalhes', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Buscar por nome e abrir detalhes', async () => {
    await debitos.preencherNome(debitosFixture.nomeDevedor);
    await debitos.clicarConsultar();
    await debitos.clicarDetalhes();
  });

  await test.step('3. Aguardar resultados da ação', async () => {
    await debitos.aguardarResultados();
  });
});

test('SD10 Navegar para cadastro', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Navegar para cadastro de débito', async () => {
    await debitos.clicarNovoDebito();
  });

  await test.step('3. Aguardar que a tela esteja pronta', async () => {
    await debitos.aguardarResultados();
  });
});