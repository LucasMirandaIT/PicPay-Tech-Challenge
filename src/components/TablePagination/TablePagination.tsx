import { usePagination } from "../../hooks/usePaginationHook";
import "./TablePagination.scss";

import Pagination from "../../interfaces/Pagination";

const TablePagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: Pagination) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (paginationRange && paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange?.(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange?.(currentPage - 1);
  };

  let lastPage = paginationRange
    ? paginationRange[paginationRange.length - 1]
    : 1;
  return (
    <ul className={"pagination-container"}>
      {/* Left navigation arrow */}
      <button
        disabled={currentPage === 1}
        data-testid="pagination-back-btn"
        className={`pagination-item arrow 
          ${currentPage === 1 ? "disabled" : ""}
        `}
        onClick={onPrevious}
      >
        <div className="arrow left">&lt;</div>
      </button>
      {paginationRange?.map((pageNumber: number) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === 0o0) {
          return (
            <li key={Math.random()} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            key={pageNumber}
            data-testid={`pagination-pill-${pageNumber}`}
            className={`pagination-item ${
              pageNumber === currentPage ? "selected" : ""
            }`}
            onClick={() => onPageChange?.(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <button
        disabled={currentPage === lastPage}
        data-testid="pagination-next-btn"
        className={`pagination-item arrow ${
          currentPage === lastPage ? "disabled" : ""
        }`}
        onClick={onNext}
      >
        <div className="arrow right">&gt;</div>
      </button>
    </ul>
  );
};

export default TablePagination;
