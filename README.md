# Nest api service

This project is generate by [Nest.js](https://github.com/nestjs/nest), a framework TypeScript starter repository.

## System Requirements

```
docker
docker-compose
yarn
node > 16
```

## Develop

### Set up husky

To enable Git hooks

```bash
yarn husky install

# If encounter problem: "The '.husky/pre-push' hook was ignored because it's not set as executable."
# run below command
chmod 777 '.husky/pre-push'
```

### Installation

```bash
yarn
```

- If you want to use postgres

```bash
yarn add pg
```

### Set up environment

Copy `.env.example` to setup local `env`

```bash
cp .env.example .env
```

### Run API server locally

To run API locally, you have to make sure the `mysql`, `redis`(if added) is ready.

```bash
docker-compose up mysql
```

We run local server at utc-0 timezone to prevent timezone issue, which also make local server close to aws server.

```bash
# watch mode for development
npm run start:dev
yarn start:dev
```

### Migration

The migration command line only supports `npm`, do not use `yarn`.

####

```bash
# Create a migration
npm run typeorm:create --name={filename}

# Auto generate a migration
npm run typeorm:generate --name={filename}

# Run migration
npm run typeorm:run

# Revert a migration
npm run typeorm:revert
```

### Test

It's suggested that before making any push to origin, developers run the following commands and make sure there are no errors.

```bash
# unit tests
npm run test
yarn test

# e2e tests
npm run test:e2e
yarn test:e2e

# test coverage
npm run test:cov
yarn test:cov
```

## Folder structure

This project follows a very simple project structure:

- `src`: This folder is the main container of all the code inside your application.

  - `config`: Folder to store any kind of config that you have.
  - `constants`: Folder to store any kind of constant that you have.
  - `decorators`: Folder to store any kind of decorator that you have.
  - `entities`: Folder to store any kind of entity that you have.
  - `enums`: Folder to store any kind of enum constant that you have.
  - `main.ts`: Main entry point that starts your whole app.
  - `migrations`: Folder to store any kind of migration that you have.
  - `modules`: Folder to store any kind of module that you have.
  - `repositories`: Folder to store any kind of repository that you have.
  - `test-utils`: Folder to store tests-related utilities.
  - `types`: Folder to store all the type/interface that you have.
  - `utils`: Folder to store all the common utils function that you have.
