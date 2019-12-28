## HackerNews mimicking graphQL project

This is a complete rip-off from [Howtographql](https://www.howtographql.com/graphql-js/0-introduction/) introduction tutorial, but modified further in depth to explore code-first development approach in graphql with the help of [nexus](https://nexus.js.org/) & [nexus-prisma](https://github.com/prisma-labs/nexus-prisma)

```apollo-server-sdl-based``` branch follows a "Schema-First" development of graphql-server while the entire logic is written using code-first approach in ```prisma-nexus-code-first``` branch.

Hop on to whichever you like and setup the project.

### Setting up the project

You need to have [Prisma](https://www.prisma.io/) installed globally in your environment.

```
sudo npm install -g prisma
```
You also need docker installed as well.

Clone the project locally.

```
git clone https://github.com/xXZang3tsuXx/Code-First-Prisma-GraphQL.git
```

Run docker-compose to spin up the containers.

```
docker-compose up -d
```

Run 
```
prisma deploy
``` 
to generate prisma client.

Run ```yarn install``` to download depenedencies.

Run ```yarn dev``` to start the server in development mode.

You can use http://localhost:4000 to explore the graphql playground.
