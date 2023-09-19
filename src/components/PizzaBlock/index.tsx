import React from "react";
import { useSelector } from "react-redux";
import { setCartItem } from "../../redux/cart/cartSlice";
import { useAppDispatch } from "../../redux/store";
import { selectCartItemByIdSizesTypes } from "../../redux/cart/selectors";
import { CartItemType } from "../../redux/cart/types";
import { Link } from "react-router-dom";

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  count: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  imageUrl,
  title,
  price,
  sizes,
  types,
}) => {
  const dispatch = useAppDispatch();
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const typeName = ["тонкое", "традиционное"];

  const addToCart = () => {
    const item: CartItemType = {
      id: id + String(sizes[activeSize]) + typeName[activeType],
      imageUrl,
      title,
      price,
      sizes: sizes[activeSize],
      types: typeName[activeType],
      count: 0,
    };
    dispatch(setCartItem(item));
  };

  const addedCount = useSelector(
    selectCartItemByIdSizesTypes(title, sizes[activeSize], typeName[activeType])
  )?.count;

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link key={id} to={`pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>

        <h4 className="pizza-block__title">{title}</h4>

        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId, index) => (
              <li
                key={typeId}
                onClick={() => setActiveType(index)}
                className={activeType === typeId ? "active" : ""}
              >
                {typeName[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            className="button button--outline button--add"
            onClick={addToCart}
          >
            <span>Добавить</span>
            {addedCount ? <i>{addedCount}</i> : ""}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PizzaBlock;
