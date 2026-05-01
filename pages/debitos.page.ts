
import { expect, Page } from '@playwright/test';
export class DebitosPage {

    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    // =============================
    // Métodos de consulta de débito
    // =============================

    // Navega para a página inicial do sistema de débitos
    async visit() {
        await this.page.goto('https://teste-qa-acesse.vercel.app');
        console.log(`👁️ Navegou para a página inicial`);
    }

    // Preenche o campo Identificador para consulta
    async preencherIdentificador(identificador: string) {
        await this.page.getByPlaceholder("AAAA.MM.SSSSSSS").fill(identificador);
        console.log(`✏️ Preencheu Identificador: ${identificador}`);
    }

    // Clica no botão Consultar para executar a pesquisa
    async clicarConsultar() {
        await this.page.getByRole('button', { name: 'Consultar' }).click();
        console.log(`🔎 Clicou no botão: "Consultar"`);
    }

    // Aguarda um tempo fixo para o resultado aparecer na tela
    async aguardarResultados() {
        await this.page.waitForTimeout(3000);
        console.log(`⏳ Aguardando 3 segundos para os resultados aparecerem`);
    }

    // Preenche o campo Nome completo para consulta
    async preencherNome(nome: string) {
        await this.page.getByPlaceholder("Nome completo").fill(nome);
        console.log(`✏️ Preencheu Nome: ${nome}`);
    }

    // Preenche o campo CPF para consulta
    async preencherCPF(cpf: string) {
        await this.page.getByPlaceholder("000.000.000-00").fill(cpf);
        console.log(`✏️ Preencheu CPF: ${cpf}`);
    }

    // Preenche o valor mínimo no filtro de valores
    async preencherValorMinimo(valorMinimo: string) {
        await this.page.getByPlaceholder("R$ 0,00").first().fill(valorMinimo);
        console.log(`✏️ Preencheu Valor Mínimo: ${valorMinimo}`);
    }

    // Preenche o valor máximo no filtro de valores
    async preencherValorMaximo(valorMaximo: string) {
        await this.page.getByPlaceholder("R$ 0,00").last().fill(valorMaximo);
        console.log(`✏️ Preencheu Valor Máximo: ${valorMaximo}`);
    }

    // Preenche a data de início no filtro de período
    async preencherDataInicio(dataInicio: string) {
        await this.page.locator('input[type="date"]').first().fill(dataInicio);
        console.log(`✏️ Preencheu Data de Início: ${dataInicio}`);
    }

    // Preenche a data de fim no filtro de período
    async preencherDataFim(dataFim: string) {
        await this.page.locator('input[type="date"]').last().fill(dataFim);
        console.log(`✏️ Preencheu Data de Fim: ${dataFim}`);
    }

    // Preenche a data de início maior, usado para testes de validação de período
    async preencherDataInicioMaior(dataInicioMaior: string) {
        await this.page.locator('input[type="date"]').first().fill(dataInicioMaior);
        console.log(`✏️ Preencheu Data de Início Maior (validação): ${dataInicioMaior}`);
    }

    // Preenche a data de fim menor, usado para testes de validação de período
    async preencherDataFimMenor(dataFimMenor: string) {
        await this.page.locator('input[type="date"]').last().fill(dataFimMenor);
        console.log(`✏️ Preencheu Data de Fim Menor (validação): ${dataFimMenor}`);
    }

    // Clica no botão Limpar para resetar os filtros de consulta
    async clicarLimpar() {
        await this.page.getByText('Limpar', { exact: true }).click();
        console.log(`🔄 Clicou no botão: "Limpar"`);
    }

    // Valida se os filtros foram limpos corretamente
    async validarFiltrosLimpos() {
        await expect(this.page.getByPlaceholder('000.000.000-00')).toHaveValue('');
        console.log(`✅ Validou que os filtros foram limpos corretamente`);
    }

    // Clica para ver os detalhes do débito selecionado
    async clicarDetalhes() {
        await this.page.getByRole('button', { name: 'Ver Detalhes' }).click();
        console.log(`👁️ Clicou no botão: "Ver Detalhes"`);
    }

    // =============================
    // Métodos de cadastro de débito
    // =============================

    // Clica no botão para iniciar o cadastro de um novo débito
    async clicarNovoDebito() {
        await this.page.getByRole('button', { name: '+ Novo Débito' }).click();
        console.log(`✅ Clicou no botão: "+ Novo Débito"`);
    }

    // Preenche o nome do devedor no formulário de cadastro
    async preencherNomeDevedor(nomeDevedor: string) {
        await this.page.getByPlaceholder("Nome completo do devedor").fill(nomeDevedor);
        console.log(`✏️ Preencheu Nome do Devedor: ${nomeDevedor}`);
    }

    // Preenche o CPF do devedor no formulário de cadastro
    async preencherCPFDevedor(cpfDevedor: string) {
        await this.page.getByPlaceholder("000.000.000-00").fill(cpfDevedor);
        console.log(`✏️ Preencheu CPF do Devedor: ${cpfDevedor}`);
    }

