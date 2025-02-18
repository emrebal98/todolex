<h1 align="center">Todolex</h1> <br>
<p align="center">  
  <img alt="Todolex" title="Todolex" src=".github/assets/logo.png" width="400" >
</p>

<p align="center">
  A simple Todo app built with microservices and microfrontend architecture
</p>

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
  - [Backend](#backend)
  - [Frontend](#frontend-planned)
  - [Development Tools](#development-tools)
- [How to Use](#how-to-use)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Migration](#database-migration)
  - [Running with Docker](#running-with-docker)
  - [Running without Docker](#running-without-docker)
- [License](#license)

## Features

- **Monorepo Structure**: The project is organized as a monorepo, making it easy to manage multiple services and frontends in a single repository.
- **Microservices Architecture**: Scalable and independent backend services.
- **Microfrontend Architecture**: Modular and reusable frontend components.
- **API Documentation**: Integrated unified API documentation for backend services.
- **Authentication Middleware**: Secure API endpoints with authentication.
- **Centralized Database Migrations**: Uses **Liquibase** to manage and version database schemas across microservices.
- **Simple Todo Management**: Add, edit, delete, and mark tasks as complete.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

## Technologies

### Backend

- **Auth Service**: Built with **NestJS** (TypeScript) for authentication and user management.
- **Todo Service**: Built with **Spring Boot** (Java) for todo task management.
- **API Documentation**: Uses **Scalar** to combine and display OpenAPI documentation for all services in a single, beautiful UI.
- **PostgreSQL**: Relational database for storing application data.
- **Liquibase**: Manages and versions database schemas across microservices, ensuring consistent and centralized database migrations.
- **Docker**: Containerization for consistent development and deployment.
- **Traefik**: Reverse proxy and load balancer for routing and middleware.

### Frontend (Planned)

- **Next.js**: A React-based framework with TypeScript for server-side rendering and static site generation.
- **Nuxt.js**: A Vue-based framework with TypeScript for building modern web applications.
- **Module Federation**: Enables microfrontend architecture for seamless integration of multiple frontend frameworks.

### Development Tools

- **Moonrepo**: A powerful tool for managing monorepos, enabling efficient task orchestration management.
- **Docker Compose**: Orchestration for multi-container Docker applications.
- **PgAdmin**: Web-based PostgreSQL management tool.
- **Health Checks**: Ensures services are running and healthy.

## How to Use

To run this project locally, follow these steps:

### Prerequisites

- [Docker](https://www.docker.com/) installed.
- [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io/installation) installed.
- [Liquibase](https://www.liquibase.org/download) installed (for database migrations).
- [Moonrepo](https://moonrepo.dev/docs/install) installed (optional but recommended, for monorepo management).

### Installation

- **Clone the repository:**
  ```bash
  git clone git@github.com:emrebal98/todolex.git #https://github.com/emrebal98/todolex.git
  cd todolex
  ```

### Database Migration

1. **Set up environment variables:**

   - Create a `.env` files in the `packages/migration` directory for each service.
   - Example `.env` files are in the
     - [packages/migration/auth/.env.example](packages/migration/auth/.env.example)
     - [packages/migration/todo/.env.example](packages/migration/todo/.env.example)

2. **Run migrations while database is up:**

   - with moonrepo installed (recommended)

     ```bash
     moon run :migrate
     ```

   - without moonrepo

     - run it for each service, define the environment variables (example .env files are in the [packages/migration](packages/migration) folder for each service)

     ```bash
       url=jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}
       username=${DB_USERNAME}
       password=${DB_PASSWORD}

       cd ${DIR} && liquibase --url=$url --username=$username --password=$password update
     ```

     - _**Note**: Simply look for commands in moon.yml files if you don't have moonrepo installed._

### Running with Docker

1. **Build and run the containers:**

   - with moonrepo installed (recommended)

     ```bash
     moon run :compose_dev_up
     ```

   - without moonrepo

     ```bash
     docker compose -f docker-compose.yml -f docker-compose-dev.yml up --build -d
     ```

2. **Access the application:**
   - Auth service: `localhost/auth`
   - Todo service: `localhost/todo`
   - API doc: `localhost/api-doc`

### Running without Docker

1. **Install dependencies for all services:**

   - with moonrepo installed (recommended)

     ```bash
     moon run :install
     ```

   - without moonrepo

     ```bash
     cd apps/api-doc && pnpm install
     cd apps/auth && pnpm install
     cd packages/commit && pnpm install
     ```

2. **Set up environment variables:**

   - Add necessary environment variables (e.g., database connection strings,).
   - Create a `.env` files in the respective directories.
   - Example .env files are in the
     - [apps/auth/.env.example](apps/auth/.env.example)
     - [apps/api-doc/.env.example](apps/api-doc/.env.example)
     - [apps/todo/.env.example](apps/todo/.env.example)

3. **Run a Service**:

   - with moonrepo installed (recommended)

     ```bash
     moon run :dev # for all services

     # moon run auth:dev # for auth service
     # moon run todo:dev # for todo service
     # moon run api-doc:dev # for api-doc service

     # moon run [project]:[command]
     ```

   - without moonrepo

     ```bash
     cd apps/auth && pnpm run dev # for auth service
     cd apps/api-doc && pnpm run dev # for api-doc service
     cd apps/todo && ./gradlew bootRun # for todo service
     ```

4. **Access the application:**
   - Auth service: `localhost:3000`
   - Todo service: `localhost:3001`
   - API doc: `localhost:5000`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
