import { useNavigate, NavLink, replace } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { logoutThunk } from "../../redux/auth/operations";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.navigationLink, isActive && css.active);
};

export default function Navigation() {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log(isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutThunk())
      .unwrap()
      .then(() => {
        navigate("/login", { replace: true });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <nav className={css.navigation}>
      <ul className={css.navigationList}>
        <li
          className={clsx(
            css.navigationItem,
            !isLoggedIn && css.navigationItemMargin
          )}
        >
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
        </li>
        {isLoggedIn && (
          <li className={css.navigationItemMargin}>
            <NavLink to="contacts" className={buildLinkClass}>
              Contacts
            </NavLink>
          </li>
        )}
        {isLoggedIn ? (
          <>
            <li className={css.navigationItem}>
              <h2 className={css.navigationLink}>{`Welcome, ${user.email}`}</h2>
            </li>
            <li className={css.navigationItem}>
              <button className={css.navigationLogout} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={css.navigationItem}>
              <NavLink to="register" className={buildLinkClass}>
                Register
              </NavLink>
            </li>
            <li className={css.navigationItem}>
              <NavLink to="login" className={buildLinkClass}>
                Log In
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