    // Preenche o valor do débito no formulário de cadastro
    async preencherValorDebito(valorDebito: string) {
        await this.page.getByPlaceholder("0,00").fill(valorDebito);
        console.log(`✏️ Preencheu Valor do Débito: ${valorDebito}`);
    }

    // Preenche a data do débito no formulário de cadastro
    async preencherDataDebito(dataDebito: string) {
        await this.page.locator('input[type="date"]').fill(dataDebito);
        console.log(`✏️ Preencheu Data do Débito: ${dataDebito}`);
    }

    // Seleciona a origem do débito no formulário de cadastro
    async selecionarOrigem(origem: string) {
        await this.page.locator('select').selectOption(origem);
        console.log(`✏️ Selecionou Origem: ${origem}`);
    }

    // Clica no botão Salvar para gravar o débito
    async clicarSalvar() {
        await this.page.getByRole('button', { name: 'Salvar' }).click();
        console.log(`💾 Clicou no botão: "Salvar"`);
    }

    // Confirma a ação de salvar o débito
    async confirmarSalvar() {
        await this.page.getByRole('button', { name: 'Sim, Salvar' }).click();
        console.log(`✅ Confirmou para Salvar o Débito`);
    }

    // Volta da tela de cadastro/detalhes para a consulta
    async voltarConsulta() {
        await this.page.getByRole('button', { name: '← Voltar para Consulta' }).click();
        console.log(`🔄 Clicou no botão: "Voltar para Consulta"`);
    }

    // Clica no botão Cancelar (Nome do botão correto) no formulário de débito
    async clicarCancelar() {
        await this.page.getByRole('button', { name: 'Canclear' }).click();
        console.log(`❌ Clicou no botão: "Cancelar"`);
    }

    // Clica no botão Cancelar (Nome do botão Incorreto) no formulário de débito
    async clicarCanclear() {
        const botaoCancelar = this.page.getByRole('button', {
    name: /Cancelar|Canclear/i,
  });

  const textoAtual = (await botaoCancelar.textContent())
    ?.replace(/\s+/g, ' ')
    .trim();

  expect(
    textoAtual,
    'Nome do botão Cancelar está incorreto no formulário de débito'
  ).toBe('Cancelar');
        console.log(`✅ Validou o nome do botão Cancelar: ${textoAtual}`);
    }

    // Confirma que não deseja salvar as alterações
    async clicarNaoSalvar() {
        await this.page.getByRole('button', { name: 'Não' }).click();
        console.log(`❌ Clicou no botão: "Não" - Descartou alterações`);
    }

    // =============================
    // Métodos de validação de interface
    // =============================

    // Valida o título do cabeçalho na página atual
    async validarTituloCabecalho(tituloEsperado: string) {
        const tituloCabecalho = this.page
            .locator('div[style*="font-size: 20px"][style*="font-weight: 700"]')
            .first();

        const textoAtual = (await tituloCabecalho.textContent())
            ?.replace('⚖️', '')
            .trim();

        expect(textoAtual).toBe(tituloEsperado);
        console.log(`✅ Validou o título do cabeçalho: "${textoAtual}"`);
    }

    // Valida se os rótulos dos filtros exibidos correspondem ao esperado
    async validarOrtografiaRotulosFiltros(rotulosEsperados: string[]) {
        const rotulos = this.page.locator('label');

        await expect(rotulos).toHaveCount(rotulosEsperados.length);

        const textosAtuais = (await rotulos.allTextContents()).map((texto) =>
            texto.replace(/\s+/g, ' ').trim().toLocaleUpperCase('pt-BR')
        );

        const textosEsperadosNormalizados = rotulosEsperados.map((texto) =>
            texto.replace(/\s+/g, ' ').trim().toLocaleUpperCase('pt-BR')
        );

        expect(textosAtuais).toEqual(textosEsperadosNormalizados);
        console.log(`✅ Validou os rótulos dos filtros: ${JSON.stringify(textosAtuais)}`);
    }

    // =============================
    // Métodos utilitários de texto
    // =============================

    // Normaliza texto para comparação uniforme
    normalizarTexto(texto: string) {
        return texto
            .replace(/\s+/g, ' ')
            .trim()
            .toLocaleUpperCase('pt-BR')
            .replace(/N°/g, 'Nº');
    }

    // Extrai os rótulos de débito presentes no texto da tela
    extrairRotulosDebito(textoDaTela: string) {
        const texto = this.normalizarTexto(textoDaTela);

        const rotulos = {
            identificador: texto.includes('Nº IDENTIFICADOR') ? 'Nº IDENTIFICADOR' : '',
            nomeDevedor: texto.includes('NOME DO DEVEDOR') ? 'NOME DO DEVEDOR' : '',
            cpfDevedor: texto.includes('CPF DO DEVEDOR') ? 'CPF DO DEVEDOR' : '',
            valorDebito: texto.includes('VALOR DO DÉBITO (R$)')
                ? 'VALOR DO DÉBITO (R$)'
                : texto.includes('VALOR DO DÉBITO')
                    ? 'VALOR DO DÉBITO'
                    : '',
            dataDebito: texto.includes('DATA DO DÉBITO') ? 'DATA DO DÉBITO' : '',
            origemDebito: texto.includes('ORIGEM DO DÉBITO') ? 'ORIGEM DO DÉBITO' : '',
        };
        console.log(`📋 Extraiu rótulos de débito: ${JSON.stringify(rotulos)}`);
        return rotulos;
    }

