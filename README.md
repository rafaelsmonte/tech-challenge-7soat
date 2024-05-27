## Tech Challenge 7Soat - FIAP

This project implements a set of APIs to support the business rules for an automated food ordering system in a diner.

The project architecture utilizes the NestJS framework with a hexagonal architecture.

This documentation is organized as follows:

- **Project Structure:** Presents part of the source code tree and provides a brief explanation of its context.
- **Event Storming:** Includes a link to the event storming documentation.
- **Development:** Provides guidelines for developers to set up the development environment and run the project locally.
- **API Specification:** Details the API's contract specification.


### Documentation

- [Project Structure](#project-structure)
- [Event Storming (Miro)](https://miro.com/app/board/uXjVKUxNpFs=/?share_link_id=512382361305)
- [Project Architecture](docs/architecture.md)
- [API Specification](docs/endpoints.md)
- [Development](docs/development.md)


### Project Structure

```
.
├── docker                                // Docker configuration files
│   ├── dev-local                         // Environment variables for development
│   ├── docker-compose-dev.yml            // Docker compose for development environment
│   ├── docker-entrypoint.sh              // Entrypoint script for the application docker image
│   ├── Dockerfile                        // Dockerfile for application docker image
│   └── docker-run-dev.sh                 // Runs the application on dev environment (called at the docker-compose-dev.yml)
├── docs                                  // Folder for the project's documentation
├── nest-cli.json                         // used by the Nest CLI (Command Line Interface) tool to manage settings and configurations for a Nest.js project
├── package.json                          // Declaratives for managing dependencies, defining project metadata, scripting tasks, and configuring the project
├── prisma                                // Folder that contains prisma ORM configuration, migrations, seeds, etc.
├── scripts                               // Contains scripts to facilitate development environemnt setup
├── src                                   
│   ├── app.config.ts                     // Configuration settings for your Nest.js application
│   ├── app.controller.ts                 // Contains the main controller for the application
│   ├── app.logger.middleware.ts          // Contains a custom middleware responsible for logging requests or responses
│   ├── app.logger.ts                     // Contains a logger service used throughout your application to log messages, errors, or other information
│   ├── app.module.ts                     // Root module of the application
│   ├── app.service.ts                    // Root service of the application
│   ├── category                          // Category entity module (see: docs/architecture.md)
│   ├── common                            // Common module (see: docs/architecture.md)
│   ├── customer                          // Customer module (see: docs/architecture.md)
│   ├── infra                             // Infra module (see: docs/architecture.md)
│   ├── main.ts                           // Application bootstrap
│   ├── order                             // Order module (see: docs/architecture.md)
│   └── product                           // Product module (see: docs/architecture.md)
├── test                                  // Folder for testing routines
├── tsconfig.build.json                   // Typescript application build config
├── tsconfig.json                         // Typescript transpiler configurations
└── yarn.lock                             // lock dependencies version
```

### Authors

 - *Rafael Santos Monte (RM355045)*
 - *Thiago Thalison Firmino de Lima (RM354998)*
 - *Vitor Manoel da Silveira (RM355029)*

## License

Nest is [MIT licensed](LICENSE).
