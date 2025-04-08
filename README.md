# AMEX &middot; [![Node version](https://img.shields.io/badge/node-v22.14.0-purple.svg)]()[![OS Compatibility](https://img.shields.io/badge/OS-mcOS%20|%20Windows%20|%20Linux-blue.svg?label=os)]() [![Development Status](https://img.shields.io/badge/status-alpha-green.svg)]()

## Description

This project is a coding test from AMEX.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

- Install [Node.js](https://nodejs.org/en) using [Node Version Manager (nvm)](https://github/com/nvm-sh/nvm).
  The required Node version is specified in the `.nvmrc` file. After installing `nvm`, run:

```bash
nvm install
nvm use
```

- Install [Visual Studio Code](https://code.visualstudio.com/)
- Set the correct values in your local `.env` and `.npmrc` files
- Install the dependencies via the following command:

```shell
npm i
```

- Run the application locally via the following command:

```shell
npm run dev
```

## Tech Being Used

- [Node.js](https://nodejs.org/en) - Cross platform, open-source event-driven programming language that adopts an event-driven, non-blocking I/O model, making it ideal for building scalable and high-performance network applications.
- [Fastify](https://fastify.dev/) - Fastify is a web framework for Node.js that focuses on delivering low overhead and high performance.
- [msw](https://mswjs.io/) - Mock Service Worker, a tool used for API mocking by intercepting HTTP requests at the network level via service workers or request interception in Node.js.
