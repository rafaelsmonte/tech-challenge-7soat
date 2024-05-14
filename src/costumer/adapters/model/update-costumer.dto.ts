import { PartialType } from '@nestjs/swagger';
import { CreateCostumerDTO } from './create-costumer.dto';

export class UpdateCostumerDTO extends PartialType(CreateCostumerDTO) {}
