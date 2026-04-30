
# Sistema de Gestão de Débitos - Automação de Testes E2E

Projeto de automação de testes end-to-end para o **Sistema de Gestão de Débitos — Dívida Ativa**.

A aplicação possui fluxos de consulta, cadastro e detalhes de débitos. Os testes foram desenvolvidos com foco na validação funcional, navegação entre telas, regras de negócio, campos obrigatórios, mensagens de validação e verificações de interface.

## Aplicação testada

URL da aplicação:

```bash
https://teste-qa-acesse.vercel.app
```

## Tecnologias utilizadas

- Playwright
- TypeScript
- Node.js
- Page Object Model
- Fixtures para massa de dados
- HTML Report do Playwright

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js
- npm
- Git
- Visual Studio Code ou outro editor de preferência
- Por padrão, o Playwright permite a execução dos testes em navegadores como **Chromium**, **Firefox** e **WebKit**, conforme a configuração definida no arquivo `playwright.config.ts`.
- Os navegadores utilizados nos testes são instalados pelo próprio Playwright por meio do comando: 
```bash
npx playwright install



Para verificar se o Node.js e o npm estão instalados:

```bash
node -v
npm -v
```

## Instalação do projeto

Clone o repositório:

```bash
git clone https://github.com/tacivitorino/-sistema-gestao-debito.git
```

Acesse a pasta do projeto:

```bash
cd SISTEMAGESTAODEBITO
```

Instale as dependências:

```bash
npm install
```

Instale os navegadores utilizados pelo Playwright:

```bash
npx playwright install
```

## Estrutura do projeto

```bash
SISTEMAGESTAODEBITO
├── .github
│   └── workflows
│       └── playwright.yml
├── fixtures
│   └── debitos.fixture.ts
├── pages
│   └── debitos.page.ts
├── tests
│   ├── cadastroDebito.spec.ts
│   ├── consultaDebito.spec.ts
│   ├── detalhe.spec.ts
│   └── interface.spec.ts
├── playwright-report
├── test-results
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
├── yarn.lock
└── README.md
```

## Organização do projeto

O projeto utiliza o padrão **Page Object Model**, separando as responsabilidades para melhorar a organização, a legibilidade e a manutenção dos testes.

- `pages/debitos.page.ts`: contém os métodos de interação com a aplicação.
- `fixtures/debitos.fixture.ts`: contém massas de dados e textos esperados.
- `tests/consultaDebito.spec.ts`: contém os cenários da tela de consulta.
- `tests/cadastroDebito.spec.ts`: contém os cenários da tela de cadastro.
- `tests/detalhe.spec.ts`: contém os cenários da tela de detalhes.
- `tests/interface.spec.ts`: contém validações de interface, ortografia e consistência de rótulos.

## Cenários contemplados

### Tela de Consulta de Débitos

- SD-01 Consultar por identificador
- SD-02 Consultar por nome
- SD-03 Consultar por CPF
- SD-04 Consultar por faixa de valores
- SD-05 Consultar por período
- SD-06 Validar período invertido
- SD-07 Limpar filtros
- SD-08 Consulta sem resultados
- SD-09 Navegar para detalhes
- SD-10 Navegar para cadastro

### Tela de Cadastro de Débito

- SD-11 Cadastro com dados válidos
- SD-12 Campos obrigatórios vazios
- SD-13 CPF com letras
- SD-14 Valor negativo
- SD-15 Valor zero
- SD-16 Data futura
- SD-17 Nome com números
- SD-18 Formato do identificador
- SD-19 Botão Cancelar
- SD-20 Modal — clicar Não

### Tela de Detalhes do Débito

- SD-21 Exibir todos os campos
- SD-22 Voltar para consulta

### Verificações de Interface

- SD-23 Ortografia do cabeçalho
- SD-24 Ortografia dos rótulos e títulos
- SD-25 Consistência de rótulos entre telas

## Como executar os testes

Para executar todos os testes em modo headless:

```bash
npx playwright test
```

Para executar os testes com o navegador aberto:

```bash
npx playwright test --headed
```

Para executar os testes no modo visual do Playwright:

```bash
npx playwright test --ui
```

Para executar um arquivo específico:

```bash
npx playwright test tests/consultaDebito.spec.ts
```

Para executar apenas os testes de cadastro:

```bash
npx playwright test tests/cadastroDebito.spec.ts
```

Para executar apenas os testes de detalhes:

```bash
npx playwright test tests/detalhe.spec.ts
```

Para executar apenas os testes de interface:

```bash
npx playwright test tests/interface.spec.ts
```

## Relatório de execução

Após executar os testes, o Playwright gera um relatório HTML com o resultado da execução.

Para abrir o relatório:

```bash
npx playwright show-report
```

O relatório apresenta:

- Cenários executados
- Status de sucesso ou falha
- Mensagens de erro
- Evidências da falha
- Screenshots, quando configurados
- Trace, quando habilitado

Para executar os testes com trace:

```bash
npx playwright test --trace=on
```

Depois, abra o relatório:

```bash
npx playwright show-report
```

## Execução com evidências

Para facilitar a análise de falhas, é possível executar os testes com trace habilitado:

```bash
npx playwright test --trace=on
```

Também é possível executar com navegador aberto para acompanhar o fluxo:

```bash
npx playwright test --headed
```

## Exemplos de validações realizadas

O projeto contempla validações como:

- Consulta de débitos por identificador, nome, CPF, valor e período.
- Validação de filtros preenchidos e filtros limpos.
- Navegação entre as telas de consulta, cadastro e detalhes.
- Validação de campos obrigatórios no cadastro.
- Validação de formatos, como CPF, data e identificador.
- Validação de botões e modais.
- Validação de textos, rótulos e títulos.
- Validação de consistência de rótulos entre telas.
- Validação de exibição dos campos na tela de detalhes.

## Evidências de inconsistências encontradas

Durante a automação, alguns cenários podem evidenciar inconsistências na aplicação, como:

- Campo **Origem do Débito** ausente na tela de Detalhes.
- Divergência entre rótulos exibidos em telas diferentes.
- Possíveis erros de ortografia em títulos ou rótulos.
- Diferenças entre o texto esperado e o texto apresentado na interface.

Essas inconsistências são registradas automaticamente no relatório do Playwright por meio das asserções dos testes.

### Verificações de Interface

- SD-23 Ortografia do cabeçalho
- SD-24 Ortografia dos rótulos e títulos
- SD-25 Consistência de rótulos entre telas

## Observações sobre cenários com inconsistências encontradas

Durante a automação, foram identificadas algumas inconsistências na aplicação. Para manter a rastreabilidade dos testes e evidenciar o comportamento encontrado, alguns cenários foram separados entre o comportamento atual da aplicação e o comportamento esperado pelo requisito.


## Observações sobre cenários com inconsistências encontradas

Durante a automação, foram identificadas algumas inconsistências na aplicação. Para manter a rastreabilidade dos testes e evidenciar o comportamento encontrado, alguns cenários foram separados entre o comportamento atual da aplicação e o comportamento esperado pelo requisito.

### Observação sobre o cenário SD-19 - Botão Cancelar

Durante a automação do cenário **SD-19 - Botão Cancelar**, foi identificada uma inconsistência no texto do botão na tela de cadastro.

O requisito esperado para o botão é:

```text
Cancelar
```

Porém, na aplicação, o botão está sendo exibido como:

```text
Canclear
```

Por esse motivo, foram criados dois cenários relacionados ao fluxo de cancelamento:

- **SD-19.1 Cancelar Cadastro - Nome do Botão Incorreto**  
  Cenário criado para evidenciar a inconsistência de ortografia do botão exibido na aplicação como `Canclear`.

- **SD-19.2 Cancelar Cadastro - Nome do Botão Correto**  
  Cenário criado considerando o comportamento esperado do sistema, validando que o botão deveria estar escrito como `Cancelar`.

Essa separação foi feita para documentar a falha de interface encontrada e, ao mesmo tempo, manter a rastreabilidade do comportamento esperado para o fluxo de cancelamento do cadastro.
