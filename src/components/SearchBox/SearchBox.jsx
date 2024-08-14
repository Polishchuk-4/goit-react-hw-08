import { useDispatch, useSelector } from "react-redux";
import { setNameFilter } from "../../redux/filtersSlice";
import style from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const nameFilter = useSelector((state) => state.filters.name);

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
