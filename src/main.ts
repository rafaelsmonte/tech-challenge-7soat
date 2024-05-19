import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('/v1');

  app.useGlobalPipes(new ValidationPipe({ whitelist: false, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Tech Challenge APIs')
    .setDescription('APIs for tech challenge')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    ['/docs'],
    basicAuth({
      challenge: true,
      users: {
        ['admin']: 'admin',
      },
    }),
  );

  SwaggerModule.setup('docs', app, document);

  const servicePort = configService.get<number>('SERVICE_PORT') || 3000;

  await app.listen(servicePort, () => {
    console.log(
      `Server Successfully Started Listening on Port: ${servicePort}`,
    );
  });
}
bootstrap();
