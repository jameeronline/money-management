import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

//helps
import { formatToCurrency, formatToPercentage } from "../utilities/formats";
import { findSpendingByBudgetId } from "../utilities/budget-planner";
import { Edit } from "lucide-react";

const BudgetItem = ({ budget }) => {
  const { id, name, amount, category, description } = budget;
  const spending = findSpendingByBudgetId(id);
  // console.log(spending / amount);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{name}</span>
          <span className="text-teal-500">{formatToCurrency(amount)}</span>
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
        <Badge variant="secondary" className="rounded-full">
          {category}
        </Badge>
        {/* <Button size="icon" variant="outline">
          <Edit />
        </Button> */}
      </CardFooter>
    </Card>
  );
};

export default BudgetItem;
