import React from "react";
import Axios from "axios";
import qs from "qs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Sort,
  Categories,
  PizzaBlock,
  ErrorFetchPizzas,
  Pagination,
} from "../components";
import { sortList } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { setFilters, setPageCount } from "../redux/filter/filterSlice";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import { selectPizzaData } from "../redux/pizza/selectors";
import { FilterScliceState } from "../redux/filter/types";
import { fetchPizzas } from "../redux/pizza/asyncActions";

export const Home: React.FC = () => {
  const isMounted = React.useRef(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const { categoryId, sortType, currentPage, searchValue, order } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const sortBy = sortType.sortProperty;
  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  const getPizzas = () => {
    async function fetchData() {
      try {
        dispatch(
          fetchPizzas({
            sortBy,
            order,
            category,
            currentPage: String(currentPage),
            search,
          })
        );
        Axios.get(`https://64dfcc7d71c3335b25831222.mockapi.io/items`).then(
          function (response) {
            dispatch(setPageCount(Math.ceil(response.data.length / 8)));
          }
        );
      } catch (error: any) {
        alert(error.message);
        console.log(error);
        console.log(status);
      }
    }
    fetchData();
  };

  import("../utils/math").then((math) => {
    console.log(math.add(1234, 4444));
  });

  //проверка на первый рендер, что бы вшивать в адресную строку параметры поиска, сортировки и фильтрации
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
        searchValue: searchValue ? searchValue : null,
        order,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage, order]);

  //если был первый рендер, то проверяем url-параметры и сохраняем в redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as FilterScliceState;
      const sortType = sortList.find(
        (obj) => obj.name === params.sortType.name
      );
      dispatch(
        setFilters({
          ...params,
          sortType: sortType || sortList[0],
        })
      );
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер, то запрашиваем товар
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage, order]);

  const pizzas = items.map((item: any) => (
    <PizzaBlock key={item.id} {...item} />
  ));
  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      {status === "error" ? (
        <ErrorFetchPizzas />
      ) : (
        <>
          <Pagination />
          <div className="content__top">
            <Categories value={categoryId} />
            <Sort value={sortType} />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {status === "loading" ? skeletons : pizzas}
          </div>{" "}
        </>
      )}
    </>
  );
};

export default Home;
