export interface IPaginationOptions {
  pojo?: boolean;
  includeDeleted?: boolean;
  page?: number;
  pageSize?: number;
  sort?: string; // -name desc name asc
  search?: string;
}
