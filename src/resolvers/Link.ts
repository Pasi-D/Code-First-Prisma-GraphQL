import { prismaObjectType } from "nexus-prisma";
import { User } from "./User";
import { Vote } from "./Vote";

export const Link = prismaObjectType({
 name: "Link",
 description: "Links generated",
 definition(t) {
  t.prismaFields(["id", "createdAt", "updatedAt", "description", "url"])
  t.field("postedBy", {
    type: User,
    resolve: (parent, args, { prisma }, info) => {
      return prisma.link({ id: parent.id }).postedBy();
    }
  })
  t.list.field("votes", {
    type: Vote,
    resolve: (parent, args, { prisma }, info) => {
      return prisma.link({ id: parent.id }).votes();
    }
  })
 }
});

module.exports = {
 Link
};