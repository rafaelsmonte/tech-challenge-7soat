import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import {
  CostumerAlreadyRegisteredException,
  CostumerNotFoundHttpException,
  OrderNotFoundHttpException,
  ProductNotFoundHttpException,
} from './http-exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { message, statusCode } = handleException(exception);

    response.status(statusCode).json({
      path: request.url,
      error: exception?.response?.error || message,
      message: message.toString().toLowerCase(),
      timestamp: new Date().getTime(),
      status: statusCode,
    });
  }
}

function handleException(exception: any): {
  message: string;
  statusCode: number;
} {
  if (
    exception instanceof Prisma.PrismaClientKnownRequestError &&
    exception.code === 'P2002' &&
    exception.meta?.modelName === 'Costumer'
  ) {
    exception = new CostumerAlreadyRegisteredException();
  } else if (
    exception instanceof Prisma.PrismaClientKnownRequestError &&
    exception.code === 'P2025'
  ) {
    switch (exception.meta?.modelName) {
      case 'Costumer':
        exception = new CostumerNotFoundHttpException();
        break;
      case 'Product':
        exception = new ProductNotFoundHttpException();
        break;
      case 'Order':
        if (exception.meta?.cause === 'Record to update not found.') {
          exception = new OrderNotFoundHttpException();
        } else if (
          exception.meta?.cause ===
          "No 'Costumer' record(s) (needed to inline the relation on 'Order' record(s)) was found for a nested connect on one-to-many relation 'CostumerToOrder'."
        ) {
          exception = new CostumerNotFoundHttpException();
        } else if (
          exception.meta?.cause ===
          "No 'Product' record(s) (needed to inline the relation on 'OrderProduct' record(s)) was found for a nested connect on one-to-many relation 'OrderProductToProduct'."
        ) {
          exception = new ProductNotFoundHttpException();
        }
        break;
      default:
        console.error('Unexpected exception: ', exception);
        exception = new InternalServerErrorException();
        break;
    }
  } else {
    console.error('Unexpected exception: ', exception);
    exception = new InternalServerErrorException();
  }

  const message =
    exception?.response?.message ||
    exception?.message ||
    'Internal server error';
  const statusCode =
    exception instanceof HttpException
      ? exception.getStatus()
      : exception?.status || 500;

  return { message, statusCode };
}
