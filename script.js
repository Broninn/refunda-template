// Selecionar os elementos do formulário
const form = document.querySelector("form");
const inputAmount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//Seleciona os elementos da lista
const expenseList = document.querySelector("ul");

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
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas");
    console.log(error);
  }
}
