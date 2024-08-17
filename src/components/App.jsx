import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

const Layout = lazy(() => import("./Layout/Layout.jsx"));
const HomePage = lazy(() => import("./page/HomePage/HomePage.jsx"));
const LoginPage = lazy(() => import("./page/LoginPage/LoginPage.jsx"));
const RegisterPage = lazy(() => import("./page/RegisterPage/RegisterPage.jsx"));
const ContactsPage = lazy(() => import("./page/ContactsPage/ContactsPage"));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route index path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
