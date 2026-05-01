
import { test, expect } from '@playwright/test';
import { DebitosPage } from '../pages/debitos.page';
import { debitosFixture } from '../fixtures/debitos.fixture';

let debitos: DebitosPage;

test.beforeEach(async ({ page }) => {
  debitos = new DebitosPage(page);
});

test('SD11 Cadastro com dados válidos (fluxo completo)', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Clicar no botão "Novo Débito"', async () => {
    await debitos.clicarNovoDebito();
  });

  await test.step('3. Preencher os campos obrigatórios', async () => {
    await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorCadastro);
    await debitos.preencherCPFDevedor(debitosFixture.cpfCadastro);
    await debitos.preencherValorDebito(debitosFixture.valorDebito);
    await debitos.preencherDataDebito(debitosFixture.dataDebito);
  });

  await test.step('4. Selecionar a origem do débito', async () => {
    await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
  });

  await test.step('5. Salvar e confirmar o débito', async () => {
    await debitos.clicarSalvar();
    await debitos.confirmarSalvar();
  });

  await test.step('6. Voltar para a consulta e aguardar resultados', async () => {
    await debitos.voltarConsulta();
    await debitos.aguardarResultados();
  });
});

test('SD12 Cadastro com campos vazios', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Navegar para cadastro de débito', async () => {
    await debitos.clicarNovoDebito();
  });

  await test.step('3. Tentar salvar com campos vazios', async () => {
    await debitos.clicarSalvar();
  });

  await test.step('4. Verificar resultado', async () => {
    await debitos.aguardarResultados();
  });
});

test('SD13 Cadastro com CPF com letras', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Abrir formulário de cadastro', async () => {
    await debitos.clicarNovoDebito();
  });

  await test.step('3. Preencher dados com CPF inválido', async () => {
    await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorCadastro);
    await debitos.preencherCPFDevedor(debitosFixture.cpfInvalido);
    await debitos.preencherValorDebito(debitosFixture.valorDebito);
    await debitos.preencherDataDebito(debitosFixture.dataDebito);
    await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
  });

  await test.step('4. Salvar e confirmar', async () => {
    await debitos.clicarSalvar();
    await debitos.confirmarSalvar();
  });

  await test.step('5. Voltar para a consulta e aguardar resultados', async () => {
    await debitos.voltarConsulta();
    await debitos.aguardarResultados();
  });
});

test('SD14 Cadastro com valor de débito inválido', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Abrir formulário de cadastro', async () => {
    await debitos.clicarNovoDebito();
  });

  await test.step('3. Preencher dados com valor inválido', async () => {
    await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorCadastro);
    await debitos.preencherCPFDevedor(debitosFixture.cpfCadastro);
    await debitos.preencherValorDebito(debitosFixture.valorInvalido);
    await debitos.preencherDataDebito(debitosFixture.dataDebito);
    await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
  });

  await test.step('4. Salvar e confirmar', async () => {
    await debitos.clicarSalvar();
    await debitos.confirmarSalvar();
  });

  await test.step('5. Voltar para a consulta e aguardar resultados', async () => {
    await debitos.voltarConsulta();
    await debitos.aguardarResultados();
  });
});

test('SD15 Cadastro com valor R$0,00', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Abrir formulário de cadastro', async () => {
    await debitos.clicarNovoDebito();
  });

  await test.step('3. Preencher dados com valor zero', async () => {
    await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorCadastro);
    await debitos.preencherCPFDevedor(debitosFixture.cpfCadastro);
    await debitos.preencherValorDebito(debitosFixture.valorNulo);
    await debitos.preencherDataDebito(debitosFixture.dataDebito);
    await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
  });

  await test.step('4. Salvar e confirmar', async () => {
    await debitos.clicarSalvar();
    await debitos.confirmarSalvar();
  });

  await test.step('5. Voltar para a consulta e aguardar resultados', async () => {
    await debitos.voltarConsulta();
    await debitos.aguardarResultados();
  });
});

