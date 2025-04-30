# Gerenciador de Despesas Simples

Este é um projeto front-end simples para gerenciar despesas pessoais, permitindo adicionar, visualizar e remover itens de uma lista, além de calcular o total gasto. Foi desenvolvido utilizando HTML, CSS (implícito, para a interface) e JavaScript puro para a lógica e manipulação do DOM.

## Funcionalidades

*   **Adicionar Despesa:** Permite inserir o nome da despesa, selecionar uma categoria e informar o valor.
*   **Formatação de Moeda:** O campo de valor formata automaticamente o número digitado para o padrão monetário brasileiro (BRL) enquanto o usuário digita.
*   **Listagem Dinâmica:** As despesas adicionadas são exibidas em uma lista, cada uma com um ícone representando sua categoria, nome, categoria e valor.
*   **Cálculo de Totais:** Atualiza automaticamente a soma total das despesas e a quantidade de itens na lista.
*   **Remover Despesa:** Cada item da lista possui um ícone para removê-lo individualmente. A remoção atualiza os totais.
*   **Limpeza de Formulário:** Após adicionar uma despesa, o formulário é limpo automaticamente para facilitar novas inserções.

## Tecnologias Utilizadas

*   HTML5
*   CSS3 (para estilização visual - não incluído no script, mas essencial para a interface)
*   JavaScript (Vanilla JS)

## Como Executar

1.  **Clone ou baixe** este repositório (ou certifique-se de ter os arquivos `index.html`, `styles.css` e `script.js` na mesma pasta).
2.  **Crie uma pasta `img`** no mesmo diretório dos arquivos HTML/CSS/JS.
3.  **Adicione os ícones** das categorias à pasta `img`. Os nomes dos arquivos devem corresponder aos `value` das `<option>` no `<select>` de categorias (ex: `1.svg`, `2.svg`, `alimentacao.svg`, etc.).
4.  **Adicione o ícone de remoção** (`remove.svg`) à pasta `img`.
5.  **Abra o arquivo `index.html`** em seu navegador web de preferência (Chrome, Firefox, Edge, etc.).

## Estrutura do Código (`script.js`)

O arquivo `script.js` contém toda a lógica da aplicação:

*   **Seleção de Elementos:** Referências aos elementos HTML (formulário, inputs, lista, áreas de total) são obtidas usando `document.querySelector` e `document.getElementById`.
*   **Manipuladores de Eventos:**
    *   `amount.oninput`: Formata o valor monetário em tempo real.
    *   `form.onsubmit`: Captura os dados do formulário, previne o recarregamento da página, cria um objeto de despesa e chama a função para adicionar o item à lista.
    *   `expenseList.addEventListener('click', ...)`: Delega o evento de clique na lista para identificar cliques no ícone de remoção e remover o item correspondente.
*   **Funções Principais:**
    *   `formatCurrencyBRL(value)`: Formata um número para a string de moeda BRL.
    *   `expenseAdd(newExpense)`: Cria os elementos HTML para um novo item de despesa e o adiciona à lista no DOM.
    *   `updateTotals()`: Calcula e atualiza a quantidade de despesas e o valor total exibido.
    *   `formClear()`: Limpa os campos do formulário após a submissão.

