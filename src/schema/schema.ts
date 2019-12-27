import { gql } from "apollo-server";

const typeDefs = gql`
 type Query {
   """Retrieves all the links published"""
  feed(filter: String, skip: Int, first: Int, orderBy: LinkOrderByInput): Feed!
 }
 
 type Mutation {
  """Publish a new link"""
  post(url: String!, description: String!): Link!
  """Signup mutation"""
  signUp(email: String!, password: String!, name: String!): AuthPayload
  """Login mutation"""
  login(email: String!, password: String!): AuthPayload
  """Vote mutation"""
  vote(linkId: ID!): Vote
 }

 type Subscription {
  newLink: Link
  newVote: Vote
 }

 type AuthPayload {
  token: String
  user: User
 }

 type User {
  id: ID!
  name: String!
  email: String!
  links: [Link!]!
  votes: [Vote!]
 }

 scalar DateTime

 type Link {
  id: ID!
  description: String!
  createdAt: DateTime
  updatedAt: DateTime
  url: String!
  postedBy: User
  votes: [Vote!]!
 }

 type Vote {
  id: ID!
  link: Link!
  user: User!
 }

 type Feed {
  links: [Link!]!
  count: Int!
 }

 enum LinkOrderByInput {
  description_ASC
  description_DESC
  url_ASC
  url_DESC
  createdAt_ASC
  createdAt_DESC
 }
`;

module.exports = typeDefs;
