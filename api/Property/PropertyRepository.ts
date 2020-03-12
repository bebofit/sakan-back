import { Model } from "mongoose";
import { MainRepository } from "../../database/MainRepo";
import { Property, IProperty } from "../../database/models";
import { QueryParams, IPropertyFilter } from "../../Interfaces";

class PropertyRepository extends MainRepository<IProperty> {
  constructor(protected model: Model<IProperty>) {
    super(model);
  }

  filterProperty(filters: IPropertyFilter) {
    const conditions: any = {};
    conditions.rentValue = {
      $gte: filters.rentValueMin,
      $lte: filters.rentValueMax
    };
    conditions.unitArea = {
      $gte: filters.unitAreaMin,
      $lte: filters.unitAreaMax
    };
    if (filters.bathroomNum) {
      conditions.bathroomNum = { $gte: filters.bathroomNum };
    }
    if (filters.bedroomNum) {
      conditions.bedroomNum = { $gte: filters.bedroomNum };
    }
    if (filters.propType) {
      conditions.propType = filters.propType;
    }
    if (filters.city) {
      conditions["address.city"] = filters.city;
    }
    conditions["reservation.isReserved"] = false;
    return conditions;
  }

  getByFilter(filters: IPropertyFilter, options?: QueryParams) {
    const conditions = this.filterProperty(filters);
    return this.find(conditions, options);
  }

  reserveProperty(propId: any, userId: string): Promise<boolean> {
    return super.setUpdateOne(
      { _id: propId, "reservation.isReserved": false },
      {
        reservation: {
          isReserved: true,
          reservedBy: userId,
          reservedAt: new Date()
        }
      }
    );
  }
}

export default new PropertyRepository(Property);
