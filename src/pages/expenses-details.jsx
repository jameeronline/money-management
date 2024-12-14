import { Link, useLoaderData, useNavigate } from "react-router-dom";
import ExpenseTable from "../components/expense-table";
import { Button } from "@/components/ui/button";
import { getValue, setValue } from "../utilities/localStore";
import { deleteExpense, editExpense } from "../utilities/budget-planner";
import { toast } from "sonner";

export const expensesLoader = () => {
  const expenses = getValue("expenses");
  return { expenses };
};

export const expensesAction = async ({ request }) => {
  console.log("called");

  const data = await request.formData();
  const actionType = data.get("_action");

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

  //edit expense
  if (actionType === "editExpense") {
    try {
      console.log("edit expense");
      console.log("form action");

      const expenses = editExpense({
        key: "expenses",
        id: data.get("expenseId"),
        name: data.get("expenseName"),
        amount: data.get("expenseAmount"),
      });

      setValue("expenses", JSON.stringify(expenses));
      toast.message("Updated", {
        description: `Your expense has been updated Successfully`,
      });
      return { expenses };
    } catch (e) {
      throw new Error("Error: There is a problem to delete expense");
    }
  }
};

const ExpensesPage = () => {
  const navigate = useNavigate();
  const { expenses } = useLoaderData();
  const isExpenses = expenses && JSON.parse(expenses).length > 0 ? true : false;

  return (
    <>
      <section>
        <div className="prose mb-10">
          <h1>All Expenses</h1>
        </div>
        {JSON.parse(expenses).length > 0 ? (
          <ExpenseTable expenses={expenses} showEdit={true} />
        ) : (
          <span>No Expense Items</span>
        )}
        <div className="text-center mt-8">
          <Button className="h-10" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </section>
    </>
  );
};

export default ExpensesPage;
