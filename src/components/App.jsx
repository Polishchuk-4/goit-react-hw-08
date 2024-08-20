import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { refreshUserThunk } from "../redux/auth/operations.js";

import Layout from "./Layout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import RestrictedRoute from "./RestrictedRoute.jsx";
import { selectIsRefresh } from "../redux/auth/selectors.js";
import Loader from "./Loader/Loader.jsx";

const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage.jsx"));
const RegisterPage = lazy(() =>
  import("../pages/RegisterPage/RegisterPage.jsx")
);
const ContactsPage = lazy(() => import("../pages/ContactsPage/ContactsPage"));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefresh);

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
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
