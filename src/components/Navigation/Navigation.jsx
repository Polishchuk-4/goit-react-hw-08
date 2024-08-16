import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.navigationLink, isActive && css.active);
};

export default function Navigation() {
  return (
    <nav className={css.navigation}>
      <NavLink to="/" className={buildLinkClass}>
        Home
      </NavLink>
      <NavLink to="register" className={buildLinkClass}>
        Register
      </NavLink>
      <NavLink to="login" className={buildLinkClass}>
        Log In
      </NavLink>
    </nav>
  );
}
