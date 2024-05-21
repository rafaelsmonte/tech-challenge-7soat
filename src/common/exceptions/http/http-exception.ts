import { ConflictException, NotFoundException } from '@nestjs/common';
import { ExceptionMessages } from 'src/common/enum/exception-message.enum';

export class CustomerNotFoundHttpException extends NotFoundException {
  constructor() {
    super(ExceptionMessages.CUSTOMER_NOT_FOUND_EXCEPTION);
  }
}

export class CustomerAlreadyRegisteredException extends ConflictException {
  constructor() {
    super(ExceptionMessages.CUSTOMER_ALREADY_REGISTERED_EXCEPTION);
  }
}

export class ProductNotFoundHttpException extends NotFoundException {
  constructor() {
    super(ExceptionMessages.PRODUCT_NOT_FOUND_EXCEPTION);
  }
}

export class OrderNotFoundHttpException extends NotFoundException {
  constructor() {
    super(ExceptionMessages.ORDER_NOT_FOUND_EXCEPTION);
  }
}
