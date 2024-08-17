import clsx from "clsx";
import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function AuthNav() {
  return (
    <div className={css.row}>
      <NavLink className={buildLinkClass} to="/register">
        Register
      </NavLink>
      <NavLink className={buildLinkClass} to="/login">
        Log In
      </NavLink>
    </div>
  );
}
