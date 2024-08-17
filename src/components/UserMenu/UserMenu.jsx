import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logoutThunk } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const { email } = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };
  return (
    <div className={css.row}>
      <h2 className={css.title}>Welcome, {email}</h2>
      <button className={css.btn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
