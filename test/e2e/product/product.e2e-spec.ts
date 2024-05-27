

// test/product.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import {newProduct} from '../../mocks/product.mocks'

describe('Product (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();


  });

  afterAll(async () => {
    await app.close();
  });
  
 
  let productId: number

  it('(POST) /product', async () => {
    const response = await request(app.getHttpServer())
    .post('/product')
    .send(newProduct)
    .expect(201);
    expect(response.body).not.toBeNull();
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newProduct.name);
    expect(Number(response.body.price)).toBe(newProduct.price);
    expect(response.body.description).toBe(newProduct.description);
    expect(response.body.pictures[0]).toBe(newProduct.pictures[0]);
    expect(response.body.pictures[1]).toBe(newProduct.pictures[1]);
    expect(Number(response.body.category.id)).toBe(newProduct.categoryId);
    productId = response.body.id;
  });

  it('(GET) /product/:ID', async () => {
    const getResponse = await request(app.getHttpServer())
    .get(`/product/${productId}`)
    .expect(200);
    expect(getResponse.body).not.toBeNull();
    expect(getResponse.body).toHaveProperty('id');
    expect(getResponse.body.name).toBe(newProduct.name);
    expect(Number(getResponse.body.price)).toBe(newProduct.price);
    expect(getResponse.body.description).toBe(newProduct.description);
    expect(getResponse.body.pictures[0]).toBe(newProduct.pictures[0]);
    expect(getResponse.body.pictures[1]).toBe(newProduct.pictures[1]);
    expect(Number(getResponse.body.category.id)).toBe(newProduct.categoryId);
  });

  it('(PATCH) /product/:ID', async () => {
    const newProductName = "New Product"
    const patchResponse = await request(app.getHttpServer())
    .patch(`/product/${productId}`)
    .send({name:newProductName})
    .expect(200);
    expect(patchResponse.body).not.toBeNull();
    expect(patchResponse.body).toHaveProperty('id');
    expect(patchResponse.body.name).toBe(newProductName);
    expect(Number(patchResponse.body.price)).toBe(newProduct.price);
    expect(patchResponse.body.description).toBe(newProduct.description);
    expect(patchResponse.body.pictures[0]).toBe(newProduct.pictures[0]);
    expect(patchResponse.body.pictures[1]).toBe(newProduct.pictures[1]);
    expect(Number(patchResponse.body.category.id)).toBe(newProduct.categoryId);
  });

  it('(GET) /product', async () => {
    const getAllProductsResponse = await request(app.getHttpServer())
    .get('/product')
    .expect(200);
    expect(getAllProductsResponse.body).toStrictEqual(expect.any(Array))
  });

  it('(Delete) /product/:ID', async () => {
    const deleteResponse = await request(app.getHttpServer())
    .delete(`/product/${productId}`)
    .expect(200);
    expect(deleteResponse.body).not.toBeNull();
  });

});
