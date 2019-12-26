import { prismaObjectType } from "nexus-prisma";
import { Link } from "./Link";
import { User } from "./User";

export const Vote = prismaObjectType({
  name: "Vote",
  description: "Vote casted on link by user",
  definition(t) {
    t.id("id")
    t.field("link", { 
      type: Link, 
      resolve: (parent, args, context, info) => {
        return context.prisma.vote({ id: parent.id }).link()
      }
    })
    t.field("user", { 
      type: User,
      resolve: (parent, args, context, info) => {
        return context.prisma.vote({ id: parent.id }).user()
      }
    })
  }
})

module.exports = {
 Vote
};