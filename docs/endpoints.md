
# Base URL
 - The base URL for all the APIs: <http://{ip}:{port}/api/{version}>

# Products API
## Create a new product
- **Method**: POST
- **URL**: /products
- **Description**: Creates a new product.
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
- **Responses:**
  - **201**: Product created successfully
  - **400**: Invalid request
  - **500**: Internal error

## Get a product by ID
  - **Method**: GET
  - **URL**: /products/{id}
  - **Description**: Retrieves a product based on the provided ID.
  - **Parameters**: id (integer): ID of the product to be obtained.
  - **Responses**:
    - **200:** Product retrieved successfully
      ```json
      {
        "createdAt": "2024-05-11T12:00:00Z",
        "updatedAt": "2024-05-11T12:00:00Z",
        "name": "Product",
        "price": 10.99,
        "description": "Product description",
        "pictures": ["http://image-link.com/image.png"],
        "category": {"id": 1, "name": "Category"}
      }
      ```
    - **404:** Product not found
    - **500:** Internal error

## Get all products
- **Method:** GET
- **URL:** `/products`
- **Description:** Retrieves all products based on the parameters.
- **Query:**
  - `name` (string): Name of the product to be obtained.
  - `sort`: asc or desc. (default: asc)
  - `categoryId` (integer): ID of the category to be obtained.
- **Responses:**
  - **200:** Products retrieved successfully
    ```json
    [{
      "id": 1,
      "createdAt": "2024-05-11T12:00:00Z",
      "updatedAt": "2024-05-11T12:00:00Z",
      "name": "Product",
      "price": 10.99,
      "description": "Product description",
      "pictures": ["http://image-link.com/image.png"],
      "category": {"id": 1, "name": "Category"}
    }]
    ```
  - **404:** Product not found
  - **500:** Internal error

## Update a product by ID
- **Method:** PUT
- **URL:** `/products/{id}`
- **Description:** Updates a product based on the provided ID.
- **Parameters:** `id` (integer): ID of the product to be updated.
- **Request Body:**
  ```json
    {
      "name": "Updated Product",
      "price": 15.99,
      "description": "Updated product description",
      "pictures": ["http://image-link.com/image.png"],
      "categoryId": 1
    }
  ```
- **Responses:**
  - **200:** Product updated successfully
  - **400:** Invalid request
  - **404:** Product not found
  - **500:** Internal error

## Remove a product by ID

- **Method:** DELETE
- **URL:** `/products/{id}`
- **Description:** Removes a product based on the provided ID.
- **Parameters:** `id` (integer): ID of the product to be removed.
- **Responses:**
  - **204:** Product removed successfully
  - **404:** Product not found

# Customer API Documentation

## Create a new customer
- **Method:** POST
- **URL:** `/customers`
- **Description:** Cria um novo cliente com os dados fornecidos.
- **Request Body:**
  ```json
  {
    "name": "Customer Name",
    "taxpayerRegistry": "123456789",
    "email": "email@example.com"
  }
  ```
- **Responses:**
  - **201:** Customer created successfully
  - **400:** Invalid request
  - **409:** Taxpayer ID already registered
  - **500:** Internal error

## Get a customer by ID
- **Method:** GET
- **URL:** `/customers/{id}`
- **Description:** Retrieves a customer based on the provided ID.
- **Parameters:** `id` (integer): ID of the customer to be obtained.
- **Responses:**
  - **200:** Customer retrieved successfully
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
  - **404:** Customer not found
  - **500:** Internal error

## Get all customers
- **Method:** GET
- **URL:** `/customers`
- **Description:** Retrieves all customers based on the parameters.
- **Query:**
  - `name` (string): Name of the customer to be obtained.
  - `taxpayerRegistry` (string): Customer's taxpayer ID.
  - `email` (string): Customer's email.
  - `sort`: asc or desc. (default: asc)
- **Responses:**
  - **200:** Customers retrieved successfully
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
  - **404:** Customer not found
  - **500:** Internal error

## Update a customer by ID
- **Method:** PATCH
- **URL:** `/customers/{id}`
- **Description:** Atualiza um cliente com base no ID fornecido.
- **Parameters:** `id` (integer): ID do cliente a ser atualizado.
- **Request Body:**
  ```json
  {
    "name": "Updated Customer Name",
    "email": "newemail@example.com"
  }
  ```
- **Responses:**
  - **200:** Customer updated successfully
  - **400:** Invalid request
  - **404:** Customer not found
  - **500:** Internal error

