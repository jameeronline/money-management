import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/user-context";

const DashboardLayout = () => {
  const { currentUser } = useAuth();

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
      <aside className="col-span-3">
        <h1 className="font-bold text-2xl">Welcome</h1>
        <p className="text-primary">{currentUser?.email}</p>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="profile">Profile</Link>
          </li>
          <li>
            <Link to="address">Address</Link>
          </li>
        </ul>
      </aside>
      <div className="col-span-9">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
