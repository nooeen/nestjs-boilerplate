import {InfinityPaginationResultType} from '../serializers/infinity-pagination-result.serializer';
import {PaginationOptions} from "@app/share/ts/pagination";

export const getPaginationProp = (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  return {
    offset,
  };
};

export const getTotalPaginatedPages = (limit: number, totalItems: number) => {
  return Math.ceil(totalItems / limit);
};

export const infinityPagination = <T>(
  data: T[],
  options: PaginationOptions,
): InfinityPaginationResultType<T> => {
  return {
    data,
    hasNextPage: data.length === options.limit,
  };
};
