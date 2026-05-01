import { DebitosPage } from '../pages/debitos.page';
import { debitosFixture } from '../fixtures/debitos.fixture';
import test, { expect } from '@playwright/test';

let debitos: DebitosPage;

test.beforeEach(async ({ page }) => {
  debitos = new DebitosPage(page);
});

test('SD-21 Exibir todos os campos', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Filtrar por nome e consultar', async () => {
    await debitos.preencherNome(debitosFixture.nomeDevedor);
    await debitos.clicarConsultar();
  });

  await test.step('3. Abrir detalhes do débito', async () => {
    await debitos.clicarDetalhes();
  });

  await test.step('4. Validar que todos os campos estão exibidos no detalhe', async () => {
    await debitos.validarCamposExibidosDetalhesDebito();
  });
});

test('SD-22 Voltar para consulta', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Filtrar por nome e consultar', async () => {
    await debitos.preencherNome(debitosFixture.nomeDevedor);
    await debitos.clicarConsultar();
  });

  await test.step('3. Abrir detalhes do débito', async () => {
    await debitos.clicarDetalhes();
  });

  await test.step('4. Voltar para a consulta e aguardar resultados', async () => {
    await debitos.voltarConsulta();
    await debitos.aguardarResultados();
  });
});
