# Documentação da API de Produtos
## Criar um novo produto
- **Método:** POST
- **URL:** `/produtos`
- **Descrição:** Cria um novo produto com os dados fornecidos.
- **Corpo da Requisição:**
  ```json
  {
    "name": "Produto",
    "price": 10.99,
    "description": "Descrição do produto",
    "pictures": "http://linkdapimagem.com/imagem.png",
    "Categories": 1,
  }
  ```
- **Respostas:**
  - **201:** Produto criado com sucesso
  - **400:** Requisição inválida
## Obter um produto por ID
- **Método:** GET
- **URL:** `/produtos/{id}`
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
      "pictures": "http://linkdapimagem.com/imagem.png",
      "Categories": {"id": 1, "name": "Categoria"},
    }
    ```
  - **404:** Produto não encontrado
## Obter todos produtos
- **Método:** GET
- **URL:** `/produtos`
- **Descrição:** Obtém todos produtos com base nos parametros.
- **Query:**
  - `name` (string): ID do produto a ser obtido.
  - `order-by`: name, createAt, price, categories.
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
      "pictures": "http://linkdapimagem.com/imagem.png",
      "Categories": {"id": 1, "name": "Categoria"},
    }]
    ```
  - **404:** Produto não encontrado
## Atualizar um produto por ID

- **Método:** PUT
- **URL:** `/produtos/{id}`
- **Descrição:** Atualiza um produto com base no ID fornecido.
- **Parâmetros:** `id` (integer): ID do produto a ser atualizado.
- **Corpo da Requisição:**
  ```json
  {
    "name": "Produto Atualizado",
    "price": 15.99,
    "description": "Descrição atualizada do produto",
    "pictures": "http://linkdapimagem.com/imagem_atualizada.png",
    "Categories": 1,
  }
  ```
- **Respostas:**
  - **200:** Produto atualizado com sucesso
  - **400:** Requisição inválida
  - **404:** Produto não encontrado
## Remover um produto por ID

- **Método:** DELETE
- **URL:** `/produtos/{id}`
- **Descrição:** Remove um produto com base no ID fornecido.
- **Parâmetros:** `id` (integer): ID do produto a ser removido.
- **Respostas:**
  - **204:** Produto removido com sucesso
  - **404:** Produto não encontrado
## Criar um novo cliente

- **Método:** POST
- **URL:** `/customers`
- **Descrição:** Cria um novo cliente com os dados fornecidos.
- **Corpo da Requisição:**
  ```json
  {
    "name": "Nome da customer",
    "taxpayerRegistry": "123456789",
    "email": "email@example.com",

  }
  ```
- **Respostas:**
  - **201:** customer criado com sucesso
  - **400:** Requisição inválida
## Obter um cliente por ID

- **Método:** GET
- **URL:** `/customers/{id}`
- **Descrição:** Obtém uma customer com base no ID fornecido.
- **Parâmetros:** `id` (integer): ID da customer a ser obtida.
- **Respostas:**
  - **200:** customer obtida com sucesso
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
  - **404:** customer não encontrada
## Obter todos clientes

- **Método:** GET
- **URL:** `/customers`
- **Descrição:** Obtém todos os clientes com base nos parametros.
- **Query:**
  - `name` (string): nome do cliente a ser obtido.
  - `taxpayerRegistry` (string): documento do cliente.
  - `email` (string): email do cliente.
  - `order-by`: name, taxpayerRegistry e email.
  - 
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
    "id": 1,
    "name": "Nome do cliente Atualizado",
    "taxpayerRegistry": "987654321",
    "email": "novoemail@example.com",
  }
  ```
- **Respostas:**
  - **200:** customer atualizada com sucesso
  - **400:** Requisição inválida
  - **404:** customer não encontrada
## Remover um Cliente por ID

- **Método:** DELETE
- **URL:** `/customers/{id}`
- **Descrição:** Remove um cliente com base no ID fornecido.
- **Parâmetros:** `id` (integer): ID do cliente a ser removida.
- **Respostas:**
  - **204:** Cliente removido com sucesso
  - **404:** Cliente não encontrada
### Criar uma nova categoria

- **Método:** GET
- **URL:** `/categorias`
- **Descrição:** Cria uma nova categoria com os dados fornecidos.
- **Corpo da Requisição:**
  ```json
  {
    "id": 1,
    "createdAt": "2024-05-11T12:00:00Z",
    "updatedAt": "2024-05-11T12:00:00Z",
    "type": "Tipo da Categoria"
  }
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
      "id": 1,
      "type":"DRINK"

    },{
      "id": 1,
      "type":"DESSERT"

    }]
    ```
  - **404:** customer não encontrada





# TODO: 
- /api/v1/order
    - Create order
    - Get order
    - Get orders
    - Change order (patch)
