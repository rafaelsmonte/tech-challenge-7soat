import { NextFunction, Request, Response } from 'express';
import promMid from 'express-prometheus-middleware';
import { CategoryController } from '../controllers/category.controller';
import { CustomerController } from '../controllers/customer.controller';
import { OrderController } from '../controllers/order.controller';
import { ProductController } from '../controllers/product.controller';
import { CategoryNotFoundError } from '../errors/category-not-found.error';
import { CustomerAlreadyRegisteredError } from '../errors/customer-already-registered.error';
import { CustomerNotFoundError } from '../errors/customer-not-found.error';
import { DatabaseError } from '../errors/database.error';
import { InvalidCustomerError } from '../errors/invalid-customer.error';
import { InvalidOrderError } from '../errors/invalid-order.error';
import { InvalidProductError } from '../errors/invalid-product.error';
import { OrderNotFoundError } from '../errors/order-not-found.error';
import { PaymentError } from '../errors/payment.error';
import { ProductNotFoundError } from '../errors/product-not-found.error';
import { IDatabase } from '../interfaces/database.interface';
import { IPayment } from '../interfaces/payment.interface';
import { InvalidPaymentOrderStatusError } from '../errors/invalid-payment-status.error';
import { IncorrectPaymentActionError } from '../errors/incorrect-payment-action.error';
import { createHmac } from 'crypto';

export class TechChallengeApp {
  constructor(private database: IDatabase, private payment: IPayment) {}

  start() {
    const express = require('express');
    const bodyParser = require('body-parser');
    const swaggerUi = require('swagger-ui-express');

    const port = 3000;
    const app = express();

    app.use(bodyParser.json());

    // Metrics
    app.use(
      promMid({
        metricsPath: '/metrics',
        collectDefaultMetrics: true,
        requestDurationBuckets: [0.1, 0.5, 1, 1.5],
        requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
        responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
      }),
    );

    //Swagger
    const options = require('./swagger.json');
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(options));

    // Customer endpoints
    app.get('/customer', async (request: Request, response: Response) => {
      await CustomerController.findAll(this.database)
        .then((customers) => {
          response
            .setHeader('Content-type', 'application/json')
            .status(200)
            .send(customers);
        })
        .catch((error) => this.handleError(error, response));
    });

    app.get('/customer/:id', async (request: Request, response: Response) => {
      const id = Number(request.params.id);
      await CustomerController.findById(this.database, id)
        .then((customer) => {
          response
            .setHeader('Content-type', 'application/json')
            .status(200)
            .send(customer);
        })
        .catch((error) => this.handleError(error, response));
    });

    app.get(
      '/customer/check-if-exists/:taxpayerRegistry',
      async (request: Request, response: Response) => {
        const taxpayerRegistry = request.params.taxpayerRegistry;
        await CustomerController.findByTaxpayerRegistry(
          this.database,
          taxpayerRegistry,
        )
          .then((customer) => {
            response
              .setHeader('Content-type', 'application/json')
              .status(200)
              .send(customer);
          })
          .catch((error) => this.handleError(error, response));
      },
    );

    app.post('/customer', async (request: Request, response: Response) => {
      const { name, taxpayerRegistry, email } = request.body;
      await CustomerController.create(
        this.database,
        name,
        taxpayerRegistry,
        email,
      )
        .then((customer) => {
          response
            .setHeader('Content-type', 'application/json')
            .status(200)
            .send(customer);
        })
        .catch((error) => this.handleError(error, response));
    });

