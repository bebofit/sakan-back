export interface QueryParams {
  pojo?: boolean;
  includeDeleted?: boolean;
  page?: number;
  pageSize?: number;
  sort?: string; // -name desc name asc
}
