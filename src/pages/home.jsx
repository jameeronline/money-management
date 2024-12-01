import { Link, Form as RouteForm, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

import HeaderImage1 from "../assets/money-control.svg";
import HeaderImage2 from "../assets/money-controlpanel.svg";
import HeaderImage3 from "../assets/money-management-3.svg";
import { useEffect } from "react";
import { getValue } from "../utilities/localStore";

const Home = () => {
  const userName = getValue("userName");
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  useEffect(() => {
    if (userName) {
      navigate("/budget-planner", { replace: true });
    }
  }, [userName, navigate]);

  return (
    <>
      <div className="py-10 lg:py-20">
        <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 lg:col-span-4 prose">
            <p className="uppercase text-teal-600 font-mono">
              Money-Saving Tips
            </p>
            <h1 className="text-5xl">
              Take Control of Your <br />
              <span className="text-teal-500">Finances Today</span>
            </h1>

            <p className="text-gray-600 font-normal text-xl">
              Simplify budgeting, track your expenses, and achieve your
              financial goals—all in one place.{" "}
              <span className="text-teal-600 underline">
                Your journey to financial freedom starts here!
              </span>
            </p>

            <div className="flex gap-4">
              <Button className="h-12 ">Get Started Now</Button>
              <Button className="h-12" variant="secondary">
                Learn More
              </Button>
            </div>

            <Separator className="my-6" />

            <RouteForm
              method="post"
              action="budget-planner"
              className="flex flex-col gap-2"
            >
              <Input
                type="text"
                name="username"
                placeholder="Enter your name"
                className="h-12 text-base"
                required
              />
              <input type="hidden" name="_action" value="addUser" />
              <Button type="submit" className="w-full h-12">
                Login
              </Button>
            </RouteForm>

            <Form {...form}>
              <form className="w-2/3 space-y-6 hidden">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>

          <div className="col-span-4 lg:col-span-8 lg:justify-self-end">
            <img src={HeaderImage3} alt="" className="max-w-screen-md" />
          </div>
        </div>
      </div>

      <Link to="/about">About</Link>
      <Link to="/work">Work</Link>
    </>
  );
};

export default Home;
