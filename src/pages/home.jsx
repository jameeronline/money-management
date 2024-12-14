import { Link, Form, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

import HeaderImage1 from "../assets/money-control.svg";
import HeaderImage2 from "../assets/money-controlpanel.svg";
import HeaderImage3 from "../assets/money-management-3.svg";
import HeaderImage4 from "../assets/money-control-banner.svg";
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
      navigate("/budget-dashboard", { replace: true });
    }
  }, [userName, navigate]);

  return (
    <>
      <div className="py-10 lg:py-20">
        <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 lg:col-span-4 prose lg:prose-xl">
            <p className="uppercase text-teal-600 font-mono">
              Money-Saving Tips
            </p>
            <h1 className="lg:text-5xl">
              Take Control of Your <br />
              <span className="text-teal-500">Finances Today</span>
            </h1>

            <p className="text-gray-600 font-normal lg:text-xl">
              Simplify budgeting, track your expenses, and achieve your
              financial goals—all in one place.{" "}
              <span className="text-teal-600">
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

            <Form
              method="post"
              action="budget-dashboard"
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
            </Form>
          </div>

          <div className="col-span-4 lg:col-span-8 lg:justify-self-end">
            <img src={HeaderImage4} alt="" className="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
