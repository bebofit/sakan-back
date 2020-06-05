import { isValid } from "date-fns";
import { Types } from "mongoose";
import joi from "../../lib/joi";
import {
  PARAMS_VALIDATION,
  HEADERS_VALIDATION,
  BODY_VALIDATION
} from "../../common/errors";

const { ObjectId } = Types;

class Validation {
  validateBody(body: any, schema: joi.Schema): any {
    const { error: joiErrors, value } = schema.validate(body, {
      stripUnknown: true,
      abortEarly: false
    });
    if (joiErrors) {
      const errors = joiErrors.details.reduce(
        (obj: Record<string, string>, error: joi.ValidationErrorItem) => {
          const key = error.path.join(".");
          obj[key] = `err_${error.type.split(".")[1]}`;
          return obj;
        },
        {}
      );
      throw {
        errors,
        errorCode: BODY_VALIDATION,
        validationError: true
      };
    }
    return value;
  }

  isString = (val: any): boolean => typeof val === "string";

  isNumber = (val: any): boolean => !Number.isNaN(val);

  isBoolean = (val: any): boolean => val === true || val === false;

  isDate = (val: any): boolean => isValid(val);

  isObject = (val: any): boolean => typeof val === "object";

  isObjectId = (val: any): boolean => ObjectId.isValid(val);

  isArray = (val: any): boolean => Array.isArray(val);

  matchesRegex = (val: any, regex: RegExp): boolean => regex.test(val);

  validateDBId(id: any): void {
    const isValid = this.isObjectId(id);
    if (!isValid) {
      throw {
        errorCode: PARAMS_VALIDATION,
        validationError: true
      };
    }
  }

  validateESId(id: any): void {
    if (!(this.isString(id) && id.trim().length)) {
      throw {
        errorCode: PARAMS_VALIDATION,
        validationError: true
      };
    }
  }

  validateDeviceId(id: any): void {
    if (!(this.isString(id) && id.trim().length)) {
      throw {
        errorCode: HEADERS_VALIDATION,
        validationError: true
      };
    }
  }
}

export default new Validation();
