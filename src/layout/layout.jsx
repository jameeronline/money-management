import Header from "./header";
import Footer from "./footer";

import Error from "../pages/not-found";

import { useRouteError } from "react-router-dom";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const error = useRouteError();

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] h-full">
        <Header />
        <main className="container mx-auto px-4 py-10">
          {error ? <Error /> : <Outlet />}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
