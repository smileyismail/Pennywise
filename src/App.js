import React from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import { ProtectAppRoutes, ProtectAuthRoutes } from "./utils/ProtectedRoutes";

// page imports
import Header from "./components/UI/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";

// auth pages import
import SignUp from "./components/Auth/SignUp";
import LogIn from "./components/Auth/LogIn";
import ForgotPassword from "./components/Auth/ForgotPassword";

//app pages import
import ExpensesPage from "./components/expenses/Expenses";

const App = () => {
  return (
    <AuthProvider>
      <div className="bg-primary min-h-screen">
        <Header />

        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* auth routes */}
          <Route element={<ProtectAuthRoutes />}>
            <Route path="signUp" element={<SignUp />} />
            <Route path="logIn" element={<LogIn />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
          </Route>

          {/* app routes */}
          <Route element={<ProtectAppRoutes />}>
            <Route path="expenses" element={<ExpensesPage />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
