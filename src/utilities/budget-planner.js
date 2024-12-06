import { setValue, getValue } from "./localStore";
import { showPromise } from "./localStore";
import { toast } from "sonner";

export const budgetAction = async ({ request }) => {
  console.log("called");

  const data = await request.formData();
  const actionType = data.get("_action");

  //add user
  if (actionType === "addUser") {
    try {
      const userName = data.get("username");
      setValue("userName", userName);
      toast.success(`Welcome ${userName}`, {
        description: `Your has been logged in Successfully`,
      });
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
      //show asynchronous
      await showPromise();
      setValue("budgets", JSON.stringify(budgets));
      toast.success("Budget has been Created", {
        description: `Your ${data.get("budgetName")} budget has been created successfully`,
      });
      return { budgets };
    } catch (e) {
      throw new Error("Error: There is a problem to create your budget");
    }
  }

  //delete budget
  if (actionType === "deleteBudget") {
    try {
      const budgets = deleteBudget({
        key: "budgets",
        id: data.get("budgetId"),
      });

      const expenses = deleteExpenses({
        key: "expenses",
        id: data.get("budgetId"),
      });

      //show asynchronous
      await showPromise();
      setValue("budgets", JSON.stringify(budgets));
      setValue("expenses", JSON.stringify(expenses));
      toast.success("Budget Deleted", {
        description: `Your budget has been deleted`,
      });
      return { budgets, expenses };
    } catch (e) {
      throw new Error("Error: There is a problem to delete your budget");
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
      //show asynchronous
      await showPromise();
      setValue("expenses", JSON.stringify(expenses));
      toast.success("Expense has been Created", {
        description: `Your ${data.get("expenseName")} expense has been created Successfully`,
      });
      return { expenses };
    } catch (e) {
      throw new Error("Error: There is a problem to create your expense");
    }
  }

  //delete expense
  if (actionType === "deleteExpense") {
    try {
      console.log("delete expense");
      const expenses = deleteExpense({
        key: "expenses",
        id: data.get("expenseId"),
      });

      setValue("expenses", JSON.stringify(expenses));
      toast.message("Deleted", {
        description: `Your expense has been deleted Successfully`,
      });
      return { expenses };
    } catch (e) {
      throw new Error("Error: There is a problem to delete expense");
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

export const deleteBudget = ({ key, id }) => {
  try {
    const existingBudgets = JSON.parse(getValue(key)) ?? [];
    const newBudgets = existingBudgets.filter((item) => item.id !== id);
    console.log(newBudgets);
    return newBudgets;
  } catch (e) {
    throw new Error("Error: Problem to delete a budget.");
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

export const deleteExpense = ({ key, id }) => {
  try {
    const existingExpenses = JSON.parse(getValue(key)) ?? [];
    const newExpenses = existingExpenses.filter((item) => item.id !== id);

    return newExpenses;
  } catch (e) {
    throw new Error("Error: Problem to create a expense.");
  }
};

export const deleteExpenses = ({ key, id }) => {
  try {
    const existingExpenses = JSON.parse(getValue(key)) ?? [];
    const newExpenses = existingExpenses.filter((item) => item.budgetId !== id);

    return newExpenses;
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
