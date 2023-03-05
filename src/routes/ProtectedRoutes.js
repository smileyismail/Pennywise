import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const ProtectedAppRoutes = () => {
  const { user } = useAuthContext();

  return user ? <Outlet /> : <Navigate to="/signIn" />;
};

export const ProtectedAuthRoutes = () => {
  const { user } = useAuthContext();

  return !user ? <Outlet /> : <Navigate to="/expenses" />;
};
