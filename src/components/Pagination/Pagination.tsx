import reactPaginateModule from "react-paginate";
import css from "./Pagination.module.css";

const ReactPaginate =
  (reactPaginateModule as any)?.default ?? reactPaginateModule;

interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={handlePageClick}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
