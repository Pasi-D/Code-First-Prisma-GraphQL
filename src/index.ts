import { ApolloServer } from "apollo-server";
import { prisma } from "./generated/prisma-client"; 
import * as dotenv from "dotenv";

dotenv.config();

const typeDefs = require("./schema/schema")

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Vote = require("./resolvers/Vote");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
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