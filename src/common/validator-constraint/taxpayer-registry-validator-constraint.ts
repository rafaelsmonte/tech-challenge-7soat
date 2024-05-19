import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'TaxpayerRegistryPattern', async: false })
export class TaxpayerRegistryPatternValidator
  implements ValidatorConstraintInterface
{
  validate(value: string, args: ValidationArguments) {
    // Regex pattern to match
    const TAXPAYER_REGISTRY_PATTERN = /^$|^([0-9]{11})$/;
    return TAXPAYER_REGISTRY_PATTERN.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    // Default error message
    return 'Value ($value) does not match the taxpayer registry pattern.';
  }
}
