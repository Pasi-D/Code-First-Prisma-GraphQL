const feed = async (parent, args, context, info) => {
 const where = args.filter ? {
  AND: [
    { description_contains: args.filter },
    { url_contains: args.filter },
  ],
} : {};
 const links = await context.prisma.links({ 
  where, 
  skip: args.skip,
  first: args.first,
  orderBy: args.orderBy
 });
 const count = await context.prisma.linksConnection({ where }).aggregate().count();
 return {
  count,
  links
 };
};

module.exports = {
 feed
};