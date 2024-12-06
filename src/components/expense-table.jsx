import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ExpenseTableItem from "./expense-table-item";

export const ExpenseTable = ({ expenses, showCategory = true }) => {
  const expensesData = JSON.parse(expenses);
  return (
    <>
      <div className="prose mb-6">
        <h2 className="mb-2">Expenses Table</h2>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, id?
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
              "Action",
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
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ExpenseTable;