test('SD16 Cadastro com data futura', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Abrir formulário de cadastro', async () => {
    await debitos.clicarNovoDebito();
  });

  await test.step('3. Preencher dados com data futura', async () => {
    await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorCadastro);
    await debitos.preencherCPFDevedor(debitosFixture.cpfCadastro);
    await debitos.preencherValorDebito(debitosFixture.valorInvalido);
    await debitos.preencherDataDebito(debitosFixture.datainvalida);
    await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
  });

  await test.step('4. Salvar e confirmar', async () => {
    await debitos.clicarSalvar();
    await debitos.confirmarSalvar();
  });

  await test.step('5. Voltar para a consulta e aguardar resultados', async () => {
    await debitos.voltarConsulta();
    await debitos.aguardarResultados();
  });
});

test('SD18 Verificar que o identificador gerado segue o padrão AAAA.MM.SSSSSSS', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Abrir formulário de cadastro', async () => {
    await debitos.clicarNovoDebito();
  });

  await test.step('3. Preencher dados para gerar identificador', async () => {
    await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorInvalido);
    await debitos.preencherCPFDevedor(debitosFixture.cpfCadastro);
    await debitos.preencherValorDebito(debitosFixture.valorDebito);
    await debitos.preencherDataDebito(debitosFixture.dataDebito);
    await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
  });

  await test.step('4. Salvar e confirmar', async () => {
    await debitos.clicarSalvar();
    await debitos.confirmarSalvar();
  });

  await test.step('5. Voltar para a consulta e aguardar resultados', async () => {
    await debitos.voltarConsulta();
    await debitos.aguardarResultados();
  });
});

test('SD-19.1 Cancelar Cadastro - botão exibido com nome incorreto', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Abrir formulário de cadastro', async () => {
    await debitos.clicarNovoDebito();
  });

  await test.step('3. Preencher dados e verificar botão cancelar', async () => {
    await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorInvalido);
    await debitos.preencherCPFDevedor(debitosFixture.cpfCadastro);
    await debitos.preencherValorDebito(debitosFixture.valorDebito);
    await debitos.preencherDataDebito(debitosFixture.dataDebito);
    await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
    await debitos.clicarCanclear();
  });

  await test.step('4. Aguardar resultado', async () => {
    await debitos.aguardarResultados();
  });
});

test('SD-19.2 Cancelar Cadastro - validação do nome correto do botão', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Abrir formulário de cadastro', async () => {
    await debitos.clicarNovoDebito();
  });

  await test.step('3. Verificar nome do botão cancelar', async () => {
    await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorInvalido);
    await debitos.preencherCPFDevedor(debitosFixture.cpfCadastro);
    await debitos.preencherValorDebito(debitosFixture.valorDebito);
    await debitos.preencherDataDebito(debitosFixture.dataDebito);
    await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
    await debitos.clicarCancelar();
  });

  await test.step('4. Aguardar resultado', async () => {
    await debitos.aguardarResultados();
  });
});

test('SD20 Modal clicar Não', async ({ page }) => {
  await test.step('1. Abrir a página inicial', async () => {
    await debitos.visit();
  });

  await test.step('2. Abrir formulário de cadastro', async () => {
    await debitos.clicarNovoDebito();
  });

  await test.step('3. Preencher dados para salvar', async () => {
    await debitos.preencherNomeDevedor(debitosFixture.nomeDevedorCadastro);
    await debitos.preencherCPFDevedor(debitosFixture.cpfCadastro);
    await debitos.preencherValorDebito(debitosFixture.valorDebito);
    await debitos.preencherDataDebito(debitosFixture.dataDebito);
    await debitos.selecionarOrigem(debitosFixture.selecionarOrigem);
  });

  await test.step('4. Clicar salvar e escolher Não no modal', async () => {
    await debitos.clicarSalvar();
    await debitos.clicarNaoSalvar();
  });

  await test.step('5. Aguardar resultado', async () => {
    await debitos.aguardarResultados();
  });
});