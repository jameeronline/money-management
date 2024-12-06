import { redirect } from "react-router-dom";
import {
  deleteBudget,
  deleteExpense,
  deleteExpenses,
} from "../utilities/budget-planner";
import { toast } from "sonner";
import { setValue } from "../utilities/localStore";

export function deleteBudgetAction({ params }) {
  try {
    const budgets = deleteBudget({
      key: "budgets",
      id: params.id,
    });

    const expenses = deleteExpenses({
      key: "expenses",
      id: params.id,
    });

    setValue("budgets", JSON.stringify(budgets));
    setValue("expenses", JSON.stringify(expenses));
    toast.success("Your Budget Deleted");
  } catch (e) {
    throw new Error("Problem to delete the budget");
  }

  return redirect("/");
}
