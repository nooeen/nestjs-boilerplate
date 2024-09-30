import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, ValidateNested } from 'class-validator';

export type PaginationOptions = {
  page: number;
  limit: number;
};

export class PaginationOptionsDto implements PaginationOptions {
  @IsOptional()
  @Type(() => Number)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  limit = 24;
}

export type PaginatedResult<T> = Readonly<{
  data: T[];
  page: number;
  total_items: number;
  total_pages: number;
  created_at?: number;
}>;

export class PaginatedResultDto<T> implements PaginatedResult<T> {
  @ValidateNested()
  data: T[];

  @IsInt()
  page: number;

  @IsInt()
  total_items: number;

  @IsInt()
  total_pages: number;

  @IsOptional()
  @IsInt()
  created_at?: number;
}

export type NonPaginatedResult<T> = Readonly<{
  data: T[];
  created_at?: number;
}>;

export class NonPaginatedResultDto<T> implements NonPaginatedResult<T> {
  @ValidateNested()
  data: T[];

  @IsOptional()
  @IsInt()
  created_at?: number;
}

export type InfinityPaginatedResult<T> = Readonly<{
  data: T[];
  hasNextPage: boolean;
  created_at?: number;
}>;

export class InfinityPaginatedResponseDto<T>
  implements InfinityPaginatedResult<T>
{
  @ValidateNested()
  data: T[];

  @IsBoolean()
  hasNextPage: boolean;

  @IsOptional()
  @IsInt()
  created_at?: number;
}
