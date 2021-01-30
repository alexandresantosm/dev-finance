const Modal = {
  toggleActive() {
    document
      .querySelector('.modal-overlay')
        .classList
          .toggle('active');
  }
};

const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021',
  },
  {
    id: 2,
    description: 'Criação Website',
    amount: 500000,
    date: '25/01/2021',
  },
  {
    id: 3,
    description: 'Internet',
    amount: -20000,
    date: '28/01/2021',
  },
];

const Transaction = {
  incomes() {

  },

  expenses() {

  },

  total() {

  }
}

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
  }
}

const Utils = {
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
}

if (transactions.length != 0) {
  document.querySelector('span.help').remove();
}

transactions.forEach(transaction => {
  DOM.addTransaction(transaction);
});