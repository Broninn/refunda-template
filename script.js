// Selecionar os elementos do formulário
const form = document.querySelector("form");
const inputAmount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//Seleciona os elementos da lista
const expenseList = document.querySelector("ul");
const expensesTotal = document.querySelector("aside header h2");
const expensesQuantity = document.querySelector("aside header p span");

// Captura o evento de input para formatar o valor
amount.oninput = () => {
  // Obtém o valor atual do input e remove os caracteres não numéricos
  let value = amount.value.replace(/\D/g, "");

  //Transformar o valor em centavos
  value = Number(value) / 100;

  //Atualiza o valor do input
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  // Formata o valor no padrão BRL
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value;
}

// Captura o evento de submit do formulario para obter os valores
form.onsubmit = (event) => {
  // previne o comportamento padrao de reloado ao submit
  event.preventDefault();

  // Cria um objeto com os detalhes da nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
  try {
    //cria o elemento para adicionar na lista
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // Cria o icone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // Cria a info da despesa

    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // Cria o nome da despesa

    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // Cria a categoria da despesa

    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // Adiciona nome e categoria na div das informações da despesa

    expenseInfo.appendChild(expenseName);
    expenseInfo.appendChild(expenseCategory);

    // Cria o valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    // Adiciona o icone de remover da lista

    const expenseRemoveIcon = document.createElement("img");
    expenseRemoveIcon.classList.add("remove-icon");
    expenseRemoveIcon.setAttribute("src", `img/remove.svg`);
    expenseRemoveIcon.setAttribute("alt", "remover");

    // Adiciona as informações no item
    expenseItem.append(
      expenseIcon,
      expenseInfo,
      expenseAmount,
      expenseRemoveIcon
    );

    //Adiciona o item na lista
    expenseList.append(expenseItem);

    //Atualiza os totais
    updateTotals();
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas");
    console.log(error);
  }
}

//Atualiza totais

function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children;

    //atualiza quantidade de itens na lista
    expensesQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;

    // Variavel para incrementar o total
    let total = 0;

    //percorre cada item da lista
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");

      //remover caracterer nao numericos e substituir virgula pelo ponto
      let value = itemAmount.textContent
        .replace(/[^\d]/g, "")
        .replace(",", ".");

      // converte valor para float
      value = parseFloat(value);

      // Verifica se é numero valido
      if (isNaN(value)) {
        return alert("Não foi possível calcular o total");
      }

      // Incrementar o valor total
      total += Number(value);
    }

    expensesTotal.textContent = total
  } catch (error) {
    console.log(error);
    alert("Não foi possível atualizar os totais");
  }
}
