import { HydratedDocument, UpdateWriteOpResult } from 'mongoose';
import { BaseRepositoryInterface } from '../database/base.repository.interface';
import { BaseSchema } from '../database/base.schema';
import { BaseServiceInterface } from './base.service.interface';
import { NullableType } from 'joi';
import { PaginatedResultType } from '../serializers/paginated-response.serializer';
import {QueryOptions} from "@app/share/ts/query-options";

export abstract class BaseServiceAbstract<T extends BaseSchema>
  implements BaseServiceInterface<T>
{
  constructor(private readonly repository: BaseRepositoryInterface<T>) {}

  create(item: Partial<T> | T | any): Promise<T> {
    return this.repository.create(item);
  }

  /*bulkInsert(models: Array<T> | any): Promise<Array<T>> {
    return this.repository.bulkInsert(models);
  }*/

  findOne(query: QueryOptions): Promise<HydratedDocument<T>> {
    return this.repository.findOne(query);
  }

  findById(id: any): Promise<HydratedDocument<T>> {
    return this.repository.findById(id);
  }

  find(query: QueryOptions) {
    return this.repository.find(query);
  }

  findWithPagination(
    query: QueryOptions,
  ): Promise<PaginatedResultType<HydratedDocument<T>>> {
    return this.repository.findWithPagination(query);
  }

  updateById(id: any, item: any): Promise<NullableType<T>> {
    return this.repository.updateById(id, item);
  }

  updateOne(filter: any, data: any): Promise<UpdateWriteOpResult> {
    return this.repository.updateOne(filter, data);
  }

  updateMany(filter: any, data: any): Promise<UpdateWriteOpResult> {
    return this.repository.updateMany(filter, data);
  }

  /*softDelete(id: any): Promise<UpdateWriteOpResult> {
    return this.repository.softDelete(id)
  }*/

  count(query: QueryOptions): Promise<number> {
    return this.repository.count(query);
  }
}