## Remove a customer by ID
- **Method:** DELETE
- **URL:** `/customers/{id}`
- **Description:** Removes a customer based on the provided ID.
- **Parameters:** `id` (integer): ID of the customer to be removed.
- **Responses:**
  - **204:** Customer removed successfully
  - **404:** Customer not found

# Category API Documentation
## Get all categories
- **Method:** GET
- **URL:** `/category`
- **Description:** Retrieves all categories.
- **Respostas:**
  - **200:** Categories retrieved successfully
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
  - **404:** CLient not found
  - **500:** Internal error

# Order API Documentation
## Create an Order
- **Method:** POST
- **URL:** `/orders`
- **Description:** Creates a new order with the provided data.
- **Request Body:**
  ```json
  {
    "customerId": 1, //optional
    "notes": "no onions",
    "orderProducts":[
    {
      "productId": 1,
      "quantity":2
    },
    {
      "productId": 25,
      "quantity":1
    }]
  }
  ```
- **Responses:**
  - **201:** Order created successfully
  - **400:** Invalid request
  - **500:** Internal error

## Get an Order by ID
- **Method:** GET
- **URL:** `/orders/{id}`
- **Description:** Retrieves an order based on the provided ID.
- **Parameters:** `id` (integer): ID of the order to be obtained.
- **Responses:**
  - **200:** Order retrieved successfully
  ```json
    {
      "createdAt": "2024-05-11T12:00:00Z",
      "updatedAt": "2024-05-11T12:00:00Z",
      "customer":{
          "id": 1,
          "createdAt": "2024-05-11T12:00:00Z",
          "updatedAt": "2024-05-11T12:00:00Z",
          "name": "Customer Name",
          "taxpayerRegistry": "123456789",
          "email": "email@example.com"
      },
      "notes": "no onions",
      "trackingId": 111,
      "status":"DONE",
      "totalPrice":123,
      "products":[
      {
          "id":1,
          "name": "Potato",
          "price": 15.99,
          "description": "200g Potato",
          "pictures": ["http://image-link.com/image.png"],
          "category": {
            "id": 1,
            "type":"SIDE"
          },
          "quantity":2
      },
      {
          "id":2,
          "name": "Milk Shake",
          "price": 15.99,
          "description": "Chocolate Milk Shake",
          "pictures": ["http://image-link.com/image.png"],
          "category": {
            "id": 1,
            "type":"SIDE"
          },
        "quantity":1
      }]
    }
    ```
  - **404:** Order not found
  - **500:** Internal error

## Get all Orders
- **Method:** GET
- **URL:** `/orders`
- **Description:** Retrieves all orders based on the parameters.
- **Query:**
  - `customerId` (int): customer's ID to be obtained.
  - `status` (string): Order status.
  - `createdAt` (date): order date.
  - `sort`: asc or desc. (default: asc)
- **Responses:**
  - **200:** Orders retrieved successfully
  ```json
    [{
      "id":1,
      "createdAt": "2024-05-11T12:00:00Z",
      "updatedAt": "2024-05-11T12:00:00Z",
      "customer":{
          "id": 1,
          "createdAt": "2024-05-11T12:00:00Z",
          "updatedAt": "2024-05-11T12:00:00Z",
          "name": "Customer Name",
          "taxpayerRegistry": "123456789",
          "email": "email@example.com"
      },
      "notes": "no onions",
      "trackingId": 111,
      "status":"DONE",
      "totalPrice":100.00,
      "orderProducts":[
      {
        "product": {
          "name": "Potato",
          "price": 15.99,
          "description": "200g Potato",
          "pictures": ["http://image-link.com/image.png"],
          "category": {
            "id": 1,
            "type":"SIDE"
          }
        },
        "quantity":2
      },
      {
        "product": {
          "name": "Milk Shake",
          "price": 15.99,
          "description": "Chocolate Milk Shake",
          "pictures": ["http://image-link.com/image.png"],
          "category": {
            "id": 1,
            "type":"SIDE"
          }
        },
        "quantity":1
      }]
    }]
    ```
  - **404:** Order not found
  - **500:** Internal error

## Change the status of an Order
- **Method:** POST
- **URL:** `/orders/{id}/change-status/`
- **Description:** Changes the status of an order with the provided data.
- **Request Body:**
  ```json
  {
    "status":"DONE",
  }
  ```
- **Responses:**
  - **200:** Status changed successfully
  - **400:** Invalid request
  - **500:** Internal error
