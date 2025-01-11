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
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

//layout components
import RootLayout from "./layout/layout";

//Pages
import Home from "./pages/home";
import About from "./pages/about";
import Works from "./pages/works";
import Contact from "./pages/contact";
import BlogLayout from "./pages/blog-layout";
import Blog, { blogLoader } from "./pages/blog";
import BlogDetails, { postLoader } from "./pages/post";
import Events from "./pages/events";
import EventDetails, { eventDetailsLoader } from "./pages/event-details";
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from "./pages/expenses-details";

//user pages
import Protected from "./pages/producted-route";
import DashboardLayout from "./pages/protected/user/dashboard-layout";
import Dashboard from "./pages/protected/user/dashboard";
import Profile from "./pages/protected/user/profile";
import Address from "./pages/protected/user/address";

import BudgetPlanner from "./pages/budget-dashboard";

//auth
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/sign-up";
import ForgetPassword from "./pages/auth/forget-password";

import NotFound from "./pages/not-found";
import Enquiry from "./pages/enquiry";

import AuthLayout from "./layout/auth-layout";

//loaders
import { eventsLoader } from "./pages/events";

//actions
import { logoutAction } from "./pages/logout";
import { enquireFormAction } from "./pages/enquiry";

import { ThemeProvider } from "@/components/theme-provider";

//Context
import UserProvider from "./context/user-context";
import { budgetAction, budgetLoader } from "./utilities/budget-planner";
import Terms from "./pages/terms";
import CMSPage, { loader as contentFulLoader } from "./pages/static/cms-page";
import BudgetDetails, {
  budgetDetailsAction,
  budgetDetailsLoader,
} from "./pages/budget-details";
import { deleteBudgetAction } from "./pages/delete-budget";
import Post from "./pages/post";
import Author, { authorLoader } from "./pages/author";
import ErrorBoundary from "./components/error-boundry";

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
        path: "budget-dashboard",
        element: <BudgetPlanner />,
        action: budgetAction,
        loader: budgetLoader,
      },
      {
        path: "budget/:id",
        element: <BudgetDetails />,
        loader: budgetDetailsLoader,
        action: budgetDetailsAction,
        children: [
          {
            path: "delete",
            action: deleteBudgetAction,
          },
        ],
      },
      {
        path: "expenses-details",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
      },
      // {
      //   path: "about",
      //   element: <About />,
      // },
      // {
      //   path: "enquiry",
      //   element: <Enquiry />,
      //   action: enquireFormAction,
      // },
      {
        path: "works",
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
            loader: eventDetailsLoader,
          },
        ],
      },
      {
        path: "blog",
        element: <Blog />,
        loader: blogLoader,
      },
      {
        path: "blog/:slug",
        element: <Post />,
        loader: postLoader,
      },
      {
        path: "author/:slug",
        element: <Author />,
        loader: authorLoader,
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
        path: ":slug",
        element: <CMSPage />,
        loader: contentFulLoader,
      },
      {
        path: "*",
        element: <NotFound />,
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
  return (
    <>
      <ErrorBoundary>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <UserProvider>
            <RouterProvider router={router} />
            <Toaster />
            <SonnerToaster richColors />
          </UserProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
