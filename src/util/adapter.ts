import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

const APP_SECRET = process.env.APP_SECRET;

export const getUserId = (context: any) => {
 // context.request - Works for graphql-yoga 
 // context.req - Works for apollo-server
 const Authorization = context.req.get('Authorization');
 if (Authorization) {
  const token = Authorization.replace('Bearer ', '');
  const { userId } = jwt.verify(token, APP_SECRET);
  return userId
 }

 throw new Error('Not authenticated')
};

export const hashPwd = plainPwd => {
 return bcrypt.hash(plainPwd, 10);
};

export const validatePassword = (password, hash) => {
 return bcrypt.compare(password, hash);
};

export const createNewToken = (user: any) => {
 return jwt.sign({ userId: user.id }, APP_SECRET);
};