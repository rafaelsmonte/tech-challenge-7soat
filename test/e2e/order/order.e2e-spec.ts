

import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { newCustomer } from '../../mocks/customer.mocks';
import { newProduct} from '../../mocks/product.mocks';
import { newOrder} from '../../mocks/order.mocks';
describe('order (e2e)', () => {
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
  
  let orderId : number

  it('(POST) /Order', async () => {

    const customerResponse = await request(app.getHttpServer())
    .post('/customer')
    .send(newCustomer)
    .expect(201);

    const productResponse = await request(app.getHttpServer())
    .post('/product')
    .send(newProduct)
    .expect(201);

    newOrder.customerId = customerResponse.body.id
    newOrder.orderProducts.push({
      productId: productResponse.body.id,
      quantity: 1,
    },
    {
      productId: productResponse.body.id,
      quantity: 2,
    })
    const response = await request(app.getHttpServer())
    .post('/order')
    .send(newOrder)
    .expect(201);
    expect(response.body).not.toBeNull();
    expect(response.body).toHaveProperty('id');
    expect(Number(response.body.customer.id)).toBe(newOrder.customerId);
    expect(Number(response.body.products[0].id)).toBe(newOrder.orderProducts[0].productId);
    expect(Number(response.body.products[1].id)).toBe(newOrder.orderProducts[1].productId);
    expect(Number(response.body.products[1].quantity)).toBe(newOrder.orderProducts[0].quantity);
    expect(Number(response.body.products[0].quantity)).toBe(newOrder.orderProducts[1].quantity);

    orderId = response.body.id;
  });

  it('(GET) /order/:ID', async () => {
    const getResponse = await request(app.getHttpServer())
    .get(`/order/${orderId}`)
    .expect(200);
    expect(getResponse.body).not.toBeNull();
    expect(getResponse.body).toHaveProperty('id');
    expect(Number(getResponse.body.customer.id)).toBe(newOrder.customerId);
    expect(Number(getResponse.body.products[0].id)).toBe(newOrder.orderProducts[0].productId);
    expect(Number(getResponse.body.products[1].id)).toBe(newOrder.orderProducts[1].productId);
    expect(Number(getResponse.body.products[1].quantity)).toBe(newOrder.orderProducts[0].quantity);
    expect(Number(getResponse.body.products[0].quantity)).toBe(newOrder.orderProducts[1].quantity);
    expect(getResponse.body.status).toBe("AWAITING");
    expect(getResponse.body.notes).toBe(newOrder.notes);



  });


  it('(PATCH) /order/:ID', async () => {
    const statusDone = "DONE"
    const patchResponse = await request(app.getHttpServer())
    .patch(`/order/${orderId}/change-status`)
    .send({status: statusDone})
    .expect(200);
    expect(patchResponse.body).not.toBeNull();
    expect(patchResponse.body).toHaveProperty('id');
    expect(patchResponse.body.status).toBe(statusDone);

   });

  it('(GET) /order', async () => {
    const getAllordersResponse = await request(app.getHttpServer())
    .get('/order')
    .expect(200);
    expect(getAllordersResponse.body).toStrictEqual(expect.any(Array))
  });

  it('(Delete) /order/:ID', async () => {
    const deleteResponse = await request(app.getHttpServer())
    .delete(`/order/${orderId}`)
    .expect(200);
    expect(deleteResponse.body).not.toBeNull();

    const depeteCustomer = await request(app.getHttpServer())
    .delete(`/customer/${newOrder.customerId}`)
    .expect(200);
    expect(depeteCustomer.body).not.toBeNull();

    const deleteProduct = await request(app.getHttpServer())
    .delete(`/product/${newOrder.orderProducts[0].productId}`)
    .expect(200);
    expect(deleteProduct.body).not.toBeNull();

  });

});
