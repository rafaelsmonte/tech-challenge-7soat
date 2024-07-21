import { PrismaClient } from '@prisma/client';
import { Database } from 'src/interfaces/database.interface';

export class PrismaDatabase implements Database {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  get customer() {
    return this.prismaClient.customer;
  }

  get category() {
    return this.prismaClient.category;
  }

  get product() {
    return this.prismaClient.product;
  }

  get order() {
    return this.prismaClient.order;
  }

  get orderProduct() {
    return this.prismaClient.orderProduct;
  }
}
