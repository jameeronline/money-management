import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ExpenseTableItem from "./expense-table-item";

export const ExpenseTable = ({
  expenses,
  showCategory = true,
  showEdit = false,
}) => {
  const expensesData = JSON.parse(expenses);
  return (
    <>
      <div className="prose mb-6">
        <h2 className="mb-2">Expenses Table</h2>
        <p className="text-sm max-w-4xl">
          The expense table provides a clear and organized view of all your
          recorded expenses. It displays detailed information such as date,
          category, amount, and payment method, allowing users to easily track
          and analyze their spending habits in one convenient location.
        </p>
      </div>
      <Table className="border">
        <TableHeader className="bg-slate-50 text-base">
          <TableRow>
            {[
              "ID",
              "Name",
              "Amount",
              "Created",
              showCategory && "Category",
              "Delete",
              showEdit && "Edit",
            ]
              .filter(Boolean)
              .map((item, index) => (
                <TableHead
                  key={index}
                  className="font-semibold text-gray-900 h-12"
                >
                  {item}
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {expensesData.map((expense, index) => (
            <ExpenseTableItem
              key={expense.id}
              expense={expense}
              index={index}
              showCategory={showCategory}
              showEdit={showEdit}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ExpenseTable;
