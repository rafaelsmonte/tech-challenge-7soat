import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Validate } from 'class-validator';
import { TaxpayerRegistryPatternValidator } from 'src/common/validator-constraint/taxpayer-registry-validator-constraint';

export class CreateCustomerDTO {
  @ApiProperty({ example: 'customer name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'customer@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '01234567890' })
  @Validate(TaxpayerRegistryPatternValidator)
  taxpayerRegistry: string;
}
