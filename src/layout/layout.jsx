import Header from "./header";
import Footer from "./footer";

import Error from "../pages/error";

import { useNavigation, useRouteError } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "../components/spinner";

const RootLayout = () => {
  const error = useRouteError();
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] h-full">
        <Header />
        <main className="w-full xl:container mx-auto px-4 py-10">
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Spinner />
            </motion.div>
          )}
          {error && <Error />}
          {!error && !isLoading && (
            <AnimatePresence mode="wait">
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
