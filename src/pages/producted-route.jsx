import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/user-context";

const Protected = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default Protected;
