

import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { v4 as uuidv4 } from 'uuid';
describe('Customer (e2e)', () => {
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
  
  const newCustomer = {
    "name": "customer name",
    "email": "customer@email.com",
    "taxpayerRegistry": uuidv4()
  };
  let CustomerId: number

  it('(POST) /customer', async () => {
    const response = await request(app.getHttpServer())
    .post('/customer')
    .send(newCustomer)
    .expect(201);
    expect(response.body).not.toBeNull();
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newCustomer.name);
    expect(response.body.email).toBe(newCustomer.email);
    expect(response.body.taxpayerRegistry).toBe(newCustomer.taxpayerRegistry);

    CustomerId = response.body.id;
  });

  it('(GET) /customer/:ID', async () => {
    const getResponse = await request(app.getHttpServer())
    .get(`/customer/${CustomerId}`)
    .expect(200);
    expect(getResponse.body).not.toBeNull();
    expect(getResponse.body).toHaveProperty('id');
    expect(getResponse.body.name).toBe(newCustomer.name);
    expect(getResponse.body.email).toBe(newCustomer.email);
    expect(getResponse.body.taxpayerRegistry).toBe(newCustomer.taxpayerRegistry);

  });

  it('(GET) /customer/check-if-exists/:taxpayerRegistry', async () => {
    const checkCustomerResponse = await request(app.getHttpServer())
    .get(`/customer/check-if-exists/${newCustomer.taxpayerRegistry}`)
    .expect(200);

    expect(checkCustomerResponse.body).not.toBeNull();
    expect(checkCustomerResponse.body).toHaveProperty('id');
    expect(checkCustomerResponse.body.name).toBe(newCustomer.name);
    expect(checkCustomerResponse.body.email).toBe(newCustomer.email);
    expect(checkCustomerResponse.body.taxpayerRegistry).toBe(newCustomer.taxpayerRegistry);

  });

  it('(PATCH) /Customer/:ID', async () => {
    const newCustomerName = "New Customer"
    const patchResponse = await request(app.getHttpServer())
    .patch(`/Customer/${CustomerId}`)
    .send({name:newCustomerName})
    .expect(200);
    expect(patchResponse.body).not.toBeNull();
    expect(patchResponse.body).toHaveProperty('id');
    expect(patchResponse.body.name).toBe(newCustomerName);
    expect(patchResponse.body.email).toBe(newCustomer.email);
    expect(patchResponse.body.taxpayerRegistry).toBe(newCustomer.taxpayerRegistry);

  });

  it('(GET) /Customer', async () => {
    const getAllCustomersResponse = await request(app.getHttpServer())
    .get('/Customer')
    .expect(200);
    expect(getAllCustomersResponse.body).toStrictEqual(expect.any(Array))
  });

  it('(Delete) /Customer/:ID', async () => {
    const deleteResponse = await request(app.getHttpServer())
    .delete(`/Customer/${CustomerId}`)
    .expect(200);
    expect(deleteResponse.body).not.toBeNull();
  });

});


