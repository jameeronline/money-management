import { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

//helps
import { formatToCurrency, formatToPercentage } from "../utilities/formats";
import { findSpendingByBudgetId } from "../utilities/budget-planner";
import { Edit, Loader, ReceiptText, Trash2 } from "lucide-react";
import { Form, Link, useFetcher, useSubmit } from "react-router-dom";

const BudgetItem = ({ budget, showDelete = false, showEdit = false }) => {
  const formSubmitRef = useRef();
  const { id, name, amount, category, description } = budget;
  const spending = findSpendingByBudgetId(id);
  //const submit = useSubmit();

  // const handleDeleteFormSubmit = () => {
  //   formRef.current.submit();
  // };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{name}</span>
          <div className="flex items-center gap-2">
            <span className="text-teal-500 text-xl font-bold">
              {formatToCurrency(amount)}
            </span>
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress
          value={(spending / amount) * 100}
          max={+amount}
          className="h-3"
        />
        <div className="flex justify-between text-sm">
          <span>{formatToCurrency(spending)} spend</span>
          <span>{formatToCurrency(amount - spending)} Remaining</span>
        </div>
      </CardContent>
      <CardFooter>
        {/* <Badge variant="secondary" className="rounded-full">
          {category}
        </Badge> */}

        <div className="w-full flex gap-2">
          {showEdit && (
            <Form method="post">
              <input type="hidden" name="_action" value="editBudget" />
              <input type="hidden" name="budgetId" value={id} />

              <Button type="submit" variant="">
                <Edit />
                Edit Budget
              </Button>
            </Form>
          )}

          {showDelete ? (
            <Form method="post" action="delete">
              <input type="hidden" name="_action" value="deleteBudget" />
              <input type="hidden" name="budgetId" value={id} />

              <Button type="submit" variant="destructive" ref={formSubmitRef}>
                <Trash2 />
                <span>Delete Budget</span>
              </Button>
              {/* 
            <Dialog>
              <DialogTrigger asChild={true}>
                <Button variant="destructive">
                  <Trash2 /> Delete User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you really wants to Delete?</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
                <DialogFooter>
                  <Button onClick={() => formSubmitRef.current.click()}>
                    Delete Budget
                  </Button>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog> */}
            </Form>
          ) : (
            <Button asChild>
              <Link to={`/budget/${id}`}>
                <ReceiptText />
                <span>View Details</span>
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default BudgetItem;
