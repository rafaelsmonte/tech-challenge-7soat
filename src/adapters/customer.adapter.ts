import { Customer } from '@entities/customer.entity';

export const CustomerAdapter = {
  adaptArrayJson: (customers: Customer[] | null): string => {
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
};
