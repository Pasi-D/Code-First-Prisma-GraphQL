import { ApolloServer } from "apollo-server";
import { makePrismaSchema } from "nexus-prisma";
import * as path from "path";
import datamodelInfo from "./generated/nexus-prisma";
import { prisma } from "./generated/prisma-client"; 
import * as dotenv from "dotenv";

dotenv.config();

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Vote = require("./resolvers/Vote");

const schema = makePrismaSchema({
  types: [Query, Mutation, Subscription, Link, User, Vote],

  prisma: {
    datamodelInfo,
    client: prisma
  },

  // Specify where Nexus should put the generated files
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },

  // Configure nullability of input arguments: All arguments are non-nullable by default
  nonNullDefaults: {
    input: false,
    output: false,
  },

  // Configure automatic type resolution for the TS representations of the associated types
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(__dirname, './types.ts'),
        alias: 'types',
      },
    ],
    contextType: 'types.Context',
  }
})

const server = new ApolloServer({
  schema,
  context: request => {
   return {
     ...request,
     prisma,
   }
  },
 });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});