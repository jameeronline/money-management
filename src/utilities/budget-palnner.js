import { setValue, getValue } from "../utilities/localStore";

export const budgetAction = async ({ request }) => {
  console.log("called");

  const data = await request.formData();
  const actionType = data.get("_action");

  //console.log(actionType);
  //console.log(data);
  //console.log(Object.fromEntries(data));

  //add user
  if (actionType === "addUser") {
    try {
      const userName = data.get("username");
      setValue("userName", userName);
      return { userName };
    } catch (e) {
      throw new Error("Error: There is a problem to create your account");
    }
  }

  //add budget
  if (actionType === "addBudget") {
    try {
      const budgets = createBudget({
        name: data.get("budgetName"),
        amount: data.get("budgetAmount"),
        category: data.get("budgetCategory"),
        description: data.get("description"),
      });
      console.log(budgets);
      setValue("budgets", JSON.stringify(budgets));
      return { budgets };
    } catch (e) {
      throw new Error("Error: There is a problem to create your account");
    }
  }

  //add expense
  if (actionType === "addExpense") {
    try {
      const expenses = createExpense({
        name: data.get("expenseName"),
        amount: data.get("expenseAmount"),
        budgetId: data.get("expenseCategory"),
      });
      //console.log(expenses);
      setValue("expenses", JSON.stringify(expenses));
      return { expenses };
    } catch (e) {
      throw new Error("Error: There is a problem to create your account");
    }
  }
};

export const budgetLoader = () => {
  const userName = getValue("userName");
  const budgets = getValue("budgets");
  const expenses = getValue("expenses");
  return { userName, budgets, expenses };
};

export const createBudget = ({ name, amount, category, description }) => {
  try {
    const newBudget = {
      id: crypto.randomUUID(),
      name: name,
      amount: +amount,
      createdAt: Date.now(),
      category: category,
      description: description ?? "",
    };

    const existingBudgets = JSON.parse(getValue("budgets")) ?? [];
    return [...existingBudgets, newBudget];
  } catch (e) {
    throw new Error("Error: Problem to create a budget.");
  }
};

export const createExpense = ({ name, amount, budgetId }) => {
  try {
    const newExpense = {
      id: crypto.randomUUID(),
      name: name,
      amount: +amount,
      createdAt: Date.now(),
      budgetId: budgetId,
    };

    const existingExpenses = JSON.parse(getValue("expenses")) ?? [];
    return [...existingExpenses, newExpense];
  } catch (e) {
    throw new Error("Error: Problem to create a expense.");
  }
};

export const findSpendingByBudgetId = (budgetId) => {
  const expenses = JSON.parse(getValue("expenses")) ?? [];

  const spending = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;

    return acc + expense.amount;
  }, 0);

  return spending;
};