    // Retorna os rótulos presentes na tela de cadastro de débito
    async obterRotulosTelaCadastroDebito() {
        await expect(this.page.getByRole('button', { name: /Salvar/i })).toBeVisible();

        const textoDaTela = await this.page.locator('body').innerText();
        const rotulos = this.extrairRotulosDebito(textoDaTela);

        console.log('RÓTULOS CADASTRO:', rotulos);

        return rotulos;
    }

    // Retorna os rótulos presentes na tela de detalhes do débito
    async obterRotulosTelaDetalhesDebito() {
        await expect(this.page.getByRole('button', { name: /Voltar para Consulta/i })).toBeVisible();

        const textoDaTela = await this.page.locator('body').innerText();
        const rotulos = this.extrairRotulosDebito(textoDaTela);

        console.log('RÓTULOS DETALHES:', rotulos);

        return rotulos;
    }

    // Abre os detalhes do primeiro débito listado nos resultados
    async abrirDetalhesPrimeiroDebito() {
        await this.page
            .getByRole('button', { name: 'Ver Detalhes' })
            .first()
            .click();

        await expect(this.page.getByRole('button', { name: /Voltar para Consulta/i })).toBeVisible();
        console.log(`👁️ Abriu os detalhes do primeiro débito listado`);
    }

    // Obtém os cabeçalhos da tabela de resultados da consulta
    async obterCabecalhosResultadoConsulta() {
        await expect(this.page.getByText(/Resultado da Consulta/i)).toBeVisible();

        const cabecalhos = await this.page.locator('table thead th').allTextContents();

        const rotulos = cabecalhos.map((texto) => this.normalizarTexto(texto));

        console.log('CABEÇALHOS RESULTADO:', rotulos);

        return {
            identificador: rotulos.find((r) => r.includes('IDENTIFICADOR')) ?? '',
            nomeDevedor: rotulos.find((r) => r === 'NOME' || r.includes('NOME DO DEVEDOR')) ?? '',
            cpfDevedor: rotulos.find((r) => r === 'CPF' || r.includes('CPF DO DEVEDOR')) ?? '',
            valorDebito: rotulos.find((r) => r === 'VALOR' || r.includes('VALOR DO DÉBITO')) ?? '',
            dataDebito: rotulos.find((r) => r === 'DATA' || r.includes('DATA DO DÉBITO')) ?? '',
            origemDebito: rotulos.find((r) => r === 'ORIGEM' || r.includes('ORIGEM DO DÉBITO')) ?? '',
        };
    }

    // =============================
    // Métodos gerais de interface
    // =============================

    // Valida o título exibido na página de detalhes do débito
    async validarTitulo(tituloEsperado: string) {
        const tituloTela = this.page
            .locator('div[style*="font-size: 18px"][style*="font-weight: 700"]')
            .first();

        const tituloAtual = (await tituloTela.textContent())
            ?.replace(/[^\p{L}\p{N}\sº°$()]/gu, '')
            .replace(/\s+/g, ' ')
            .trim();

        expect(tituloAtual).toBe(tituloEsperado);
        console.log(`✅ Validou o título da página: "${tituloAtual}"`);
    };

    // Métodos da tela de detalhes do débito
    async validarCamposExibidosDetalhesDebito() {
        await expect(
            this.page.getByRole('button', { name: /Voltar para Consulta/i })
        ).toBeVisible();

        const textoTela = (await this.page.locator('body').innerText())
            .replace(/\s+/g, ' ')
            .trim()
            .toLocaleUpperCase('pt-BR');

        expect.soft(
            textoTela,
            'Campo Identificador está sendo exibido na tela de Detalhes'
        ).toContain('IDENTIFICADOR');

        expect.soft(
            textoTela,
            'Campo Nome está sendo exibido na tela de Detalhes'
        ).toContain('NOME DO DEVEDOR');

        expect.soft(
            textoTela,
            'Campo CPF está sendo exibido na tela de Detalhes'
        ).toContain('CPF DO DEVEDOR');

        expect.soft(
            textoTela,
            'Campo Valor está sendo exibido na tela de Detalhes'
        ).toContain('VALOR DO DÉBITO');

        expect.soft(
            textoTela,
            'Campo Data está sendo exibido na tela de Detalhes'
        ).toContain('DATA DO DÉBITO');

        expect.soft(
            textoTela,
            'Campo Origem NÂO está sendo exibido na tela de Detalhes'
        ).toContain('ORIGEM');
        console.log(`✅ Validou todos os campos exibidos na tela de Detalhes`);
    }
}
