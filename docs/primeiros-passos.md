# Cadastros basicos

### Para fazer um fluxo completo na aplicação, primeiramente é necessário cadastrar um cliente usando as informações:

- **Method:** POST
- **URL:** `/customer`
- **Request Body:**
  ```json
  {
    "name": "Customer Name",
    "taxpayerRegistry": "123456789",
    "email": "email@example.com"
  }
  ```

### Você pode listar todos os cliente ou um cliente por ID
### Listar TODOS
- **Method:** GET
- **URL:** `/customer`
- **Response:** 
    ```json
    [{
      "id": 1,
      "createdAt": "2024-05-11T12:00:00Z",
      "updatedAt": "2024-05-11T12:00:00Z",
      "name": "Customer Name",
      "taxpayerRegistry": "123456789",
      "email": "email@example.com"
    }]
    ```
### Listar por ID
- **Method:** GET
- **URL:** `/customer/{id}`
- **Parameters:** `id` (integer): ID of the customer to be obtained.
- **Responses:**
    ```json
    {
      "id": 1,
      "createdAt": "2024-05-11T12:00:00Z",
      "updatedAt": "2024-05-11T12:00:00Z",
      "name": "Customer Name",
      "taxpayerRegistry": "123456789",
      "email": "email@example.com"
    }
    ```

### Depois disso, você deve criar um ou mais produtos para seu pedido

- **Method**: POST
- **URL**: /product
- **Request Body**:
  ```json
  {
    "name": "Product",
    "price": 10.99,
    "description": "Product description",
    "pictures": ["http://image-link.com/image.png"],
    "categoryId": 1
  }
  ```
### Você pode listar todos os produtos ou um produto por ID
### Listar TODOS
- **Method:** GET
- **URL:** `/product`
- **Response:** 
    ```json
    [{
        "id": 35,
        "createdAt": "2024-07-30T22:39:04.564Z",
        "updatedAt": "2024-07-30T22:39:04.564Z",
        "name": "MilkShake",
        "price": 10,
        "description": "abc123123",
        "pictures": [],
        "category": {
            "id": 1,
            "createdAt": "2024-07-28T22:26:14.328Z",
            "updatedAt": "2024-07-30T22:13:03.083Z",
            "type": "MEAL"
        }
    }]
    ```
### Listar por ID
  - **Method**: GET
  - **URL**: /product/{id}
- **Response:** 
    ```json
    {
        "id": 35,
        "createdAt": "2024-07-30T22:39:04.564Z",
        "updatedAt": "2024-07-30T22:39:04.564Z",
        "name": "MilkShake",
        "price": 10,
        "description": "abc123123",
        "pictures": [],
        "category": {
            "id": 1,
            "createdAt": "2024-07-28T22:26:14.328Z",
            "updatedAt": "2024-07-30T22:13:03.083Z",
            "type": "MEAL"
        }
    }
    ```
# Fazer o primeiro pedido
### Após criar o cliente e os produtos, você já pode criar um pedido.

- **Method:** POST
- **URL:** `/order`
- **Request Body:**
  ```json
  {
    "customerId": 1,
    "notes": "cliente está com fome",
    "productsWithQuantity": [
        {
            "productId": 35, 
            "quantity": 1
        },
        {
            "productId": 36, 
            "quantity": 2
        }
    ]
  }
  ```

### Depois disso o pedido estará criado, a resposta dessa chamada irá conter todos os dados do pedido, a chave pix copia e cola e o QRCode para pagamento

```json
{
    "id": 42,
    "createdAt": "2024-07-30T22:43:54.497Z",
    "updatedAt": "2024-07-30T22:43:54.497Z",
    "notes": "cliente está com fome",
    "trackingId": 0,
    "totalPrice": 41,
    "status": "PAYMENT_PENDING",
    "customer": null,
    "payment": {
        "id": 83762768525,
        "pixQrCode": "00020126580014br.gov.bcb.pix0136d7505ace-1bc2-4fb5-a48b-8e06c5b1ba07520400005303986540541.005802BR5907TINGA696009Rancharia62240520mpqrinter837627685256304C4B2",
        "pixQrCodeBase64": "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"
    },
    "products": [
        {
            "id": 35,
            "createdAt": "2024-07-30T22:39:04.564Z",
            "updatedAt": "2024-07-30T22:39:04.564Z",
            "name": "MilkShake",
            "price": 10,
            "description": "abc123123",
            "pictures": [],
            "categoryId": 1,
            "quantity": 1
        },
        {
            "id": 36,
            "createdAt": "2024-07-30T22:43:28.595Z",
            "updatedAt": "2024-07-30T22:43:28.595Z",
            "name": "BigMaC",
            "price": 15.5,
            "description": "BigMaC",
            "pictures": [],
            "categoryId": 2,
            "quantity": 2
        }
    ]
}
```

# Pagamento via Mercado Pago

### Com o pedido realizado, você ja pode efetuar o pagamento via PIX copiando e colando o `pixQrCode`. Após o tempo de timeout do pix for atingido, o mercado pago notifica a aplicação pelo webhook e o mesmo para para o estado `PAYMENT_FAILED` ou se for pago o status será `AWAITING`.
### Para buscar um pedido voce pode busca-lo por ID:

- **Method:** GET
- **URL:** `/order/{id}`
- **Response:** 
  ```json
  {
    "id": 42,
    "createdAt": "2024-07-30T22:43:54.497Z",
    "updatedAt": "2024-07-30T22:43:54.497Z",
    "notes": "cliente está com fome",
    "trackingId": 0,
    "totalPrice": 41,
    "status": "PAYMENT_PENDING",
    "customer": null,
    "products": [
        {
            "id": 35,
            "createdAt": "2024-07-30T22:39:04.564Z",
            "updatedAt": "2024-07-30T22:39:04.564Z",
            "name": "MilkShake",
            "price": 10,
            "description": "abc123123",
            "pictures": [],
            "categoryId": 1,
            "quantity": 1
        },
        {
            "id": 36,
            "createdAt": "2024-07-30T22:43:28.595Z",
            "updatedAt": "2024-07-30T22:43:28.595Z",
            "name": "BigMaC",
            "price": 15.5,
            "description": "BigMaC",
            "pictures": [],
            "categoryId": 2,
            "quantity": 2
        }
    ]
  }


# Simulação de pagamento com Mercado Pago

##  CUIDADO - API DO MERCADO PAGO ESTÁ EM MODO PRODUÇÃO E AS COBRANÇAS SERÃO REAIS 

### Para fins de simulação de pagamento, usamos um site para simular a comunicação com o webhook `https://webhook.site/#!/view/52bd7427-5fcc-45d9-b96f-f41be65fb1c5/a58bea3b-4175-4ec4-9fa7-98b25b5ce4b5/1`. Para simular o recebimento de pagamento no nosso webhook pode ser utilizado a seguinte rota e extraindo os dados do site.
- **Method:** POST
- **URL:** `/order/payment?data.id=<Retirar esse campo do parametro da URL>`
- **Headders:** 
  - `x-signature`: `<Retirar esse campo do site nos headders>`
  - `x-request-id`: `<Retirar esse campo do site nos headders>`
- **Request Body:** 
  ```json
  {
    "action": "payment.updated",
    "api_version": "v1",
    "data": {
        "id": "<<Retirar esse campo do site no body>"
    },
    "date_created": "2024-07-30T23:29:41Z",
    "id": 114984222964,
    "live_mode": true,
    "type": "payment",
    "user_id": "77730822"
  }








