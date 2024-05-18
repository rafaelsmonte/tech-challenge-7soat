import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import {MockPrismaService, FakeCategory} from '../../mock/category/category.mock'

describe('Category (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(PrismaService)
    .useValue(MockPrismaService)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should Return (200)', () => {
    return request(app.getHttpServer())
      .get('/category')
      .expect(200)
      .expect(FakeCategory)
  });
});
