# Documentação da API de Produtos
## Criar um novo produto
- **Método:** POST
- **URL:** `/products`
- **Descrição:** Cria um novo produto com os dados fornecidos.
- **Corpo da Requisição:**
  ```json
  {
    "name": "Produto",
    "price": 10.99,
    "description": "Descrição do produto",
    "pictures": "http://linkdapimagem.com/imagem.png",
    "category": 1,
  }
  ```
- **Respostas:**
  - **201:** Produto criado com sucesso
  - **400:** Requisição inválida
## Obter um produto por ID
- **Método:** GET
- **URL:** `/products/{id}`
- **Descrição:** Obtém um produto com base no ID fornecido.
- **Parâmetros:** `id` (integer): ID do produto a ser obtido.
- **Respostas:**
  - **200:** Produto obtido com sucesso
    ```json
    {
      "createdAt": "2024-05-11T12:00:00Z",
      "updatedAt": "2024-05-11T12:00:00Z",
      "name": "Produto",
      "price": 10.99,
      "description": "Descrição do produto",
      "pictures": ["http://linkdapimagem.com/imagem.png"],
      "category": {"id": 1, "name": "Categoria"},
    }
    ```
  - **404:** Produto não encontrado
## Obter todos produtos
- **Método:** GET
- **URL:** `/products`
- **Descrição:** Obtém todos produtos com base nos parametros.
- **Query:**
  - `name` (string): ID do produto a ser obtido.
  - `order-by`: name, createAt, price, category.
  - `sort`: asc or desc.
  - `category` (integer): ID da categoria a ser obtido.
- **Respostas:**
  - **200:** Produto obtido com sucesso
    ```json
    [{
      "id": 1,
      "createdAt": "2024-05-11T12:00:00Z",
      "updatedAt": "2024-05-11T12:00:00Z",
      "name": "Produto",
      "price": 10.99,
      "description": "Descrição do produto",
      "pictures": ["http://linkdapimagem.com/imagem.png"],
      "category": {"id": 1, "name": "Categoria"},
    }]
    ```
  - **404:** Produto não encontrado
## Atualizar um produto por ID
- **Método:** PUT
- **URL:** `/products/{id}`
- **Descrição:** Atualiza um produto com base no ID fornecido.
- **Parâmetros:** `id` (integer): ID do produto a ser atualizado.
- **Corpo da Requisição:**
  ```json
  {
    "name": "Produto Atualizado",
    "price": 15.99,
    "description": "Descrição atualizada do produto",
    "pictures": ["http://linkdapimagem.com/imagem.png"],
    "category": 1,
  }
  ```
- **Respostas:**
  - **200:** Produto atualizado com sucesso
  - **400:** Requisição inválida
  - **404:** Produto não encontrado
## Remover um produto por ID

- **Método:** DELETE
- **URL:** `/products/{id}`
- **Descrição:** Remove um produto com base no ID fornecido.
- **Parâmetros:** `id` (integer): ID do produto a ser removido.
- **Respostas:**
  - **204:** Produto removido com sucesso
  - **404:** Produto não encontrado
# Documentação da API de Cliente
## Criar um novo cliente
- **Método:** POST
- **URL:** `/customers`
- **Descrição:** Cria um novo cliente com os dados fornecidos.
- **Corpo da Requisição:**
  ```json
  {
    "name": "Nome do Cliente",
    "taxpayerRegistry": "123456789",
    "email": "email@example.com",
  }
  ```
- **Respostas:**
  - **201:** customer criado com sucesso
  - **400:** Requisição inválida
  - **409:** CPF ja registrado
## Obter um cliente por ID
- **Método:** GET
- **URL:** `/customers/{id}`
- **Descrição:** Obtém um cliente com base no ID fornecido.
- **Parâmetros:** `id` (integer): ID do cliente a ser obtida.
- **Respostas:**
  - **200:** cliente obtido com sucesso
    ```json
    {
      "id": 1,
      "createdAt": "2024-05-11T12:00:00Z",
      "updatedAt": "2024-05-11T12:00:00Z",
      "name": "Nome da customer",
      "taxpayerRegistry": "123456789",
      "email": "email@example.com",
    }
    ```
  - **404:** cliente não encontrado
## Obter todos clientes
- **Método:** GET
- **URL:** `/customers`
- **Descrição:** Obtém todos os clientes com base nos parametros.
- **Query:**
  - `name` (string): nome do cliente a ser obtido.
  - `taxpayerRegistry` (string): documento do cliente.
  - `email` (string): email do cliente.
  - `order-by`: name, taxpayerRegistry e email.
  - `sort`: asc or desc.
- **Respostas:**
  - **200:** Cliente obtida com sucesso
    ```json
    {
      "id": 1,
      "createdAt": "2024-05-11T12:00:00Z",
      "updatedAt": "2024-05-11T12:00:00Z",
      "name": "Nome do Cliente",
      "taxpayerRegistry": "123456789",
      "email": "email@example.com",
    }
    ```
  - **404:** Cliente não encontrado
## Atualizar uma Cliente por ID
- **Método:** PUT
- **URL:** `/customers/{id}`
- **Descrição:** Atualiza um cliente com base no ID fornecido.
- **Parâmetros:** `id` (integer): ID do cliente a ser atualizado.
- **Corpo da Requisição:**
  ```json
  {
    "name": "Nome do cliente Atualizado",
    "taxpayerRegistry": "987654321",
    "email": "novoemail@example.com",
  }
  ```
