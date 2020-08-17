# ts-service-seed

Template for TS service

## Prerequisites

1. NodeJS LTS (12+)
1. Yarn

## Install

```console
yarn
```

## Starting server

```console
yarn start
```

### Parameters

The following **environment variables** can be used to configure the service:

* `PORT` to set on which port the service should run (default: 3000)

## API

| Method | URL      | Description      | Response             |
|:-------|:---------|:-----------------|:---------------------|
| `GET`  | `/hello` | Example API call | `{ hello: "world" }` |

### API for tests

| Method | URL      | Description    | Response |
|:-------|:---------|:---------------|:---------|
| `GET`  | `/db`    | Returns the DB | `{...}`  |
| `GET`  | `/clean` | Cleans the DB  | `{}`     |

## Docker

To build the image:

```console
docker build -t ts-service:latest .
```

### Run service

```console
docker run -d -p 3000:3000 ts-service:latest
```

## Docs

For detailed documentation see the [TypeDocs documentation](https://szikszail.github.io/lm-ts-api-poc-service/).