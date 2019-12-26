import { subscriptionField } from "nexus";
import { Link } from "./Link";
import { Vote } from "./Vote";

const newLinkSubscribe = (parent, args, context, info) => {
 return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node();
};
 
const newLink = subscriptionField("newLink", {
 type: Link,
 description: "Fires anytime when a new link is generated",
 subscribe: (parent, args, context, info) => {
  return newLinkSubscribe(parent, args, context, info);
 },
 resolve: payload => payload
})

const newVoteSubscribe = (parent, args, context, info) => {
 return context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node()
};

const newVote = subscriptionField("newVote", {
 type: Vote,
 description: "Fires whenever a new vote is casted",
 subscribe: (parent, args, context, info) => {
  return newVoteSubscribe(parent, args, context, info)
 },
 resolve: payload => payload
})

module.exports = {
 newLink,
 newVote
};