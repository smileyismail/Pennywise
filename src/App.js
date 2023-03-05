import React from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import {
  ProtectedAppRoutes,
  ProtectedAuthRoutes,
} from "./routes/ProtectedRoutes";

// page imports
import Header from "./components/UI/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";

// auth pages import
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";

//app pages import
import ExpensesPage from "./components/expenses/Expenses";

const App = () => {
  return (
    <AuthProvider>
      <div className="bg-primary w-screen h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* auth routes */}
          <Route element={<ProtectedAuthRoutes />}>
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="resetPassword" element={<ResetPassword />} />
          </Route>

          {/* app routes */}
          <Route element={<ProtectedAppRoutes />}>
            <Route path="expenses" element={<ExpensesPage />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
