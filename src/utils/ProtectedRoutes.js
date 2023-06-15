import { Navigate, Outlet, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const ProtectAppRoutes = () => {
  const { user } = useAuthContext();

  return user ? <Outlet /> : <Navigate to="/logIn" />;
};

export const ProtectAuthRoutes = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <Outlet />;
  } else {
    return (
      <div className="flex items-center flex-col gap-6 pt-28">
        <h3 className="text-2xl font-medium">You are already Logged In...</h3>
        <Link to="/expenses">
          <button
            type="button"
            className="bg-action text-gray-50 text-sm py-2 px-4 sm:text-lg rounded-md drop-shadow-xl hover:contrast-200 duration-200 font-medium active:scale-105 whitespace-nowrap"
          >
            Go to Expenses
          </button>
        </Link>
      </div>
    );
  }
};
