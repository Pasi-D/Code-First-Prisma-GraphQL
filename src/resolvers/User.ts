import { prismaObjectType } from "nexus-prisma";
import { Link } from "./Link";
import { Vote } from "./Vote";

export const User = prismaObjectType({
 name: "User",
 description: "User of the hacker news clone",
 definition(t) {
  t.id("id")
  t.string("name")
  t.string("email")
  t.list.field("links", { 
   type: Link,
   resolve: (parent, args, { prisma }, info) => {
    return prisma.user({ id: parent.id }).links();
   }
  })
  t.list.field("votes", {
   type: Vote,
   resolve: (parent, args, { prisma }, info) => {
    return prisma.user({ id: parent.id }).votes();
   }
  })
 }
})

module.exports = {
 User
};