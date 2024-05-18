import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import {MockPrismaService, FakeProducts} from '../../mock/product/product.mock'



describe('Product (e2e)', () => {
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
  it('(GET) - Should Return (200)', () => {
    return request(app.getHttpServer())
      .get('/product')
      .expect(200)
      .expect(FakeProducts)
  });
  it('(DELETE) - Should Return (200)', () => {
    return request(app.getHttpServer())
      .delete('/product/1')
      .expect(200)
      .expect({})
  });
  it('(POST) - Should Return (201)', () => {
    return request(app.getHttpServer())
      .post('/product')
      .expect(201)
      .expect(FakeProducts[0])
  });
  it('Should Return (200)', () => {
    return request(app.getHttpServer())
      .patch('/product/1')
      .expect(200)
      .expect(FakeProducts[0])

  });
  it('(GET)/:id - Should Return (200)', () => {
    return request(app.getHttpServer())
      .get('/product/:id')
      .expect(200)
      .expect(FakeProducts[0])
  });
});
