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
    }

    // Preenche o campo Identificador para consulta
    async preencherIdentificador(identificador: string) {
        await this.page.getByPlaceholder("AAAA.MM.SSSSSSS").fill(identificador);
    }

    // Clica no botão Consultar para executar a pesquisa
    async clicarConsultar() {
        await this.page.getByRole('button', { name: 'Consultar' }).click();
    }

    // Aguarda um tempo fixo para o resultado aparecer na tela
    async aguardarResultados() {
        await this.page.waitForTimeout(3000);
    }

    // Preenche o campo Nome completo para consulta
    async preencherNome(nome: string) {
        await this.page.getByPlaceholder("Nome completo").fill(nome);
    }

    // Preenche o campo CPF para consulta
    async preencherCPF(cpf: string) {
        await this.page.getByPlaceholder("000.000.000-00").fill(cpf);
    }

    // Preenche o valor mínimo no filtro de valores
    async preencherValorMinimo(valorMinimo: string) {
        await this.page.getByPlaceholder("R$ 0,00").first().fill(valorMinimo);
    }

    // Preenche o valor máximo no filtro de valores
    async preencherValorMaximo(valorMaximo: string) {
        await this.page.getByPlaceholder("R$ 0,00").last().fill(valorMaximo);
    }

    // Preenche a data de início no filtro de período
    async preencherDataInicio(dataInicio: string) {
        await this.page.locator('input[type="date"]').first().fill(dataInicio);
    }

    // Preenche a data de fim no filtro de período
    async preencherDataFim(dataFim: string) {
        await this.page.locator('input[type="date"]').last().fill(dataFim);
    }

    // Preenche a data de início maior, usado para testes de validação de período
    async preencherDataInicioMaior(dataInicioMaior: string) {
        await this.page.locator('input[type="date"]').first().fill(dataInicioMaior);
    }

    // Preenche a data de fim menor, usado para testes de validação de período
    async preencherDataFimMenor(dataFimMenor: string) {
        await this.page.locator('input[type="date"]').last().fill(dataFimMenor);
    }

    // Clica no botão Limpar para resetar os filtros de consulta
    async clicarLimpar() {
        await this.page.getByText('Limpar', { exact: true }).click();
    }

    // Valida se os filtros foram limpos corretamente
    async validarFiltrosLimpos() {
        await expect(this.page.getByPlaceholder('000.000.000-00')).toHaveValue('');
    }

    // Clica para ver os detalhes do débito selecionado
    async clicarDetalhes() {
        await this.page.getByRole('button', { name: 'Ver Detalhes' }).click();
    }

    // =============================
    // Métodos de cadastro de débito
    // =============================

    // Clica no botão para iniciar o cadastro de um novo débito
    async clicarNovoDebito() {
        await this.page.getByRole('button', { name: '+ Novo Débito' }).click();
    }

    // Preenche o nome do devedor no formulário de cadastro
    async preencherNomeDevedor(nomeDevedor: string) {
        await this.page.getByPlaceholder("Nome completo do devedor").fill(nomeDevedor);
    }

    // Preenche o CPF do devedor no formulário de cadastro
    async preencherCPFDevedor(cpfDevedor: string) {
        await this.page.getByPlaceholder("000.000.000-00").fill(cpfDevedor);
    }

    // Preenche o valor do débito no formulário de cadastro
    async preencherValorDebito(valorDebito: string) {
        await this.page.getByPlaceholder("0,00").fill(valorDebito);
    }

    // Preenche a data do débito no formulário de cadastro
    async preencherDataDebito(dataDebito: string) {
        await this.page.locator('input[type="date"]').fill(dataDebito);
    }

    // Seleciona a origem do débito no formulário de cadastro
    async selecionarOrigem(origem: string) {
        await this.page.locator('select').selectOption(origem);
    }

    // Clica no botão Salvar para gravar o débito
    async clicarSalvar() {
        await this.page.getByRole('button', { name: 'Salvar' }).click();
    }

    // Confirma a ação de salvar o débito
    async confirmarSalvar() {
        await this.page.getByRole('button', { name: 'Sim, Salvar' }).click();
    }

    // Volta da tela de cadastro/detalhes para a consulta
    async voltarConsulta() {
        await this.page.getByRole('button', { name: '← Voltar para Consulta' }).click();
    }

    // Clica no botão Cancelar (Nome do botão correto) no formulário de débito
    async clicarCancelar() {
        await this.page.getByRole('button', { name: 'Canclear' }).click();
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
    }

    // Confirma que não deseja salvar as alterações
    async clicarNaoSalvar() {
        await this.page.getByRole('button', { name: 'Não' }).click();
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

        return {
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
    }
}
