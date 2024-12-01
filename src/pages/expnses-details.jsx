import { Link, useLoaderData, useNavigate } from "react-router-dom";
import ExpenseTable from "../components/expense-table";
import { Button } from "@/components/ui/button";
import { getValue } from "../utilities/localStore";

export const expensesLoader = () => {
  const expenses = getValue("expenses");
  return { expenses };
};

const ExpensesPage = () => {
  const navigate = useNavigate();
  const { expenses } = useLoaderData();
  const isExpenses = expenses && JSON.parse(expenses).length > 0 ? true : false;

  return (
    <>
      {isExpenses && (
        <section>
          <div className="prose mb-10">
            <h1>All Expenses</h1>
          </div>
          <ExpenseTable expenses={expenses} />
          {JSON.parse(expenses).length > 4 && (
            <div className="text-center mt-8">
              <Button className="h-10" onClick={() => navigate(-1)}>
                Back
              </Button>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default ExpensesPage;
