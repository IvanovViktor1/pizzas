import React from "react";
import arrowUp from "../assets/img/arrowUp.svg";
import { useSelector } from "react-redux";
import { setOrder, setSortType } from "../redux/filter/filterSlice";
import { useAppDispatch } from "../redux/store";
import { selectFilter, selectOrder } from "../redux/filter/selectors";
import { SortPopup, SortPropertyEnum } from "../redux/filter/types";

type PopupEvent = MouseEvent & {
  path: Node[];
  composedPath: (tar?: HTMLElement) => EventTarget[];
  target: HTMLElement;
};

export const sortList: SortPopup[] = [
  { name: "популярности", sortProperty: SortPropertyEnum.RATING },
  { name: "цене", sortProperty: SortPropertyEnum.PRICE },
  { name: "алфавиту", sortProperty: SortPropertyEnum.TITLE },
];

type SortProps = {
  value: SortPopup;
};

export const Sort: React.FC<SortProps> = React.memo(({ value }) => {
  const sortRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupEvent;

      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsOpen(false);
      }
    };

    document
      ?.querySelector("html")
      ?.addEventListener("click", handleClickOutside);

    return () =>
      document
        ?.querySelector("html")
        ?.removeEventListener("click", handleClickOutside);
  }, []);
  const dispatch = useAppDispatch();

  const [open, setIsOpen] = React.useState(false);

  let orderAsc = useSelector(selectOrder) === "asc" ? true : false;

  const onClickArrow = () => {
    orderAsc ? dispatch(setOrder("desc")) : dispatch(setOrder("asc"));
    orderAsc = !orderAsc;
  };

  const onClickListItem = (obj: SortPopup) => {
    dispatch(setSortType(obj));
    setIsOpen(false);
  };

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="12"
          height="8"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          cursor="pointer"
          onClick={() => onClickArrow()}
          transform={orderAsc ? "" : "matrix(1,0,0,-1,0,0)"}
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(obj)}
                className={
                  value.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
