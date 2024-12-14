import { useRef, useState } from "react";
import {
  convertTimestampToReadableDate,
  formatToCurrency,
} from "../utilities/formats";

//components
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Edit2, Trash2 } from "lucide-react";
import { getMatchingAllItems } from "../utilities/functions";
import { Link, Form, useFetcher } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { showPromise } from "../utilities/localStore";

const ExpenseTableItem = ({ expense, index, showCategory, showEdit }) => {
  const data = getMatchingAllItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  const fetcher = useFetcher();
  const formRef = useRef();

  const isSubmitting = fetcher.state === "submitting";

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { id, name, createdAt, amount } = expense;

  const handleSubmit = () => {
    console.log("form submit");
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <>
      <TableRow key={id}>
        <TableCell className="font-medium">{index + 1}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>
          <span className="font-bold">{formatToCurrency(amount)}</span>
        </TableCell>
        <TableCell>{convertTimestampToReadableDate(createdAt)}</TableCell>
        {showCategory && (
          <TableCell>
            <Link
              to={`/budget/${data.id}`}
              className="inline-flex rounded-full h-8 px-3 bg-yellow-500 hover:bg-yellow-600 text-white min-w-20 items-center justify-center"
            >
              {data.name}
            </Link>
          </TableCell>
        )}
        <TableCell>
          <fetcher.Form method="post">
            <input type="hidden" name="_action" value="deleteExpense" />
            <input type="hidden" name="expenseId" value={id} />
            <Button variant="destructive" size="icon" type="submit">
              <Trash2 />
            </Button>
          </fetcher.Form>
        </TableCell>
        {showEdit && (
          <TableCell>
            <Dialog open={isDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Edit />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Expense</DialogTitle>
                  <DialogDescription>
                    Make changes to your expense here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>

                <fetcher.Form
                  method="post"
                  onSubmit={handleSubmit}
                  ref={formRef}
                >
                  <input type="hidden" name="_action" value="editExpense" />
                  <input type="hidden" name="expenseId" value={id} />

                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="expenseName" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="expenseName"
                        name="expenseName"
                        defaultValue={name}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="expenseAmount" className="text-right">
                        Amount
                      </Label>
                      <Input
                        id="expenseAmount"
                        name="expenseAmount"
                        defaultValue={amount}
                        className="col-span-3"
                        required
                      />
                    </div>
                    {isSubmitting ? (
                      <Button type="submit" disabled>
                        Submitting...
                      </Button>
                    ) : (
                      <Button type="submit">Save Expense</Button>
                    )}
                  </div>
                </fetcher.Form>
              </DialogContent>
            </Dialog>
          </TableCell>
        )}
      </TableRow>
    </>
  );
};

export default ExpenseTableItem;
