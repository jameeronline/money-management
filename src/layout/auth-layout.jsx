import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div className="grid place-items-center h-full">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
