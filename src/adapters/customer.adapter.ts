import { Customer } from 'src/entities/customer.entity';
import { CustomerAlreadyRegisteredError } from 'src/errors/customer-already-registered.error';
import { CustomerNotFoundError } from 'src/errors/customer-not-found.error';
import { DatabaseError } from 'src/errors/database.error';
import { InvalidCustomerError } from 'src/errors/invalid-customer.error';

export const CustomerAdapter = {
  adaptArrayJson: (customers: Customer[]): string => {
    if (customers === null) {
      return JSON.stringify({});
    }

    const mappedCustomers = customers.map((customer) => {
      return {
        id: customer.id,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
        name: customer.name,
        taxpayerRegistry: customer.taxpayerRegistry,
        email: customer.email,
      };
    });

    return JSON.stringify(mappedCustomers);
  },

  adaptJson: (customer: Customer | null): string => {
    if (customer === null) {
      return JSON.stringify({});
    }

    const mappedCustomer = {
      id: customer.id,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
      name: customer.name,
      taxpayerRegistry: customer.taxpayerRegistry,
      email: customer.email,
    };

    return JSON.stringify(mappedCustomer);
  },

  adaptError(error: Error): { code: number; message: string } {
    if (error instanceof InvalidCustomerError) {
      return { code: 400, message: error.message };
    } else if (error instanceof CustomerNotFoundError) {
      return { code: 404, message: error.message };
    } else if (error instanceof CustomerAlreadyRegisteredError) {
      return { code: 409, message: error.message };
    } else if (error instanceof DatabaseError) {
      return { code: 500, message: error.message };
    } else {
      return { code: 500, message: 'Internal server error' };
    }
  },
};
