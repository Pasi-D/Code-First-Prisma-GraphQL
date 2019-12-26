import { prismaObjectType } from "nexus-prisma";
import { Link } from "./Link";
import { User } from "./User";

export const Vote = prismaObjectType({
  name: "Vote",
  description: "Vote casted on link by user",
  definition(t) {
    t.prismaFields(["*"])
  }
})

module.exports = {
 Vote
};