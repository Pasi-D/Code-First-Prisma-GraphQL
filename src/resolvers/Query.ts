import { queryType, arg, stringArg, intArg, enumType, objectType } from "nexus";
import { Link } from "./Link";

const Query = queryType({
  definition(t) {
    t.list.field("feed", {
      type: Feed,
      description: "Retrieves all the links published",
      args: {
        filter: stringArg({nullable: true}),
        skip: intArg({default: 0}),
        first: intArg({ default: 10 }),
        orderBy: arg({ type: LinkOrderByInput, required: false })
      },
      resolve: async (root, { filter, skip, first, orderBy }, { prisma }, info) => {
        const where = filter ? {
          AND: [
            { description_contains: filter },
            { url_contains: filter }
          ]
        } : {};
        const links = await prisma.links({
          where,
          skip,
          first,
          orderBy
        });
        const count = await prisma.linksConnection({ where }).aggregate().count();
        // This is the weird return statement that confuses me.
        return [
          {
            links,
            count
          }
        ];
      }
    })
  }
});

const Feed = objectType({
  name: "Feed",
  definition(t) {
    t.list.field("links", {
      type: Link
    })
    t.int("count", { description: "Count of feed links" })
  }
});

const LinkOrderByInput = enumType({
  name: "LinkOrderByInput",
  description: "Enums for links orderBy",
  members: ["description_ASC", "description_DESC", "url_ASC", "url_DESC", "createdAt_ASC", "createdAt_DESC"]
});

module.exports = {
 Query,
 Feed
};