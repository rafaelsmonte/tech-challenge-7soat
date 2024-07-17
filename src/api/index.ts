import { CategoryController } from '@controllers/category.controller';
import { CustomerController } from '@controllers/customer.controller';
import { IDatabase } from '@interfaces/database.interface';

import { Request, Response } from 'express';

export class TechChallengeApp {
  private _database: IDatabase;

  constructor(database: IDatabase) {
    this._database = database;
  }

  start() {
    const express = require('express');
    const bodyParser = require('body-parser');

    const port = 3000;
    const app = express();
    app.use(bodyParser.json());

    // Customer endpoints
    app.get('/customer', async (request: Request, response: Response) => {
      const customers = await CustomerController.findAll(this._database);
      response
        .setHeader('Content-type', 'application/json')
        .status(200)
        .send(customers);
    });

    app.get('/customer/:id', async (request: Request, response: Response) => {
      const id = request.params.id;
      const customer = await CustomerController.findById(this._database, id);
      response
        .setHeader('Content-type', 'application/json')
        .status(200)
        .send(customer);
    });

    app.get(
      '/customer/check-if-exists/:taxpayerRegistry',
      async (request: Request, response: Response) => {
        const taxpayerRegistry = request.params.taxpayerRegistry;
        const customer = await CustomerController.findByTaxpayerRegistry(
          this._database,
          taxpayerRegistry,
        );
        response
          .setHeader('Content-type', 'application/json')
          .status(200)
          .send(customer);
      },
    );

    app.post('/customer', async (request: Request, response: Response) => {
      const { name, taxpayerRegistry, email } = request.body;
      const newCustomer = await CustomerController.create(
        this._database,
        name,
        taxpayerRegistry,
        email,
      );
      response
        .setHeader('Content-type', 'application/json')
        .status(200)
        .send(newCustomer);
    });

    app.delete(
      '/customer/:id',
      async (request: Request, response: Response) => {
        const id = request.params.id;
        await CustomerController.delete(this._database, id);
        response.status(204).send();
      },
    );

    // Category endpoints
    app.get('/category', async (request: Request, response: Response) => {
      const categories = await CategoryController.findAll(this._database);
      response
        .setHeader('Content-type', 'application/json')
        .status(200)
        .send(categories);
    });

    // Product endpoints
    // TODO implement product endpoints

    // Order endpoints
    // TODO implement order endpoints

    app.listen(port, () => {
      console.log(`Tech challenge app listening on port ${port}`);
    });
  }
}
