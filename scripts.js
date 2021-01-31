const Modal = {
  toggleActive() {
    document
      .querySelector('.modal-overlay')
        .classList
          .toggle('active');
  }
};

const Transaction = {
  all: [
    {
      description: 'Luz',
      amount: -50000,
      date: '23/01/2021',
    },
    {
      description: 'Criação Website',
      amount: 500000,
      date: '25/01/2021',
    },
    {
      description: 'Internet',
      amount: -20000,
      date: '28/01/2021',
    },
  ],

  add(transaction) {
    Transaction.all.push(transaction);
   
    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);

    App.reload();
  },

  incomes() {
    let income = 0;

    Transaction.all.forEach(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });

    return income;
  },

  expenses() {
    let expense = 0;

    Transaction.all .forEach(transaction => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });

    return expense;
  },

  total() {
    return Transaction.incomes() + Transaction.expenses();
  },
};

const DOM = {
  transactionContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr');

    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const {id, description, amount, date} = transaction;

    const classCSS = amount > 0 ? "income" : "expense";

    amountFormatted = Utils.formatCurrency(amount);

    const html = `
      <td class="description">${description}</td>
      <td class="${classCSS}">${amountFormatted}</td>
      <td class="date">${date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Remover transação">
      </td>
    `;

    return html;
  },

  transactionsIsEmpty() {
    if (Transaction.all.length != 0) {
      document.querySelector('span.help').remove();
    }
  },

  updateBalance() {
    const { incomes, expenses, total } = Transaction;
    const { formatCurrency } =  Utils;

    document
      .getElementById('incomeDisplay')
      .innerHTML = formatCurrency(incomes());

    document
      .getElementById('expenseDisplay')
      .innerHTML = formatCurrency(expenses());

      document
      .getElementById('totalDisplay')
      .innerHTML = formatCurrency(total());
  },

  clearTransactions() {
    DOM.transactionContainer.innerHTML = "";
  },
};

const Utils = {
  formatAmount(value) {
    return Number(value) * 100;
  },

  formatDate(value) {
    const splittedDate = value.split("-");

    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },

  formatCurrency(value) {
    const signal = Number(value) > 0 ? "" : "-";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL" 
    });

    return signal + value;
  }
};

const App = {
  init() {    
    Transaction.all.forEach(transaction => {
      DOM.addTransaction(transaction);
    });
    
    DOM.updateBalance();
  },

  reload() {
    DOM.clearTransactions();
  
    App.init();
  }
};

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    };
  },
   
  validateFields() {
    const { description, amount, date } = Form.getValues();

    if (
      description.trim() === "" || 
      amount.trim() === "" || 
      date.trim() === "") {
        throw new Error("Por favor, preencha todos os campos");
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues();

    amount = Utils.formatAmount(amount);

    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date
    };
  },

  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validateFields();

      const transaction = Form.formatValues(); 

      Transaction.add(transaction);

      Form.clearFields();

      Modal.toggleActive();
    } catch (error) {
      alert(error.message);
    }
  },
}

DOM.transactionsIsEmpty();

App.init();