## Architecture

This project uses the [NestJS](https://nestjs.com/) framework as its base, incorporating [hexagonal architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)) concepts.

The philosophy is to divide the project into modules that represent either aggregates or entities within the system, along with their respective domain services. Each module contains its core business rules, separated from its ports and adapters.

### Core Concepts

**General structure of a module**

```
adapters
    driven
    driving
    model
domain
    inboundPorts
    model
    outboundPorts
```

**adapters**

Adapters are responsible for interfacing with the outside world. They convert external data into a format that the core business logic understands and vice versa.

 - **driven:** Driven adapters handle interactions initiated by external systems or services. They adapt incoming data and requests into a format that the application's core can process. Examples include database adapters, external API clients, and message brokers. It is the implementation of the interface defined at the **outboundPorts** of the **domain**.

 - **driving:** Driving adapters initiate actions within the core business logic in response to external stimuli. These include REST controllers, GraphQL resolvers, and user interfaces. They take input from users or other systems and invoke the corresponding application logic. The instances here will communicate with the domain through the services defined in **inboundPorts** of the **domain**.
 
 - **model:** The model within the adapters contains data transfer objects (DTOs) or view models used to transport data between the application and external systems. These models ensure that the data structures are compatible with the external interfaces. 

**domain**

The domain layer contains the core business logic and rules of the module. It is independent of any external systems and focuses solely on the problem domain.
 
 - **inboundPorts:** Inbound ports define the operations that the application offers to the outside world. They represent use cases or services that can be called by driving adapters. These ports abstract the core business logic, making it accessible while keeping the internal implementation details hidden.
 - **model:** The model in the domain layer consists of entities and value objects that encapsulate the core business data and rules. These models represent the key concepts and behaviors within the domain.
 - **outboundPorts:** Outbound ports define the interfaces for secondary services or infrastructure that the application needs to interact with. These ports are implemented by driven adapters and allow the core business logic to remain decoupled from external systems. Examples include repositories for database access, messaging services, and external APIs.



### Modules

**category**
This module handles business rules related to the categories of items available for the diner services, such as MEAL, DRINK, SIDE, and DESSERT. It encapsulates the logic for managing and organizing different food categories, ensuring that each category's specific rules and behaviors are maintained.

**common**
This module provides shared utilities and helpers used throughout the application. It does not expose business logic but includes functionality like the HTTP exception handler, which converts domain exceptions into HTTP error messages with the appropriate HTTP status code. This promotes code reuse and consistency across the application.

**customer**
This module focuses on business rules related to the customer entity. It manages the logic associated with customer data, interactions, and behaviors, ensuring that customer-related operations adhere to the defined business rules.

**infra**
This module is dedicated to infrastructure configuration and does not expose business logic. It includes components like Prisma ORM for database access, managing the technical setup required for the application's underlying infrastructure. By separating infrastructure concerns, the application maintains a clear distinction between business logic and technical implementation.

**order**
This module handles business rules related to the order aggregate. It encapsulates the logic for creating, updating, and managing orders, ensuring that all order-related operations follow the defined business processes. Aggregates in hexagonal architecture often represent complex business entities with multiple related components, such as an order and its line items.

**product**
This module focuses on business rules related to the product entity. It manages the logic associated with product data, ensuring that product-related operations are consistent with the business requirements. This module keeps the product-related business logic isolated from other parts of the application, promoting modularity.