import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./style/index.css";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "preline/preline";
import { IStaticMethods } from "preline/preline";

//components
import { Toaster } from "@/components/ui/toaster";

//layout components
import RootLayout from "./layout/layout";

//Pages
import Home from "./pages/home";
import About, { aboutAction, aboutLoader } from "./pages/about";
import Works from "./pages/works";
import Contact from "./pages/contact";
import BlogLayout from "./pages/blog-layout";
import Blog from "./pages/blog";
import BlogDetails from "./pages/blog-details";
import Events from "./pages/events";
import EventDetails from "./pages/event-details";
import ExpensesPage, { expensesLoader } from "./pages/expnses-details";

//user pages
import Protected from "./pages/producted-route";
import DashboardLayout from "./pages/protected/user/dashboard-layout";
import Dashboard from "./pages/protected/user/dashboard";
import Profile from "./pages/protected/user/profile";
import Address from "./pages/protected/user/address";

import BudgetPlanner from "./pages/budget-planner";

//auth
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/sign-up";
import ForgetPassword from "./pages/auth/forget-password";

import NotFound from "./pages/not-found";
import Enquiry from "./pages/enquiry";

import AuthLayout from "./layout/auth-layout";

//loaders
import { loader as eventsLoader } from "./pages/events";
import { loader as eventDetailsLoder } from "./pages/event-details";

//actions
import { logoutAction } from "./pages/logout";
import { enquireFormAction } from "./pages/enquiry";

import { ThemeProvider } from "@/components/theme-provider";

//Context
import UserProvider from "./context/user-context";
import { budgetAction, budgetLoader } from "./utilities/budget-palnner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "budget-planner",
        element: <BudgetPlanner />,
        action: budgetAction,
        loader: budgetLoader,
      },
      {
        path: "expenses-details",
        element: <ExpensesPage />,
        loader: expensesLoader,
      },
      {
        element: <Protected />,
        children: [
          {
            path: "dashboard",
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                path: "profile",
                element: <Profile />,
              },
              {
                path: "address",
                element: <Address />,
              },
            ],
          },
        ],
      },
      {
        path: "about",
        element: <About />,
        action: aboutAction,
        loader: aboutLoader,
      },
      {
        path: "enquiry",
        element: <Enquiry />,
        action: enquireFormAction,
      },
      {
        path: "work",
        element: <Works />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "events",
        element: <Events />,
        loader: eventsLoader,
        children: [
          {
            path: ":eventId",
            element: <EventDetails />,
            loader: eventDetailsLoder,
          },
        ],
      },
      {
        path: "blog",
        element: <BlogLayout />,
        children: [
          {
            path: ":blogId",
            element: <BlogDetails />,
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, []);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <UserProvider>
          <RouterProvider router={router} />
          <Toaster />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
