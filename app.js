
//===================================================
const expenses = [];

// Load expenses from local storage when the page loads
window.onload = function () {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (storedExpenses) {
        expenses.push(...storedExpenses);
        updateTable();
        updateTotalExpenses();
    }
};

function addExpense() {
    const dateInput = document.getElementById('date');
    const categoryInput = document.getElementById('category');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');

    const date = dateInput.value;
    const category = categoryInput.value;
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);

    if (!date || !category || !description || isNaN(amount)) {
        document.getElementById('error').innerText = 'Please fill in all fields and provide a valid amount.';
        return;
    }

    document.getElementById('error').innerText = '';

    const expense = { date, category, description, amount };
    expenses.push(expense);

    // Save expenses to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    updateTable();
    updateTotalExpenses();
    document.getElementById('output').innerText = 'Expense added successfully!';

    // Clear form fields
    dateInput.value = '';
    categoryInput.value = '';
    descriptionInput.value = '';
    amountInput.value = '';
    // editExpense();
}






function updateTable() {
    const tableBody = document.getElementById('expense-body');
    tableBody.innerHTML = '';

    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = expense.date;
        row.insertCell(1).innerText = expense.category;
        row.insertCell(2).innerText = expense.description;
        row.insertCell(3).innerText = expense.amount.toFixed(2);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';

        deleteButton.onclick = function () {
            deleteExpense(i);
        };
        editButton.onclick = function () {
            editExpense(i);
        };

        row.insertCell(4).appendChild(deleteButton);
        row.insertCell(5).appendChild(editButton);
    }
}
function deleteExpense(index) {
    expenses.splice(index, 1);
    // Save expenses to local storage after deletion
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateTable();
    updateTotalExpenses();
    document.getElementById('output').innerText = 'Expense deleted successfully!';
}
function editExpense(index) {
    const expense = expenses[index];
    // Populate input fields with existing values
    document.getElementById('date').value = expense.date;
    document.getElementById('category').value = expense.category;
    document.getElementById('description').value = expense.description;
    document.getElementById('amount').value = expense.amount;

    // Change addExpense function to update the existing expense
    const addButton = document.getElementById('add-button');
    addButton.textContent = 'Update Expense';
    addButton.onclick = function () {
        updateExpense(index);
    };
}

function updateExpense(index) {
    const dateInput = document.getElementById('date');
    const categoryInput = document.getElementById('category');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');

    const date = dateInput.value;
    const category = categoryInput.value;
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);

    if (!date || !category || !description || isNaN(amount)) {
        document.getElementById('error').innerText = 'Please fill in all fields and provide a valid amount.';
        return;
    }

    document.getElementById('error').innerText = '';

    // Update the existing expense at the specified index
    expenses[index] = { date, category, description, amount };

    // Save expenses to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    updateTable();
    updateTotalExpenses();
    document.getElementById('output').innerText = 'Expense updated successfully!';

    // Reset button text and click handler
    const addButton = document.getElementById('add-button');
    addButton.textContent = 'Add Expense';
    addButton.onclick = addExpense;

    // Clear form fields
    dateInput.value = '';
    categoryInput.value = '';
    descriptionInput.value = '';
    amountInput.value = '';
}
function updateTotalExpenses() {
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const totalExpensesElement = document.getElementById('total-expenses');
    totalExpensesElement.innerHTML = `<p>Total Expenses: <strong>${totalExpenses.toFixed(2)}</strong></p>`;
}





