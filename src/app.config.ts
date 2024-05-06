import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

const configValidationSchema = {};

export default ConfigModule.forRoot({
  ignoreEnvFile: true,
  isGlobal: true,
  validationSchema: Joi.object(configValidationSchema),
});