- **Respostas:**
  - **200:** Cliente atualizado com sucesso
  - **400:** Requisição inválida
  - **404:** Cliente não encontrada
  - **409:** CPF já cadastrado
## Remover um Cliente por ID
- **Método:** DELETE
- **URL:** `/customers/{id}`
- **Descrição:** Remove um cliente com base no ID fornecido.
- **Parâmetros:** `id` (integer): ID do cliente a ser removida.
- **Respostas:**
  - **204:** Cliente removido com sucesso
  - **404:** Cliente não encontrada
# Documentação da API de Categoria
## Obter todas categorias
- **Método:** GET
- **URL:** `/category`
- **Descrição:** Obtém todas as categorias.
- **Respostas:**
  - **200:** categorias obtidas com sucesso
    ```json
    [{
      "id": 1,
      "type":"MEAL"

    },{
      "id": 2,
      "type":"SIDE"

    },{
      "id": 3,
      "type":"DRINK"

    },{
      "id": 4,
      "type":"DESSERT"

    }]
    ```
  - **404:** customer não encontrada
# Documentação da API de Pedido
## Criar um pedido
- **Método:** POST
- **URL:** `/order`
- **Descrição:** Cria um novo pedido com os dados fornecidos.
- **Corpo da Requisição:**
  ```json
  {
    "costumerId": 1,
    "notes": "sem cebola",
    "OrderProducts":[
    {
      "productId": 1,
      "quantity":2,
      "unitPrice":10.50,
    },
    {
      "productId": 25,
      "quantity":1,
      "unitPrice":3.50,
    }]
  }
  ```
- **Respostas:**
  - **201:** pedido criado com sucesso
  - **400:** Requisição inválida
## Obter um Pedido por ID
- **Método:** GET
- **URL:** `/order/{id}`
- **Descrição:** Obtém um pedido com base no ID fornecido.
- **Parâmetros:** `id` (integer): ID do pedido a ser obtida.
- **Respostas:**
  - **200:** pedido obtido com sucesso
  ```json
  {
    "id":1,
    "createdAt": "2024-05-11T12:00:00Z",
    "updatedAt": "2024-05-11T12:00:00Z",
    "customer":{
        "id": 1,
        "createdAt": "2024-05-11T12:00:00Z",
        "updatedAt": "2024-05-11T12:00:00Z",
        "name": "Nome do Cliente",
        "taxpayerRegistry": "123456789",
        "email": "email@example.com",
    },
    "notes": "sem cebola",
    "trackingId": 111,
    "status":"DONE",
    "OrderProducts":[
    {
      "product": {
        "name": "Batata",
        "price": 15.99,
        "description": "Batata 200gr",
        "pictures": ["http://linkdapimagem.com/imagem.png"],
        "category": {
          "id": 1,
          "type":"SIDE"
        },
      },
      "quantity":2,
      "unitPrice":10.50,
    },
    {
      "product": {
        "name": "Milk Shake",
        "price": 15.99,
        "description": "Milk shake de chocolate",
        "pictures": ["http://linkdapimagem.com/imagem.png"],
        "category": {
          "id": 1,
          "type":"SIDE"
        },
      },
      "quantity":1,
      "unitPrice":13.50,
    }]
  }
    ```

  - **404:** Pedido não encontrado
## Obter todos Pedidos
- **Método:** GET
- **URL:** `/order`
- **Descrição:** Obtém todos os pedidos com base nos parametros.
- **Query:**
  - `customerID` (int): id do cliente a ser obtido.
  - `status` (string): Status do pedido.
  - `createdAt` (date): data do pedido.
  - `order-by`: createdAt, status e customer.
  - `sort`: asc or desc.
- **Respostas:**
  - **200:** Pedidos obtidos com sucesso
  ```json
  [{
    "id":1,
    "createdAt": "2024-05-11T12:00:00Z",
    "updatedAt": "2024-05-11T12:00:00Z",
    "customer":{
        "id": 1,
        "createdAt": "2024-05-11T12:00:00Z",
        "updatedAt": "2024-05-11T12:00:00Z",
        "name": "Nome do Cliente",
        "taxpayerRegistry": "123456789",
        "email": "email@example.com",
    },
    "notes": "sem cebola",
    "trackingId": 111,
    "status":"DONE",
    "OrderProducts":[
    {
      "product": {
        "name": "Batata",
        "price": 15.99,
        "description": "Batata 200gr",
        "pictures": ["http://linkdapimagem.com/imagem.png"],
        "category": {
          "id": 1,
          "type":"SIDE"
        },
      },
      "quantity":2,
      "unitPrice":10.50,
    },
    {
      "product": {
        "name": "Milk Shake",
        "price": 15.99,
        "description": "Milk shake de chocolate",
        "pictures": ["http://linkdapimagem.com/imagem.png"],
        "category": {
          "id": 1,
          "type":"SIDE"
        },
      },
      "quantity":1,
      "unitPrice":13.50,
    }]
  }]
    ```

  - **404:** Pedido não encontrado
## Alterar o status de um pedido
- **Método:** POST
- **URL:** `/order/{id}/change-status/`
- **Descrição:** Altera o status de um pedido com os dados fornecidos.
- **Corpo da Requisição:**
  ```json
  {
    "status":"DONE",
  }
  ```
- **Respostas:**
  - **200:** status alterado com sucesso
  - **400:** Requisição inválida
