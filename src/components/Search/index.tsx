import React from "react";
import styles from "./Search.module.scss";
import { useSelector, useDispatch } from "react-redux";
// @ts-ignore
import debounce from "lodash.debounce";
import {
  selectFilterSearchValue,
  setSearchValue,
} from "../../redux/filter/filterSlice";
import { useAppDispatch } from "../../redux/store";

const Search: React.FC = React.memo(() => { 
  const dispatch = useAppDispatch();
  // const searchValue = useSelector(selectFilterSearchValue);

  const [value, setValue] = React.useState("");

  const inputRef = React.useRef<HTMLInputElement>(null); 
  const onClearSearchValue = () => {
    setValue("");
    dispatch(setSearchValue(""));
    inputRef.current?.focus();
  }; 

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearch(event.target.value);
    // console.log("onClearSearchValue")
  };

  const updateSearch = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
      
    }, 1000),
    []
  );


  return (
    <div className={styles.root}>
      <form>
        <svg
          className={styles.icon}
          id="send"
          type="submit"
          height="24"
          cursor="pointer"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
        </svg>
        <input
          id="textbox"
          name="sendtext" 
          ref={inputRef}
          value={value}
          onChange={onChangeInput}
          className={styles.input}
          placeholder="Поиск пиццы.."
          type="text"
        ></input>
      </form>
      {value && (
        <svg
          className={styles.clearIcon}
          onClick={onClearSearchValue}
          height="24"
          viewBox="0 0 48 48"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
      <div />
    </div>
  );
});
export default Search;
