import { Customer } from '../entities/customer.entity';
import { ICustomerGateway } from '../interfaces/customer.gateway.interface';

export class CustomerUseCases {
  static async findByAccountIdOrCreate(
    customerGateway: ICustomerGateway,
    accountId: string,
  ): Promise<Customer> {
    let customer = await customerGateway.findByAccountId(accountId);

    if (!customer) {
      customer = await customerGateway.create(Customer.new(accountId));
    }

    return customer;
  }
}
