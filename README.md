[![Node.js CI](https://github.com/ialbas/test-node-backend/actions/workflows/node.js.yml/badge.svg)](https://github.com/ialbas/test-node-backend/actions/workflows/node.js.yml)
[![javascript style guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![dependencies](https://img.shields.io/badge/dependencies-up-green)](https://standardjs.com/)
[![licence](https://badgen.net/badge/license/MIT/blue)](https://opensource.org/licenses/MIT)

## Backend API Rest NodeJs with Tests

![Backend API Rest NodeJs, Jest, JWT](capa_test_node_api.png)

## A simple project example with Node, Jest, JWT, Mongoose and outher resources.

## Sumary

- [Sumary](#sumary)
- [Getting Started](#getting-started)
- [Features](#features)
- [Features Available Soon](#features-available-soon)
- [Documentation](#documentation)
- [Libraries and Packages](#libraries-and-packages)
- [Licence](#license)

## Getting Started

Requeriments and Instructions

1. Install packages with `npm install`
2. Initialize docker-compose: `docker-compose up -d ` for container Docker MongoDB
3. To see Tests and Coverage `npm run test`
4. For data persistence set your string connection in file `.env` do like the example in file `.env-local`
5. Initialize this server `npm run start`
6. For `Postman` there are `collections` with all routes and `envioriments` to apply in your postman console. See more in folder ./postman

## Features

This API allows running basic CRUD with `mongodb` and authenticating routes with JWT and also has some other features listed below:

- Using some [Best Practices](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/) for good Rest API design.
- Using Unit testing for all Routes and Helpers using `Jest`.
- Using Integration testing for all Routes and Helpers using `Postman`.
- Using [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) for controll verersion in [Git Tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging), has the ability to tag specific points in a repository’s history.
- Full documentation for all routes, with [Postman Documentation](https://documenter.getpostman.com/view/11001155/UVsPN4e4) to public documentation and Integration Tests.
- Using `Lint Staged`
- Using `Husky` hooks to pre-commits and push to repository
- Using JWT for Routes Authentication


Schema: Post

- Using `MongoDB` for local storage data in container `Docker` and `Docker-Compose` to manage containers
- Using [MongoDB Memory Server](https://github.com/nodkz/mongodb-memory-server) for integration Tests and Mock.


## Libraries and Packages

- [Jest](https://jestjs.io/)
- [Express](https://expressjs.com/)
- [Git](https://git-scm.com/)
- [NPM](https://www.npmjs.com/)
- [Husky](https://github.com/typicode/husky)
- [Lint Staged](https://github.com/okonet/lint-staged)
- [Standard Javascript Style](https://standardjs.com/)
- [Nodemon](https://github.com/remy/nodemon)
- [Mongo Memory Server](https://github.com/nodkz/mongodb-memory-server)
- [Mongose](https://mongoosejs.com/)
- [MongoDb](https://www.mongodb.com/)
- [JWT](https://jwt.io/)
- [Postman](https://www.postman.com/)
- [Github Actions](https://docs.github.com/pt/actions)
- [Docker](https://docs.docker.com/get-started/)

# License

[MIT License](https://github.com/ialbas/test-node-backend/blob/main/LICENSE.md) Copyright (c) 2022

## Documentation

- Route Example

```bash
Request:
POST /api/get-forecast HTTP/1.1
Host: localhost:3000
Uri: localhost:3000/api/get-forecast
Content-Type: application/json
Body:
{
	"cep": "01311-903",
    "data": "2022-04-17"
}
```