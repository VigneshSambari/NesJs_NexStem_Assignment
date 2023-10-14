<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
<a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
<!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
[![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->
    
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## API Documentation

I have generated API documentation using Swagger Docs. You can explore the API and test it directly from the following link:

- [http://ec2-16-170-225-253.eu-north-1.compute.amazonaws.com:3000/api](http://ec2-16-170-225-253.eu-north-1.compute.amazonaws.com:3000/api)

## Deployment

The application is deployed on AWS EC2 with below link, open the API documentation from above link don't open the below link:

- [http://ec2-16-170-225-253.eu-north-1.compute.amazonaws.com:3000/](http://ec2-16-170-225-253.eu-north-1.compute.amazonaws.com:3000/)


## Testing WebSocket

The application uses websockets, both the inbuilt websocket and Socket.IO. To test WebSocket functionality, you can use Postman to connect to the following WebSocket endpoint:

- [http://ec2-16-170-225-253.eu-north-1.compute.amazonaws.com:3000/](http://ec2-16-170-225-253.eu-north-1.compute.amazonaws.com:3000/)

## Implementation Details

I have implemented this project using NestJS, a powerful Node.js framework. To keep the implementation simple, I did not use any database for simple implementation. Additionally, I've incorporated used inbuilt Websocket of NestJs and Socket.IO for real-time communication.


## Used npm Packages

I've used the following npm packages to build this project:

- [@nestjs/platform-socket.io](https://www.npmjs.com/package/@nestjs/platform-socket.io): Version 10.2.7
- [@nestjs/swagger](https://www.npmjs.com/package/@nestjs/swagger): Version 7.1.13
- [@nestjs/websockets](https://www.npmjs.com/package/@nestjs/websockets): Version 10.2.7


## Installation

```bash
$ npm install


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Stay in touch

- [@Sambari Vignesh](https://github.com/VigneshSambari)


