import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps {
  pageCount: number;
  currentPage: number; // текущая страница (0-based)
  onPageChange: (page: number) => void; // тоже 0-based
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected); // без +1
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={handlePageClick}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