    app.delete(
      '/customer/:id',
      async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        await CustomerController.delete(this.database, id)
          .then(() => response.status(204).send())
          .catch((error) => this.handleError(error, response));
      },
    );

    // Category endpoints
    app.get('/category', async (request: Request, response: Response) => {
      await CategoryController.findAll(this.database)
        .then((categories) => {
          response
            .setHeader('Content-type', 'application/json')
            .status(200)
            .send(categories);
        })
        .catch((error) => this.handleError(error, response));
    });

    // Product endpoints
    app.get('/product', async (request: Request, response: Response) => {
      await ProductController.findAll(this.database)
        .then((products) => {
          response
            .setHeader('Content-type', 'application/json')
            .status(200)
            .send(products);
        })
        .catch((error) => this.handleError(error, response));
    });

    app.get('/product/:id', async (request: Request, response: Response) => {
      const id = Number(request.params.id);
      await ProductController.findById(this.database, id)
        .then((product) => {
          response
            .setHeader('Content-type', 'application/json')
            .status(200)
            .send(product);
        })
        .catch((error) => this.handleError(error, response));
    });

    app.post('/product', async (request: Request, response: Response) => {
      const { name, price, description, pictures, categoryId } = request.body;
      await ProductController.create(
        this.database,
        name,
        price,
        description,
        pictures,
        categoryId,
      )
        .then((product) => {
          response
            .setHeader('Content-type', 'application/json')
            .status(200)
            .send(product);
        })
        .catch((error) => this.handleError(error, response));
    });

    app.delete('/product/:id', async (request: Request, response: Response) => {
      const id = Number(request.params.id);
      await ProductController.delete(this.database, id)
        .then(() => response.status(204).send())
        .catch((error) => this.handleError(error, response));
    });

    // Order endpoints
    app.get('/order', async (request: Request, response: Response) => {
      await OrderController.findAll(this.database)
        .then((orders) => {
          response
            .setHeader('Content-type', 'application/json')
            .status(200)
            .send(orders);
        })
        .catch((error) => this.handleError(error, response));
    });

    app.get('/order/:id', async (request: Request, response: Response) => {
      const id = Number(request.params.id);
      await OrderController.findById(this.database, id)
        .then((order) => {
          response
            .setHeader('Content-type', 'application/json')
            .status(200)
            .send(order);
        })
        .catch((error) => this.handleError(error, response));
    });

    app.post('/order', async (request: Request, response: Response) => {
      const { customerId, notes, productsAndQuantity } = request.body;
      await OrderController.create(
        this.database,
        this.payment,
        notes,
        productsAndQuantity,
        customerId,
      )
        .then((order) => {
          response
            .setHeader('Content-type', 'application/json')
            .status(200)
            .send(order);
        })
        .catch((error) => this.handleError(error, response));
    });

    // Mercado Pago Webhook
    app.post(
      '/order/payment',
      async (req: Request, res: Response, next: NextFunction) => {
        const { query } = req;
        const dataID = query['data.id'] as string;
        const xSignature = req.headers['x-signature'];
        const xRequestId = req.headers['x-request-id'];

        try {
          const secret: string = process.env.MERCADO_PAGO_SECRET || '';

          if (!xSignature || !xRequestId) {
            return res
              .status(401)
              .json({ message: 'Failed to check payment source' });
          }
          if (Array.isArray(xSignature)) {
            return res
              .status(401)
              .json({ message: 'Failed to check payment source' });
          }

          const parts = xSignature.split(',');

          let ts: string | undefined;
          let hash: string | undefined;

          parts.forEach((part) => {
            const [key, value] = part.split('=').map((str) => str.trim());
            if (key === 'ts') {
              ts = value;
            } else if (key === 'v1') {
              hash = value;
            }
          });

          if (!ts || !hash) {
            return res
              .status(401)
              .json({ message: 'Failed to check payment source' });
          }

          const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;
          const hmac = createHmac('sha256', secret);
          hmac.update(manifest);
          const sha = hmac.digest('hex');

          if (sha === hash) return next();
          return res
            .status(500)
            .json({ message: 'Failed to check payment source' });
        } catch (error) {
          return res
            .status(500)
            .json({ message: 'Failed to check payment source' });
        }
      },
      async (request: Request, response: Response) => {
        const paymentId = Number(request?.body?.data?.id);
        const action = request?.body?.action;

        if (action !== 'payment.updated')
          return response.status(500).json({ message: 'Invalid Action' });

        await OrderController.updateStatusOnPaymentReceived(
          this.database,
          this.payment,
          paymentId,
        )
          .then(() => {
            response.setHeader('Content-type', 'application/json').status(200);
          })
          .catch((error) => this.handleError(error, response));
      },
    );

    app.patch(
      '/order/:id/change-status',
      async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const status = request.body.status;
        await OrderController.update(this.database, id, status)
          .then((order) => {
            response
              .setHeader('Content-type', 'application/json')
              .status(200)
              .send(order);
          })
          .catch((error) => this.handleError(error, response));
      },
    );

    app.delete('/order/:id', async (request: Request, response: Response) => {
      const id = Number(request.params.id);
      await OrderController.delete(this.database, id)
        .then(() => response.status(204).send())
        .catch((error) => this.handleError(error, response));
    });

    app.listen(port, () => {
      console.log(`Tech challenge app listening on port ${port}`);
    });
  }

  handleError(error: Error, response: Response): void {
    if (error instanceof InvalidCustomerError) {
      response.status(400).json({ message: error.message });
    } else if (error instanceof InvalidOrderError) {
      response.status(400).json({ message: error.message });
    } else if (error instanceof InvalidProductError) {
      response.status(400).json({ message: error.message });
    } else if (error instanceof InvalidPaymentOrderStatusError) {
      response.status(400).json({ message: error.message });
    } else if (error instanceof IncorrectPaymentActionError) {
      response.status(400).json({ message: error.message });
    } else if (error instanceof CustomerNotFoundError) {
      response.status(404).json({ message: error.message });
    } else if (error instanceof OrderNotFoundError) {
      response.status(404).json({ message: error.message });
    } else if (error instanceof ProductNotFoundError) {
      response.status(404).json({ message: error.message });
    } else if (error instanceof CategoryNotFoundError) {
      response.status(404).json({ message: error.message });
    } else if (error instanceof CustomerAlreadyRegisteredError) {
      response.status(409).json({ message: error.message });
    } else if (error instanceof DatabaseError) {
      response.status(500).json({ message: error.message });
    } else if (error instanceof PaymentError) {
      response.status(500).json({ message: error.message });
    } else {
      console.log('An unexpected error has occurred: ' + error);
      response.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
