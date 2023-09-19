import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/filter/filterSlice";
import { useAppDispatch } from "../../redux/store";
import { selectFilterCurrentPage, selectFilterPageCount } from "../../redux/filter/selectors";

// type PaginationProps = {
//   currentPage: number;
//   onPageChange: (page: number) => void;
// }

const Pagination: React.FC = () => {
  // const currentPage = useSelector((state) => state.filterSlice.currentPage);
  const currentPage = useSelector(selectFilterCurrentPage)
  const pageCount = useSelector(selectFilterPageCount);

  const dispatch = useAppDispatch();
  const onPageChange = (number: number) => {
    dispatch(setCurrentPage(number));
  };
 
  return (
    <ReactPaginate
      className={styles.number}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
