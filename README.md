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

[Atom Laptop](https://github.com/nqnghia285/atom-laptop-nestjs-graphql-be) is a project for me to learn about [NestJS](https://nestjs.com) framework and some other technologies.

This project simulates an API server for a laptop store.

Descriptions about models, entities, relationships...[here](https://github.com/nqnghia285/atom-laptop-nestjs-graphql-be/blob/main/prisma/schema.prisma)

## Technologies
- [NestJS](https://nestjs.com) combines everything together.
- [Apollo Graphql](https://www.apollographql.com) is used to build Graphql API.
- [Socket.IO](https://socket.io) It serves well in real time, the room management structure is very suitable for building chat application.
- [Prisma](https://www.prisma.io) is next-generation ORM which connects and manages database. I use PostgreSQL for this project.
- [CASL](https://casl.js.org) is Isomorphic Authorization JavaScript library. I use it to define user rules, this allows the system to determine who is allowed to manipulate the endpoints.
- And some other technologies.

## Source
```bash
   /project
      /libs
      /prisma
      /public
      /scripts
      /src
      /test
      ...
```
- **libs**: contains defined librarys by myself.
  - ***api-config***: is used to load and store configuration variables in the environment. This makes accessing environment variables faster than when using 'process.env'.
  - ***auth***: defines two endpoints: logIn and logOut. I use JWT (JSON Web Token) to generate an access token when user successfully login. This access token is included in the response's data and cookie.
  - ***casl***: is where I use to define rules for users. It is a service that determines who is allowed to manipulate endpoints.
  - ***logger***: is used to log system status.
  - ***prisma***: is where used to define prisma instance.
  
- **prisma**: contains a schema file that is used to define models, relationships... and migration files. To view the schema.prisma, you can visit [here](https://github.com/nqnghia285/atom-laptop-nestjs-graphql-be/blob/main/prisma/schema.prisma).
- **public**: is a static directory which serves static website as Single Page Application (SPA) and some other static files like images, text files...
- **scripts**: contains my scripts to run the system.
- **src**: is the main directory containing most of the source code.
   - ***api***: is where I define two RESTful API's endpoints.
      - First endpoint: is used to download the schema.gql file containing all the graphql endpoints. It's used for development. To call it successfully, you must to login as ADMIN rule.
        - URL:
            ```bash
            {domainname}/api/graphql-schema
            ```
        - method: GET and not parameter.
      - Second endpoint: It's used for testing. If you accidentally delete the admin account, this endpoint will help you reset the admin account again. It does not require any roles.
        - URL:
            ```bash
            {domainname}/api/reset-admin-account
            ```
        - method: GET and not parameter.
   - ***config***: contains option objects used to configure system modules.
   - ***decorators***: This is where the files about decorators are located, one of the features that Typescript supports.
   - ***features***: Features that require some additional systems can be defined here. Currently I have created a module about Chat.
     - chat: This is a gateway module, it's built on [socket.io](https://www.npmjs.com/package/socket.io) package. URL:
      ```bash
      {domainname}/support
      ```
   - ***graphql***: Graphql APIs are defined here. URL:
      ```bash
      {domainname}/graphql
      ```
     - features: I have defined a graphql endpoint similar to the first RESTful API endpoint above.
     - models: contains the Graphql APIs for each model in the database.
     - typedefs: This is where the types for graphql are defined.
     - schema.gql: This is the file generated when running "nest build". It is what describes the Graphql API to work.
   - ***guards***: This is the folder containing the definition files for [Guards](https://docs.nestjs.com/guards), a feature supported by NestJS.
   - ***handlers***: I define some helpers/handlers here.
   - ***interface***: I declare global types, interface, enums...here.
   - ***pipes***: Similar to Guards, [Pipes](https://docs.nestjs.com/pipes) is also one of the features of NestJS.
   - ***plugins***: This is where I define plugins.
   - ***strategies***: contains definitions on how to get the JWT from the request and validate it to get the information inside the JWT.
   - ***app.module.ts***: This is where all the modules of the system are combined together.
   - ***main.ts***: This is the main file that the system starts from here.

## Setup
   1) Create the .env file at the same level as the package.json file in the project with the content:
   
      ```bash
      NODE_ENV=development
      AUTHOR=user
      DATABASE_URL=your database url
      GRAPHQL_PATH=/graphql
      HOST=0.0.0.0
      PORT=5000
      JWT_KEY=private-key
      ORIGIN=["*"]
      TOKEN_NAME=Authorization
      URL=http://localhost
      GRAPHQL_SCHEMA_PATH=src/graphql/schema.gql
      REDIS_SERVER_NAME=localhost
      REDIS_SERVER_PORT=6379
      email=admin@gmail.com
      fullname=Admin
      password=123456
      phone=+84123456789
      role=ADMIN
      ```
      Some environment variables you can change its value:
      - NODE_ENV: production or development
      - DATABASE_URL: You should visit [here](https://www.prisma.io/docs/guides/development-environment/environment-variables) to know how to properly assign a value to it.
      - HOST: is the IP address you want the application to run on. I advise you not to change it.
      - PORT: You can run the application on any port you want, as long as your system allows it.
      - JWT_KEY: is the security key used in user authentication of JWT. You can visit [here](https://www.npmjs.com/package/jsonwebtoken) to get more information.
      - ORIGIN: is a string or an array of strings. To know how to properly assign a value to it, you should visit [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
      - TOKEN_NAME: is the token name used to store the JWT value inside the request and response.
      - REDIS_SERVER_NAME and REDIS_SERVER_PORT: are used to connect to the redis server on your computer.You have to install and start redis server up. Visit [here](https://redis.io/docs/getting-started/) to get more details.
      - email: The value must be in email format.
      - fullname: is a string with a maximum length of 60.
      - password: is a string with a maximum length of 16.
      - phone: is the phone number with the country code. Example: +84xxxxxxxxx for Viet Nam's phone number. Visit [here](https://en.wikipedia.org/wiki/National_conventions_for_writing_telephone_numbers) to get more information.
      - role: must be ADMIN, or you can ignore it.

      Environment variables such as email, name, password, phone, and role are used to reset the admin account.

   2) Install packages with:
      ```bash
      $ yarn isntall
      // or
      $ npm install
      ```
   3) Build
      ```bash
      $ yarn build
      // or
      $ npm run build
      ```

   4) Start
      ```bash
      $ yarn start
      // or
      $ npm start
      ``` 
      If you run app with NODE_ENV = development, you can access dev mode on browser with URL:
      ```bash
      {HOST}:{PORT}/graphql
      ```
      Example: http://localhost:5000/graphql

   5) Connection
      - Browser: Visit [here](https://www.apollographql.com/docs/apollo-server/v2/testing/graphql-playground) to get more information. When successfully accessing developer mode, you need to set properties in Settings (gear icon in upper right corner). At attribute "request.credentials", you change "omit" to "include". In this mode, you can traverse all graphql endpoints in the DOCS section on the right corner.
      - [Apollo Client](https://www.apollographql.com/docs/react/get-started): I have configured an Apollo Client instance to connect to my server, you can refer to [here](https://github.com/nqnghia285/atom-laptop-nextjs-fe/blob/main/utilities/apollo-client/apollo-client.config.ts).

   6) Note
      > I built the Graphql API for my project on top of the Prisma client API so that I can flexibly manipulate the database from the client side. You should refer [here](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#model-queries) for more details.

## Deployment
   I deployed this project on AWS. I ran it with developer environment. you can visit to
   > Backend: https://api.codeeverywhere.online/graphql (temporary)

   > Frontend: https://atomlaptop.vercel.app (Unfinished)