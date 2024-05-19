import { ConflictException, NotFoundException } from '@nestjs/common';
import { ExceptionMessages } from 'src/common/enum/exception-message.enum';

export class CostumerNotFoundHttpException extends NotFoundException {
  constructor() {
    super(ExceptionMessages.COSTUMER_NOT_FOUND_EXCEPTION);
  }
}

export class CostumerAlreadyRegisteredException extends ConflictException {
  constructor() {
    super(ExceptionMessages.COSTUMER_ALREADY_REGISTERED_EXCEPTION);
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
