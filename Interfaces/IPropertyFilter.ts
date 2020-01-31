import { PropType } from '../enums';

export interface IPropertyFilter {
  street?: string;
  city?: string;
  propType?: PropType;
  bedroomNum?: number;
  bathroomNum?: number;
  unitAreaMin?: number;
  unitAreaMax?: number;
  rentValueMin?: number;
  rentValueMax?: number;
}
