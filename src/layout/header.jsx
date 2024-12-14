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
import { BadgeDollarSign, MenuIcon, Trash2, UserCircle } from "lucide-react";
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
    name: "Dashboard",
    slug: "budget-dashboard",
    private: true,
  },
  // {
  //   name: "Enquiry",
  //   slug: "enquiry",
  // },
  {
    name: "Works",
    slug: "works",
  },
  {
    name: "Blog",
    slug: "blog",
  },
  {
    name: "Events",
    slug: "events",
  },
  {
    name: "About",
    slug: "about",
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
  const [isToggleOpen, setIsToggleOpen] = useState(false);

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
        <div className="w-full xl:container mx-auto px-6">
          <div className="flex justify-between items-center py-4 relative">
            {/* Logo */}
            <Link
              to="/"
              className="font-bold text-xl xl:text-2xl inline-flex flex-nowrap items-center gap-2"
            >
              <BadgeDollarSign className="text-teal-600 w-6 h-6 lg:w-9 lg:h-9" />
              <span className="whitespace-nowrap">
                Money Control <span className="text-teal-600">AI</span>
              </span>
            </Link>

            {/* Menu */}
            <nav
              className={`absolute top-full bg-gray-50 p-4 -left-6 -right-6 lg:w-auto lg:p-0 lg:bg-transparent
                 lg:relative lg:visible ${
                   isToggleOpen
                     ? "visible opacity-100 backdrop-blur-sm"
                     : "invisible opacity-0"
                 }}`}
            >
              <ul className="flex gap-1 text-black font-semibold flex-col lg:flex-row lg:gap-2 xl:gap-8">
                {MenuItems.filter((item) => !item.private || userName).map(
                  (item, index) => (
                    <li key={index}>
                      <NavLink
                        to={item.slug}
                        onClick={() => setIsToggleOpen(false)}
                        className={({ isActive, isPending }) =>
                          `flex p-2 hover:rounded-sm hover:text-gray-500 hover:bg-teal-100/50 lg:hover:bg-transparent transition-colors duration-200 ${isPending ? "pending" : ""} ${isActive ? "text-teal-600 pointer-events-none" : ""}`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  )
                )}
                {userName && (
                  <>
                    <Dialog>
                      <DialogTrigger asChild={true}>
                        <Button variant="destructive" className="lg:hidden">
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

            <div className="flex gap-2 items-center">
              {/* Mobile Trigger */}
              <button
                className={`relative order-10 block h-10 w-10 self-center lg:hidden
                  ${
                    isToggleOpen
                      ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                      : ""
                  }`}
                onClick={() => setIsToggleOpen(!isToggleOpen)}
                aria-expanded={isToggleOpen ? "true" : "false"}
                aria-label="Toggle navigation"
              >
                <div className="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <span
                    aria-hidden="true"
                    className="absolute block h-0.5 w-6 -translate-y-2 transform rounded-full bg-teal-600 transition-all duration-300"
                  ></span>
                  <span
                    aria-hidden="true"
                    className="absolute block h-0.5 w-6 transform rounded-full bg-teal-600 transition duration-300"
                  ></span>
                  <span
                    aria-hidden="true"
                    className="absolute block h-0.5 w-6 origin-top-left translate-y-2 transform rounded-full bg-teal-600 transition-all duration-300"
                  ></span>
                </div>
              </button>

              {userName && (
                <>
                  <Dialog>
                    <DialogTrigger asChild={true}>
                      <Button
                        variant="destructive"
                        className="hidden lg:inline-flex"
                      >
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

              {/* {currentUser == null && (
                <Button asChild>
                  <Link to="/login">Login</Link>
                </Button>
              )} */}
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
