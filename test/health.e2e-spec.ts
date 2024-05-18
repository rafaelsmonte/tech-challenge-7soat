import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CategoryService } from 'src/category/domain/inboundPorts/category.service';

describe('HealthCheck (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(PrismaService)
    .useValue(null)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('(GET) - Health', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect('OK!');
  });
});
