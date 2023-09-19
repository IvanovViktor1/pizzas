import React from "react";
import { useLocation } from "react-router-dom";
import logoPng from "../assets/img/logo-pizza.png";
import { Link } from "react-router-dom";
import Search from "./Search";
import izza from "../assets/img/pizza22.png";
import { useSelector } from "react-redux";
import { selectCart } from "../redux/cart/cartSlice";
// import { useAppDispatch } from "../redux/store";
import { useWhyDidYouUpdate } from "ahooks";

const Header: React.FC = () => {

  

  // const dispatch = useAppDispatch(); 
  const location = useLocation();

  const { items, totalPrice } = (useSelector(selectCart));
  const isMounted = React.useRef(false)
  const totalCount = items.reduce((sum: number, obj: any) => {
    return obj.count + sum;
  }, 0); 


  React.useEffect(()=>{
    if (isMounted.current) {
       const json = JSON.stringify(items)
        localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [items, totalPrice])


  // useWhyDidYouUpdate("Header",  { items, totalPrice })

  return (
    <div>
      <div className="header" style={{ backgroundImage: `${izza}` }}>
        <div className="container">
          <Link to="/">
            <div className="header__logo">
              <img width="100" height="100" src={logoPng} alt="Pizza logo" />
              <div>
                <h1>React Pizza</h1>
                <p>самая вкусная пицца во вселенной</p>
              </div>
            </div>
          </Link>
          {!location.pathname.includes("/cart") ? (
            <div className="header__cart">
              <Link to="/cart" className="button button--cart">
                <p>{totalCount > 0 ? totalCount : ""}</p>
                <svg
                  height="74px"
                  id="Layer_1"
                  version="1.1"
                  viewBox="0 0 512 512"
                  width="74px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="PL_x5F_Cart_1_">
                    <path
                      d="M441,416c0,13.8-11.2,25-25,25s-25-11.2-25-25s11.2-25,25-25S441,402.2,441,416z"
                      fill="#ffab89"
                    />
                    <path
                      d="M153,416c0,13.8-11.2,25-25,25s-25-11.2-25-25s11.2-25,25-25S153,402.2,153,416z"
                      fill="#ffab89"
                    />
                    <path
                      d="M127.9,96l-11.1-32H64v17h41.7l57.5,213.3c-32.4,11.3-59.9,37.9-65.3,73.1C96,379.1,96,384,96,384h352v-16.7H115.3   c4.7-31.6,38.8-58.1,74.1-62.5s243.3-34.2,243.3-34.2L448,96H127.9z M416,256l-235,33.3c-0.9,0.2-1.8,0.4-2.7,0.6l-44.7-177.3   h297.7L416,256z"
                      fill="#ffab89"
                    />
                  </g>
                </svg>
                <span>{totalPrice} ₽</span>
              </Link>
            </div>
          ) : null}
        </div>
        <div className="searching">
         {location.pathname !== '/cart' && <Search />}
        </div>
      </div>
    </div>
  );
}
export default Header;
