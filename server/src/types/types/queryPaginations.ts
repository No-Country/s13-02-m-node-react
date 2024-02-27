export type TQueryPagination<T> = {
  data: T[];
  pagination?: {
    totalPages: number;
    limit: number;
    page: number;
  };
};
