export default interface TablePaginationInterface {
  onPageChange?: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}
