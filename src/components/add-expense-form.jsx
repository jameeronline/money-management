import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, useFetcher } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useEffect } from "react";
import { HandCoins } from "lucide-react";
import { clsx } from "clsx";

const AddExpenseForm = ({ budgets }) => {
  const formRef = useRef();
  const inputRef = useRef();
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const budgetItems = JSON.parse(budgets);
  console.log(budgetItems.length === 1);

  useEffect(() => {
    formRef.current.reset();
    inputRef.current.focus();
  }, [isSubmitting]);

  return (
    <>
      <fetcher.Form method="post" ref={formRef}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Add{" "}
              {budgetItems?.length > 1 ? (
                <span>Your</span>
              ) : (
                <span>{budgetItems?.map((budgetItem) => budgetItem.name)}</span>
              )}{" "}
              Expense
            </CardTitle>
            <CardDescription>
              Plan your finances effectively by setting a clear budget. Define
              your spending limits, categorize your expenses, and stay on track
              to meet your financial goals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-6">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="expenseName">Expense Name</Label>
                <Input
                  className="h-10"
                  type="text"
                  id="expenseName"
                  name="expenseName"
                  required
                  ref={inputRef}
                  placeholder="e.g., Coffee shop"
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="expenseAmount">Expense Amount</Label>
                <Input
                  className="h-10"
                  type="number"
                  step="0.01"
                  inputMode="numeric"
                  id="expenseAmount"
                  name="expenseAmount"
                  required
                  placeholder="e.g., 1500 (in your preferred currency)"
                />
              </div>
              <div
                className={clsx(
                  "grid w-full items-center gap-2",
                  budgetItems.length === 1 && "hidden"
                )}
                hidden={budgetItems.length === 1}
              >
                <Label htmlFor="expenseCategory">Expense Category</Label>
                <Select
                  id="expenseCategory"
                  required
                  name="expenseCategory"
                  defaultValue={budgetItems[0].id}
                >
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetItems.map((budgetItem) => (
                      <SelectItem value={budgetItem.id} key={budgetItem.id}>
                        {budgetItem.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <input type="hidden" name="_action" value="addExpense" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full h-12" type="submit">
              <HandCoins />
              Add Expense
            </Button>
          </CardFooter>
        </Card>
      </fetcher.Form>
    </>
  );
};

export default AddExpenseForm;
