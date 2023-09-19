import React from "react";
import { setCategoryId } from "../redux/filter/filterSlice";
import { useAppDispatch } from "../redux/store";

const categories = [
  "Все",
  "Мясные",
  "Вегатарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

type CategoriesProps = {
  value: number
}



const Categories: React.FC<CategoriesProps> = React.memo(({value}) => {
  const dispatch = useAppDispatch();

  const onSelectCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, [])

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onSelectCategory(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
})

export default Categories;
