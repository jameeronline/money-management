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
import { CirclePlus } from "lucide-react";

const AddBudgetForm = () => {
  const formRef = useRef();
  const inputRef = useRef();
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    formRef.current.reset();
    inputRef.current.focus();
  }, [isSubmitting]);

  return (
    <>
      <fetcher.Form method="post" ref={formRef}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add a New Budget</CardTitle>
            <CardDescription>
              Plan your finances effectively by setting a clear budget. Define
              your spending limits, categorize your expenses, and stay on track
              to meet your financial goals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-6">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="budgetName">Budget Name</Label>
                <Input
                  className="h-10"
                  type="text"
                  id="budgetName"
                  name="budgetName"
                  required
                  ref={inputRef}
                  placeholder="e.g., Monthly Groceries"
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="budgetAmount">Budget Amount</Label>
                <Input
                  className="h-10"
                  type="number"
                  step="0.01"
                  inputMode="numeric"
                  id="budgetAmount"
                  name="budgetAmount"
                  required
                  placeholder="e.g., 5000 (in your preferred currency)"
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="budgetCategory">Category</Label>
                <Select id="budgetCategory" required name="budgetCategory">
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="transportation">
                      Transportation
                    </SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="others">Miscellaneous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="description">Description(optional)</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Add any additional notes about this budget."
                />
              </div>
              <input type="hidden" name="_action" value="addBudget" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full h-12" type="submit">
              <CirclePlus />
              Add Budget
            </Button>
          </CardFooter>
        </Card>
      </fetcher.Form>
    </>
  );
};

export default AddBudgetForm;
