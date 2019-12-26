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
   resolve: (parent, args, context, info) => {
    const resolution = context.prisma.user({ id: parent.id }).links();
    return resolution;
   }
  })
  t.list.field("votes", { 
   type: Vote,
   resolve: (parent, args, context, info) => {
    const resolution = context.prisma.user({ id: parent.id }).votes();
    return resolution
   }
  })
 }
})

module.exports = {
 User
};