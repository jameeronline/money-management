import {
  Link,
  redirect,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import ExpenseTable from "../components/expense-table";
import { Button } from "@/components/ui/button";
import { getValue, setValue, showPromise } from "../utilities/localStore";
import {
  deleteExpense,
  createExpense,
  deleteBudget,
  deleteExpenses,
} from "../utilities/budget-planner";
import { toast } from "sonner";
import { getMatchingAllItems } from "../utilities/functions";
import BudgetItem from "../components/budget-Item";
import AddExpenseForm from "../components/add-expense-form";
import { BudgetChart } from "../components/budget-chart";

export const budgetDetailsLoader = async ({ params }) => {
  const budgets = await getMatchingAllItems({
    category: "budgets",
    key: "id",
    value: params.id,
  });

  const expenses = getMatchingAllItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  return { expenses, budgets };
};

export const budgetDetailsAction = async ({ request }) => {
  console.log("called");

  const data = await request.formData();
  const actionType = data.get("_action");

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
      redirect("/");
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
      //show asynchronus
      await showPromise();
      setValue("expenses", JSON.stringify(expenses));
      toast.message("Expense has been Created", {
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

const BudgetDetails = () => {
  const navigate = useNavigate();
  const { budgets, expenses } = useLoaderData();
  const isExpenses = expenses && expenses.length > 0 ? true : false;

  return (
    <section>
      <div className="prose mb-10">
        <h1>
          <span className="text-teal-500">{budgets[0]?.name}</span> Budget
          Overview
        </h1>
      </div>

      <section className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-4">
          <div className="flex flex-col gap-6">
            {budgets &&
              budgets.map((budget) => (
                <BudgetItem
                  key={budget.id}
                  budget={budget}
                  showDelete={true}
                  showEdit={true}
                />
              ))}
          </div>
        </div>
        <div className="col-span-4">
          <AddExpenseForm budgets={JSON.stringify(budgets)} />
        </div>

        <div className="col-span-4">
          <BudgetChart data={expenses} />
        </div>
      </section>

      {isExpenses && (
        <section className="mt-10">
          <ExpenseTable
            expenses={JSON.stringify(expenses)}
            showCategory={false}
          />
        </section>
      )}

      <div className="text-center mt-8">
        <Button
          className="h-10"
          onClick={() => navigate(-1)}
          variant="secondary"
        >
          Back
        </Button>
      </div>
    </section>
  );
};

export default BudgetDetails;
