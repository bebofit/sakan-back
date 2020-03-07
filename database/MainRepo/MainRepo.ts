import { Document, Model } from "mongoose";
import { QueryParams } from "../../Interfaces";

abstract class MainRepository<modelType extends Document> {
  constructor(protected model: Model<modelType>) {}

  protected parseQueryOptions(options: QueryParams): any {
    const result: any = { new: true };
    if (options.pojo) {
      result.lean = true;
    }
    if (options.page && options.pageSize) {
      result.skip = options.page * options.pageSize;
      result.limit = options.pageSize;
    }
    if (options.sort) {
      result.sort = options.sort;
    }
    if (options.includeDeleted) {
      result.includeDeleted = options.includeDeleted;
    }
    return result;
  }

  create(body: any): Promise<modelType> {
    return this.model.create(body);
  }

  findAll(options?: QueryParams): Promise<modelType[]> {
    return this.find({}, options);
  }

  find(conditions: any = {}, options: QueryParams = {}): Promise<modelType[]> {
    if (!options.includeDeleted) {
      conditions.isDeleted = false;
    }
    const parsedOptions = options && this.parseQueryOptions(options);
    return this.model.find(conditions, null, parsedOptions).exec();
  }

  findPaginated(
    conditions: any = {},
    options: QueryParams = {}
  ): Promise<modelType[]> {
    if (!options.includeDeleted) {
      conditions.isDeleted = false;
    }
    const parsedOptions = options && this.parseQueryOptions(options);
    return this.model.find(conditions, null, parsedOptions).exec();
  }

  findById(id: string, options: QueryParams = {}): Promise<modelType> {
    const parsedOptions = options && this.parseQueryOptions(options);
    return this.model.findById(id, null, parsedOptions).exec();
  }

  findOne(conditions: any, options: QueryParams = {}): Promise<modelType> {
    if (!options.includeDeleted) {
      conditions.isDeleted = false;
    }
    const parsedOptions = options && this.parseQueryOptions(options);
    return this.model.findOne(conditions, null, parsedOptions).exec();
  }

  findByIdAndUpdate(
    id: string,
    update: any,
    options: QueryParams = {}
  ): Promise<modelType> {
    const parsedOptions = options && this.parseQueryOptions(options);
    return this.model
      .findByIdAndUpdate(id, { $set: update }, parsedOptions)
      .exec();
  }

  flexibleFindByIdAndUpdate(
    id: string,
    update: any,
    options: QueryParams = {}
  ): Promise<modelType> {
    const parsedOptions = options && this.parseQueryOptions(options);
    return this.model.findByIdAndUpdate(id, update, parsedOptions).exec();
  }

  findOneAndUpdate(
    conditions: any,
    update: any,
    options: QueryParams = {}
  ): Promise<modelType> {
    if (!options.includeDeleted) {
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
    options: QueryParams = {}
  ): Promise<modelType> {
    if (!options.includeDeleted) {
      conditions.isDeleted = false;
    }
    const parsedOptions = options && this.parseQueryOptions(options);
    return this.model
      .findOneAndUpdate(conditions, update, parsedOptions)
      .exec();
  }

  setUpdateMany(conditions: any = {}, update: any): Promise<boolean> {
    conditions.isDeleted = false;
    return this.model
      .updateMany(conditions, { $set: update })
      .exec()
      .then(result => result.nModified > 0);
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
    return this.model
      .updateOne(conditions, update)
      .exec()
      .then(result => result.nModified > 0);
  }

  softDeleteMany(conditions: any = {}): Promise<boolean> {
    conditions.isDeleted = false;
    return this.model
      .updateMany(conditions, {
        $set: {
          isDeleted: true
        }
      })
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
}

export default MainRepository;
