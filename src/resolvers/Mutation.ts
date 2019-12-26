import { getUserId, hashPwd, createNewToken, validatePassword } from "../util/adapter";
import { prismaObjectType } from "nexus-prisma";
import { stringArg, objectType, idArg } from "nexus";
import { User } from "./User";
import { Link } from "./Link";
import { Vote } from "./Vote";

const signUp = async (parent, args, context, info) => {
 const password = await hashPwd(args.password);

 const user = await context.prisma.createUser({ ...args, password });

 const token = createNewToken(user);

 return {
  token,
  user
 }
};

const login = async (parent, args, context, info) => {
 const user = await context.prisma.user({ email: args.email });

 if (!user) {
  throw new Error("No such user found");
 }

 const validPassword = await validatePassword(args.password, user.password);
 if (!validPassword) {
  throw new Error("Invalid password");
 }

 const token = createNewToken(user);

 return {
  token,
  user
 }
};

const post = async (parent, args, context, info) => {
 const userId = getUserId(context);
 return context.prisma.createLink({
  url: args.url,
  description: args.description,
  postedBy: { connect: { id: userId } },
 })
};

const vote = async (parent, args, context, info) => {
 const userId = await getUserId(context);

 const linkExists = await context.prisma.$exists.vote({
  user: { id: userId },
  link: { id: args.linkId }
 });

 if (linkExists) {
  throw new Error(`Already voted for link: ${args.linkId}`)
 }

 return context.prisma.createVote({
  user: { connect: { id: userId } },
  link: { connect: { id: args.linkId } }
 });
};

const Mutation = prismaObjectType({
 name: "Mutation",
 definition(t) {
  t.field("signUp", {
   type: AuthPayload,
   args: {
    email: stringArg(),
    name: stringArg({ nullable: false }),
    password: stringArg({ nullable: false })
   },
   resolve: (root, args, context, info) => {
    return signUp(root, args, context, info);
   }
  })

  t.field("login", {
   type: AuthPayload,
   args: {
    email: stringArg({ required: true }),
    password: stringArg({ nullable: false })
   },
   resolve: (root, args, context, info) => {
    return login(root, args, context, info);
   }
  })

  t.field("post", {
   type: Link,
   args: {
    url: stringArg({ required: true }),
    description: stringArg({ required: true })
   },
   resolve: (root, args, context, info) => {
    return post(root, args, context, info);
   } 
  })

  t.field("vote", {
   type: Vote,
   args: {
    linkId: idArg()
   },
   resolve: (root, args, context, info) => {
    return vote(root, args, context, info);
   }
  })
 }
})

const AuthPayload = objectType({
 name: "AuthPayload",
 definition(t) {
  t.string("token", { description: "Token generated from server" })
  t.field("user", {
   type: User
  })
 }
})

module.exports = {
 Mutation,
 AuthPayload
}