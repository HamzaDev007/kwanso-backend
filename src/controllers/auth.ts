import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { matchPassword, encryptPassword } from '../common/password';
import User from '../interfaces/user';
import IdToken from '../interfaces/idToken';
import userModel from '../schemas/user.model';
import ValidateEmail from '../common/email'
const login = async (req: Request, res: Response) => {
 const body: User = req.body;
 if (!body.email || !body.password) res.send(JSON.stringify({ message: 'Email and Password are required!' }))
 else {
  const user = await userModel.findOne({ email: body.email });
  if (user && user._id) {
   const match = matchPassword(body.password, user.password);
   if (match) {
    const tokenData = await createToken(user);
    res.send(JSON.stringify({ jwt: tokenData }));
   } else {
    res.send(JSON.stringify({ message: 'Password do not match!' }))
   }
  } else {
   res.send(JSON.stringify({ message: `user not found` }));
  }
 }
}

const register = async (req: Request, res: Response) => {
 const body: User = req.body;
 if (!body.email || !body.password) res.send(JSON.stringify({ message: 'Email and Password are required!' }));
 else {
  if (!ValidateEmail(body.email)) res.send(JSON.stringify({ message: `${body.email} is not a valid email` }));
  else {
   const check = await userModel.findOne({ email: body.email });
   if (check && check.email) {
    res.send(JSON.stringify({ message: `${body.email} already exist.` }))
   } else {
    const hashedPassword = await encryptPassword(body.password);
    const user = userModel.create({ ...body, password: hashedPassword })
    res.send(JSON.stringify(user))
   }
  }
 }
}

export { login, register };

const createToken = (user: User) => {
 const secret = process.env.JWT_SECRET;
 const TokenId: IdToken = { _id: user._id, };
 return jwt.sign(TokenId, secret);
}