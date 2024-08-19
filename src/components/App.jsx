import { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { refreshUserThunk } from "../redux/auth/operations.js";

import Layout from "./Layout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import RestrictedRoute from "./RestrictedRoute.jsx";

const HomePage = lazy(() => import("./page/HomePage/HomePage.jsx"));
const LoginPage = lazy(() => import("./page/LoginPage/LoginPage.jsx"));
const RegisterPage = lazy(() => import("./page/RegisterPage/RegisterPage.jsx"));
const ContactsPage = lazy(() => import("./page/ContactsPage/ContactsPage"));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/contacts"
          element={<PrivateRoute redirectTo="/" component={<ContactsPage />} />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/" component={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/" component={<RegisterPage />} />
          }
        />
      </Routes>
    </Layout>
  );
}
