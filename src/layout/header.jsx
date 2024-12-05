import { Link, Navigate, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
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

import { useEffect, useState } from "react";

import { auth } from "../config/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { BadgeDollarSign, Trash2, UserCircle } from "lucide-react";
import { getValue, delValue } from "../utilities/localStore";
import { useToast } from "@/hooks/use-toast";

//store
import { useUserStore } from "../store.js/user-store";

//context
import { useAuth } from "../context/user-context";

const MenuItems = [
  // {
  //   name: "Dashboard",
  //   slug: "dashboard",
  //   private: true,
  // },
  {
    name: "Budget Dashboard",
    slug: "budget-dashboard",
    private: true,
  },
  {
    name: "About",
    slug: "about",
  },
  {
    name: "Enquiry",
    slug: "enquiry",
  },
  {
    name: "Work",
    slug: "work",
  },
  {
    name: "Blog",
    slug: "blog",
  },
  {
    name: "Events",
    slug: "events",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const userName = getValue("userName");

  //const { user } = useUserStore((state) => state.user);
  //const { setUserName } = useUserStore((state) => state.setUserName);

  const { user, setUserName, deleteUserName } = useUserStore();

  // useEffect(() => {
  //   if (userName) {
  //     setUserName(userName);
  //   }
  // }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("sign out successfully");
      //navigate("/", { replace: true });
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDeleteUser = () => {
    try {
      delValue("userName");
      delValue("budgets");
      delValue("expenses");
      toast({
        title: "Deleted: User Account",
        description: "Your account has been successfully deleted",
      });
      navigate("/", {
        replace: true,
      });
    } catch (e) {
      throw new Error("Error: Unable to delete the user");
    }
  };

  return (
    <>
      <header className="bg-teal-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <Link
              to="/"
              className="font-bold text-2xl inline-flex items-center gap-2"
            >
              <BadgeDollarSign className="text-teal-600" size={36} />
              <span>
                Money Control <span className="text-teal-600">AI</span>
              </span>
            </Link>
            <nav>
              <ul className="flex gap-8 text-black font-semibold">
                {MenuItems.filter((item) => !item.private || userName).map(
                  (item, index) => (
                    <li key={index}>
                      <NavLink
                        to={item.slug}
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                              ? "text-teal-600"
                              : ""
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  )
                )}
                {/* {currentUser != null && (
                  <li>
                    <Dialog>
                      <DialogTrigger asChild={true}>
                        <Button>Logout</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Are you really wants to logout?
                          </DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                        <DialogFooter>
                          <Button onClick={handleLogout}>Logout</Button>
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </li>
                )} */}
              </ul>
            </nav>

            <div className="flex gap-2">
              {/* {userName && (
                <span className="w-8 h-8 rounded-full  flex justify-center items-center">
                  <UserCircle size={32} className="text-teal-700" />
                </span>
              )} */}
              {userName && (
                <>
                  <Dialog>
                    <DialogTrigger asChild={true}>
                      <Button variant="destructive">
                        Delete User <Trash2 />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Are you really wants to logout?
                        </DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                      <DialogFooter>
                        <Button onClick={handleDeleteUser}>Logout</Button>
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              )}
              {/* <Button asChild>
                <Link to="contact">Get in Touch</Link>
              </Button> */}
              {currentUser == null && (
                <Button asChild>
                  <Link to="/login">Login</Link>
                </Button>
              )}
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Logout Dialog */}
    </>
  );
};

export default Header;
