import { Customer } from 'src/entities/customer.entity';

export const CustomerAdapter = {
  adaptArrayJson: (customers: Customer[]): string => {
    const mappedCustomers = customers.map((customer) => {
      return {
        id: customer.getId(),
        createdAt: customer.getCreatedAt(),
        updatedAt: customer.getUpdatedAt(),
        name: customer.getName(),
        taxpayerRegistry: customer.getTaxpayerRegistry(),
        email: customer.getEmail(),
      };
    });

    return JSON.stringify(mappedCustomers);
  },

  adaptJson: (customer: Customer | null): string => {
    if (customer === null) {
      return JSON.stringify({});
    }

    const mappedCustomer = {
      id: customer.getId(),
      createdAt: customer.getCreatedAt(),
      updatedAt: customer.getUpdatedAt(),
      name: customer.getName(),
      taxpayerRegistry: customer.getTaxpayerRegistry(),
      email: customer.getEmail(),
    };

    return JSON.stringify(mappedCustomer);
  },
};
