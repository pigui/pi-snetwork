import { Logger } from '@nestjs/common';
import { AbstractDoument } from './abstract.schema';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

export abstract class AbstractRepository<T extends AbstractDoument> {
  protected readonly logger: Logger = new Logger(
    Object.getPrototypeOf(this).constructor.name as string
  );

  constructor(private readonly model: Model<T>) {}

  async create(document: Omit<T, '_id'>): Promise<T> {
    this.logger.log('create');
    const createDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createDocument.save()).toJSON() as unknown as T;
  }

  async findById(_id: string) {
    this.logger.log('findOById', _id);
    const document = await this.model.findById(_id, {}, { lean: true });
    if (!document) {
      this.logger.warn('Document not found', _id);
    }
    return document as unknown as T;
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    this.logger.log('findOne', filterQuery);
    const document = await this.model.findOne(filterQuery, {}, { lean: true });
    if (!document) {
      this.logger.warn('Document not found', filterQuery);
    }
    return document as unknown as T;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    update: UpdateQuery<T>
  ): Promise<T> {
    this.logger.log('findOneAndUpdate', filterQuery);
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
    });
    if (!document) {
      this.logger.warn('Document not update', filterQuery);
    }
    return document as unknown as T;
  }

  async find(filterQuery?: FilterQuery<T>): Promise<T[]> {
    if (filterQuery) {
      this.logger.log('find', filterQuery);
    } else {
      this.logger.log('find');
    }

    return (await this.model.find(
      filterQuery,
      {},
      { lean: true }
    )) as unknown as T[];
  }
}
