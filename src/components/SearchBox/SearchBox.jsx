import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/filters/selectors";
import style from "./SearchBox.module.css";
import { setNameFilter } from "../../redux/filters/slice";

export default function SearchBox() {
  const dispatch = useDispatch();
  const nameFilter = useSelector(selectNameFilter);

  function handleSubmit(event) {
    dispatch(setNameFilter(event.target.value));
  }

  return (
    <div className={style.searchBox}>
      <label className={style.searchBoxLabel}>
        Find contacts by name
        <input
          name="username"
          className={style.searchBoxInput}
          value={nameFilter}
          onChange={(event) => {
            handleSubmit(event);
          }}
        />
      </label>
    </div>
  );
}
