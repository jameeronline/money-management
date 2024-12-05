import {
  convertTimestampToReadableDate,
  formatToCurrency,
} from "../utilities/formats";

//components
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { getMatchingAllItems } from "../utilities/functions";
import { Link, Form, useFetcher } from "react-router-dom";

const ExpenseTableItem = ({ expense, index }) => {
  const data = getMatchingAllItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];
  const fetcher = useFetcher();

  return (
    <>
      <TableRow key={expense.id}>
        <TableCell className="font-medium">{index + 1}</TableCell>
        <TableCell>{expense.name}</TableCell>
        <TableCell>
          <span className="font-bold">{formatToCurrency(expense.amount)}</span>
        </TableCell>
        <TableCell>
          {convertTimestampToReadableDate(expense.createdAt)}
        </TableCell>
        <TableCell>
          <Link
            to={`/budget/${data.id}`}
            className="inline-flex rounded-full h-8 px-3 bg-yellow-500 hover:bg-yellow-600 text-white min-w-20 items-center justify-center"
          >
            {data.name}
          </Link>
        </TableCell>
        <TableCell>
          <fetcher.Form method="post">
            <input type="hidden" name="_action" value="deleteExpense" />
            <input type="hidden" name="expenseId" value={expense.id} />
            <Button variant="destructive" type="submit">
              <Trash2 /> Delete
            </Button>
          </fetcher.Form>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ExpenseTableItem;
