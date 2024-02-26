import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// Creating a validator constraint to check if the params that has to be numbers are either a number or a numeric string.

@ValidatorConstraint({ name: 'isNumericString', async: false })
export class IsNumericStringConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: any, _args: ValidationArguments) {
    return typeof value === 'string' && !isNaN(parseInt(value, 10));
  }

  defaultMessage() {
    return 'The parameter must be either a number or a numeric string.';
  }
}

export function IsNumericString(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNumericStringConstraint,
    });
  };
}
