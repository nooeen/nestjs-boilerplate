import {
  HydratedDocument,
  Model,
  QueryOptions,
  UpdateWriteOpResult,
} from 'mongoose';
import { BaseSchema } from './base.schema';
import { PaginatedResultType } from '../serializers/paginated-response.serializer';
import {
  getPaginationProp,
  getTotalPaginatedPages,
} from '../utils/pagination.util';
import { Nullable } from '@app/share/ts/nullable';

export abstract class BaseRepositoryAbstract<T extends BaseSchema> {
  protected constructor(private readonly model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  bulkInsert(models: Array<Partial<T>>): Promise<Array<T>> {
    return this.model.create(models);
  }

  async findOne(query: QueryOptions): Promise<Nullable<HydratedDocument<T>>> {
    let dataQuery = null;

    dataQuery = this.model.findOne(query.filter);

    if (process.env.NODE_ENV === 'production') {
      if (query.cache_time) {
        return dataQuery.cacheQuery({
          TTL: query.cache_time,
          ...(query.cache_key && { cacheKey: query.cache_key }),
        });
      }
    }

    return await dataQuery.exec();
  }

  async findById(id: any): Promise<Nullable<HydratedDocument<T>>> {
    return this.model.findById(id);
  }

  async find(query: QueryOptions) {
    let dataQuery: any;

    if (query.filter) {
      dataQuery = this.model.find(query.filter);
    } else {
      dataQuery = this.model.find({});
    }

    if (query.sort !== null) {
      dataQuery.sort(query.sort);
    }

    if (query.limit !== null) {
      dataQuery.limit(query.limit);
    }

    if (query.offset !== null) {
      dataQuery.skip(query.offset);
    }

    if (query.select) {
      dataQuery.select(query.select);
    }

    if (query.cursor) {
      return dataQuery.cursor();
    }

    if (process.env.NODE_ENV === 'production') {
      if (query.cache_time) {
        return dataQuery.cacheQuery({
          TTL: query.cache_time,
          ...(query.cache_key && { cacheKey: query.cache_key }),
        });
      }
    }

    return await dataQuery.exec();
  }

  // Manual offset is disabled for pagination
  async findWithPagination(
    query: QueryOptions,
  ): Promise<PaginatedResultType<HydratedDocument<T>>> {
    let dataQuery: any;
    let dataCountQuery: any;

    if (query.filter) {
      dataCountQuery = this.model.countDocuments(query.filter);
      dataQuery = this.model.find(query.filter);
    } else {
      dataCountQuery = this.model.countDocuments({});
      dataQuery = this.model.find({});
    }

    if (query.sort !== null) {
      dataQuery.sort(query.sort);
    }

    if (query.select) {
      dataCountQuery.select(query.select);
      dataQuery.select(query.select);
    }

    dataQuery.skip(getPaginationProp(query.page, query.limit).offset);

    if (query.limit !== null) {
      dataQuery.limit(query.limit);
    }

    if (process.env.NODE_ENV === 'production') {
      if (query.cache_time) {
        const countQuery = await dataCountQuery.cacheQuery({
          TTL: query.cache_time,
          ...(query.cache_key && { cacheKey: `count_${query.cache_key}` }),
        });

        return {
          data: await dataQuery.cacheQuery({
            TTL: query.cache_time,
            ...(query.cache_key && {
              cacheKey: `${query.cache_key}_page_${query.page}`,
            }),
          }),
          page: query.page,
          total_items: countQuery,
          total_pages: getTotalPaginatedPages(query.limit, countQuery),
        };
      }
    }

    const countQuery = await dataCountQuery.exec();

    return {
      data: await dataQuery.exec(),
      page: query.page,
      total_items: countQuery,
      total_pages: getTotalPaginatedPages(query.limit, countQuery),
    };
  }

  async updateById(id: any, data: any): Promise<T> {
    return await this.model.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  async updateOne(filter: any, data: any): Promise<UpdateWriteOpResult> {
    return await this.model
      .updateOne(filter, data, { new: true, upsert: true })
      .exec();
  }

  async updateMany(filter: any, data: any): Promise<UpdateWriteOpResult> {
    return await this.model
      .updateMany(filter, data, { new: true, upsert: true })
      .exec();
  }

  async softDelete(id: number | string): Promise<UpdateWriteOpResult> {
    return await this.model.updateOne({ _id: id }, { deleted_at: new Date() });
  }

  async count(query: QueryOptions): Promise<number> {
    let dataQuery: any;

    if (query.filter) {
      dataQuery = this.model.countDocuments(query.filter);
    } else {
      dataQuery = this.model.countDocuments({});
    }

    if (process.env.NODE_ENV === 'production') {
      if (query.cache_time) {
        return dataQuery.cacheQuery({
          TTL: query.cache_time,
          ...(query.cache_key && { cacheKey: query.cache_key }),
        });
      }
    }

    return await dataQuery.exec();
  }
}
