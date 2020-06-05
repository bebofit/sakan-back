import { Document, Model } from "mongoose";
import { IDBQueryOptions } from "../../Interfaces";

abstract class MainRepository<modelType extends Document> {
  constructor(protected model: Model<modelType>) {}

  protected parseQueryOptions(options: IDBQueryOptions): any {
    const result: any = {};
    // if (options.pojo == null) {
    //   result.lean = true;
    // }
    if (options?.new == null) {
      result.new = true;
    }
    if (options?.page != null) {
      result.skip = options.page * options.pageSize;
      result.limit = options.pageSize;
    }
    if (options?.search) {
      result.search = options.search;
    }
    if (options?.sort) {
      result.sort = options.sort;
    }
    if (options?.includeDeleted) {
      result.includeDeleted = options.includeDeleted;
    }
    if (options?.trx) {
      result.session = options.trx;
    }
    return result;
  }

  create(body: any): Promise<modelType> {
    return this.model.create(body);
  }

  findAll(options?: IDBQueryOptions): Promise<modelType[]> {
    return this.find({}, options);
  }

  find(conditions: any = {}, options?: IDBQueryOptions): Promise<modelType[]> {
    if (!options?.includeDeleted) {
      conditions.isDeleted = false;
    }
    const parsedOptions = options && this.parseQueryOptions(options);
    return this.model.find(conditions, null, parsedOptions).exec();
  }

  findPaginated(
    conditions: any = {},
    options?: IDBQueryOptions
  ): Promise<modelType[]> {
    if (!options?.includeDeleted) {
      conditions.isDeleted = false;
    }
    const parsedOptions = options && this.parseQueryOptions(options);
    return this.model.find(conditions, null, parsedOptions).exec();
  }

  findById(id: string, options?: IDBQueryOptions): Promise<modelType> {
    const parsedOptions = options && this.parseQueryOptions(options);
    return this.model.findById(id, null, parsedOptions).exec();
  }

  findOne(conditions: any, options?: IDBQueryOptions): Promise<modelType> {
    if (!options?.includeDeleted) {
      conditions.isDeleted = false;
    }
    const parsedOptions = options && this.parseQueryOptions(options);
    return this.model.findOne(conditions, null, parsedOptions).exec();
  }

  findByIdAndUpdate(
    id: string,
    update: any,
    options?: IDBQueryOptions
  ): Promise<modelType> {
    const parsedOptions = options && this.parseQueryOptions(options);
    return this.model
      .findByIdAndUpdate(id, { $set: update }, parsedOptions)
      .exec();
  }

  flexibleFindByIdAndUpdate(
    id: string,
    update: any,
    options?: IDBQueryOptions
  ): Promise<modelType> {
    const parsedOptions = options && this.parseQueryOptions(options);
    return this.model.findByIdAndUpdate(id, update, parsedOptions).exec();
  }

  findOneAndUpdate(
    conditions: any,
    update: any,
    options?: IDBQueryOptions
  ): Promise<modelType> {
    if (!options?.includeDeleted) {
      conditions.isDeleted = false;
    }
    const parsedOptions = options && this.parseQueryOptions(options);
    return this.model
      .findOneAndUpdate(conditions, { $set: update }, parsedOptions)
      .exec();
  }

  flexibleFindOneAndUpdate(
    conditions: any,
    update: any,
    options?: IDBQueryOptions
  ): Promise<modelType> {
    if (!options?.includeDeleted) {
      conditions.isDeleted = false;
    }
    const parsedOptions = options && this.parseQueryOptions(options);
    return this.model
      .findOneAndUpdate(conditions, update, parsedOptions)
      .exec();
  }

  setUpdateMany(
    conditions: any,
    update: any,
    options?: IDBQueryOptions
  ): Promise<boolean> {
    const parsedOptions = this.parseQueryOptions(options);
    if (!parsedOptions?.includeDeleted) {
      conditions.isDeleted = false;
    }
    return this.model
      .updateMany(conditions, { $set: update }, parsedOptions)
      .exec()
      .then(result => true);
  }

  flexibleUpdateMany(conditions: any = {}, update: any): Promise<boolean> {
    conditions.isDeleted = false;
    return this.model
      .updateMany(conditions, update)
      .exec()
      .then(result => result.nModified > 0);
  }

  setUpdateById(id: string, update: any): Promise<boolean> {
    return this.setUpdateOne({ _id: id }, update);
  }

  flexibleUpdateById(id: string, update: any): Promise<boolean> {
    return this.flexibleUpdateOne({ _id: id }, update);
  }

  setUpdateOne(conditions: any, update: any): Promise<boolean> {
    conditions.isDeleted = false;
    return this.model
      .updateOne(conditions, { $set: update })
      .exec()
      .then(result => result.nModified > 0);
  }

  flexibleUpdateOne(conditions: any, update: any): Promise<boolean> {
    conditions.isDeleted = false;
    console.log(conditions, update);

    return this.model
      .updateOne(conditions, update)
      .exec()
      .then(result => result.nModified > 0);
  }

  softDeleteById(id: string): Promise<boolean> {
    return this.softDeleteOne({ _id: id });
  }

  softDeleteOne(conditions: any): Promise<boolean> {
    conditions.isDeleted = false;
    return this.model
      .updateOne(conditions, {
        $set: {
          isDeleted: true
        }
      })
      .exec()
      .then(result => result.nModified > 0);
  }

  softDeleteMany(conditions: any, options?: IDBQueryOptions): Promise<boolean> {
    const parsedOptions = this.parseQueryOptions(options);
    conditions.isDeleted = false;
    return this.model
      .updateMany(
        conditions,
        {
          $currentDate: {
            deletedAt: true
          }
        },
        parsedOptions
      )
      .exec()
      .then(result => true);
  }

  softDeleteAll(options?: IDBQueryOptions): Promise<boolean> {
    return this.softDeleteMany({}, options);
  }

  deleteById(id: string, options?: IDBQueryOptions): Promise<boolean> {
    return this.deleteOne({ _id: id }, options);
  }

  deleteOne(conditions: any, options?: IDBQueryOptions): Promise<boolean> {
    // To-do: clean this when @types/mongoose is updated
    return (this.model.deleteOne as any)(conditions, options)
      .exec()
      .then(
        (result: { ok?: number; n?: number; deletedCount?: number }) =>
          result.n === 1
      );
  }

  deleteMany(conditions: any, options?: IDBQueryOptions): Promise<boolean> {
    // To-do: clean this when @types/mongoose is updated
    return (this.model.deleteMany as any)(conditions, options)
      .exec()
      .then(
        (result: { ok?: number; n?: number; deletedCount?: number }) => true
      );
  }

  deleteAll(options?: IDBQueryOptions): Promise<boolean> {
    return this.deleteMany({}, options);
  }
}

export default MainRepository;
