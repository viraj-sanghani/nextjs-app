"use client";

import { useRef, useEffect } from "react";
import ReactPaginate from "react-paginate";
import icons from "@/utils/icons";

function Pagination({ pageCount, currentPage, onPageChange }) {
  const pagination = useRef();

  const handlePageClick = ({ selected }) => {
    onPageChange(selected + 1);
  };

  useEffect(() => {
    if (pagination.current) {
      setTimeout(() => {
        pagination.current.state.selected = currentPage - 1;
        pagination.current.forceUpdate();
      }, 0);
    }
  }, []);

  return (
    <div className="pagination-container">
      <ReactPaginate
        ref={pagination}
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        previousLabel={icons.leftArrow}
        nextLabel={icons.rightArrow}
        containerClassName={"paginationBtn"}
        previousLinkClassName={"prevBtn"}
        nextLinkClassName={"nextBtn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}

export default Pagination;
