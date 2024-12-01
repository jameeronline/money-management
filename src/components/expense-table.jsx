import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  convertTimestampToReadableDate,
  formatToCurrency,
} from "../utilities/formats";
import { Trash, Trash2 } from "lucide-react";

export const ExpenseTable = ({ expenses }) => {
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
        <TableHeader>
          <TableRow>
            {["ID", "Name", "Amount", "Created", "Category", "Action"].map(
              (item, index) => (
                <TableHead key={index} className="font-semibold text-gray-900">
                  {item}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {expensesData.map((expense, index) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{expense.name}</TableCell>
              <TableCell>{formatToCurrency(expense.amount)}</TableCell>
              <TableCell>
                {convertTimestampToReadableDate(expense.createdAt)}
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Button variant="destructive">
                  <Trash2 /> Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ExpenseTable;
