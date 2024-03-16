<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Santex Back-end Test

App build with nestJS, prisma, Graphql and postgres.
App where the user can create a league, get information about team and players

## Installation

```bash
# clone repo
$ git clone git@github.com:IrvinSanchez14/south-test.git
$ cd south-test

# install postgress with docker
$ docker-compose up

# create schema app
$ npx prisma migrate dev

# install libraries
$ npm install
```

## .env

```bash

$ DATABASE_URL="postgresql://citizix_user:S3cret@localhost:5432/mydb?schema=santex_be"
$ API_URL="https://api.football-data.org/v4"
$ ACCESS_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwY2JhYWY4MzBjZjlmZTZlZmNhYjNkNzNiNjJlMWVkMSIsInN1YiI6IjY1NDQ0MzczMjg2NmZhMDBhYjBmZGFhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bPt1SuyEUMSYL1fb2-_ysb0UVNsXwrY7CptdtLLJdPE"

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## flow app
