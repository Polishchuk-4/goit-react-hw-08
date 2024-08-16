import css from "./Layout.module.css";
import Navigation from "../Navigation/Navigation";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main className={css.container}>
      <Navigation />
      <Outlet />
    </main>
  );
}
