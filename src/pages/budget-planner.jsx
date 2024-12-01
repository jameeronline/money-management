import { Form, Link, useActionData, useLoaderData } from "react-router-dom";
import AddBudgetForm from "../components/add-budget-form";
import AddExpenseForm from "../components/add-expense-form";
import BudgetItem from "../components/budget-Item";
import ExpenseTable from "../components/expense-table";
import { Button } from "@/components/ui/button";

const BudgetPlanner = () => {
  const { userName, budgets, expenses } = useLoaderData();
  const isBudgets = budgets && JSON.parse(budgets).length > 0 ? true : false;
  const isExpenses = expenses && JSON.parse(expenses).length > 0 ? true : false;

  return (
    <>
      <header className="prose mb-10">
        {userName && (
          <h1>
            Welcome <br />
            <span className="text-teal-500">{userName}</span>
          </h1>
        )}
      </header>

      <section className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
        {!isBudgets && (
          <div className="col-span-12">
            <p className="text-sm text-gray-800 max-w-screen-sm">
              Start by creating your first budget to track and manage your
              expenses. Adding a budget helps you set financial limits and stay
              on top of your spending.
            </p>
          </div>
        )}
        <div className="col-span-4">
          <AddBudgetForm />
        </div>
        <div className="col-span-4">
          {isBudgets ? (
            <AddExpenseForm budgets={budgets} />
          ) : (
            <p>No budget Available</p>
          )}
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-6">
            {isBudgets &&
              JSON.parse(budgets).map((budget) => (
                <BudgetItem key={budget.id} budget={budget} />
              ))}
          </div>
        </div>
      </section>

      {isExpenses && (
        <section className="mt-10">
          <ExpenseTable expenses={expenses} />
          {JSON.parse(expenses).length > 4 && (
            <div className="text-center mt-8">
              <Button asChild className="h-10">
                <Link to="/expenses-details">View all Expenses</Link>
              </Button>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default BudgetPlanner;
