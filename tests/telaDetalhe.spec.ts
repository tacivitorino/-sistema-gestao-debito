import { DebitosPage } from '../pages/debitos.page';
import { debitosFixture } from '../fixtures/debitos.fixture';
import test, { expect } from '@playwright/test';


let debitos: DebitosPage;

test.beforeEach(async ({ page }) => {
    debitos = new DebitosPage(page);
});

test('SD-21 Exibir todos os campos', async ({ page }) => {
    await debitos.visit();
    await debitos.preencherNome(debitosFixture.nomeDevedor);
    await debitos.clicarConsultar();
    await debitos.clicarDetalhes();
    await debitos.validarCamposExibidosDetalhesDebito();
});

test('SD-22 Voltar para consulta', async ({ page }) => {
    await debitos.visit();
    await debitos.preencherNome(debitosFixture.nomeDevedor);
    await debitos.clicarConsultar();
    await debitos.clicarDetalhes();
    await debitos.voltarConsulta();
    await debitos.aguardarResultados();

});
