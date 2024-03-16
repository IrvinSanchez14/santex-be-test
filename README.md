<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Santex Back-end Test

App build with nestJS, prisma, Graphql and postgres.
App where the user can create a league, get information about team and players

Why have I used this framework and these libraries? The reason is because Nest maintains a specific order in the way you create the queries for each table or relationship within the database, Prisma also has a way of creating an ordered database and handling migrations in an orderly manner. and clean and finally use docker to create the base data so that you do not need to have the manager installed on your machine, you simply run docker and that's it.

## Installation

```bash
# clone repo
$ git clone git@github.com:IrvinSanchez14/santex-be-test.git
$ santex-be-test

# install libraries
$ npm install

# install postgress with docker
$ docker-compose up

# create schema app
$ npx prisma migrate dev

```

## .env

```bash

$ DATABASE_URL="postgresql://citizix_user:S3cret@localhost:5432/mydb?schema=santex_be"
$ API_URL="https://api.football-data.org/v4"
$ ACCESS_TOKEN="80de2fc7069d4af2914ab4c25c727ecd"

```

## Running the app

You need to open two tabs in your console:

1st - run the command `docker-compose up`

2nd - run the command `npm run start`

## Graphql

Open in your web borwser the next url: `http://localhost:3001/graphql`

we have the `Playground` from graphql to test all the queries and the mutation

Mutation available:

- getLeague

Queries Available

- getCompetition
- getPlayers
- getTeams

## Test

To create the `importLeague` we will need the following

```bash
  {
    "body": {
      "leagueCode": "PL"
    }
  }
```

remember this `json` needs to be add in the `QUERY VARIABLES`

the correct form to put the mutation in playground is

```bash
  mutation getLeague($body: LeagueRequestDTO!){
    getLeague(body: $body){
      name
    }
  }
```

if you need some codeLeague here is some examples

```bash
  PL
  BL1
  DED
  BSA
  SA
```

!IMPORTANT - the name of the new league is `importLeague ${leagueCode}` because the name of the league is an unique field

to get information about the league we will need the following

```bash
  {
    "body": {
      "competitionName": "importLeague PL"
    }
  }
```

and the query is

```bash
  query getCompetition($body: CompetitionRequestDTO!){
    getCompetition(body: $body){
      name
      teams {
        name
      }
    }
  }
```

to get information about the players we will need the following

```bash
  {
    "body": {
      "leagueCode": "PL"
    }
  }
```

and the query is

```bash
  query getPlayers($body: PlayersRequestDTO!){
    getPlayers(body: $body, ){
      teamName
      players {
        name
      }
    }
  }
```

In this case we can filter the data if we only want to know the players of a specific team if we add the field to the body `teamName`. Note that this field receives the `shortName` of the team

to get information about Teams we will need the following

```bash
  {
    "body": {
      "leagueCode": "PL"
    }
  }
```

and the query is

```bash
  query getTeams($body: TeamRequestDTO!){
    getTeams(body: $body){
      name
    }
  }
```

if you want to get players information you need to add the fields on the body `showPlayers`

## Final

Please take a look at the playground documentation where you can see everything related to the app
