import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import userModel from '../schemas/user.model';
interface DataStoredInToken {
 _id: string
}
const getUser = async (req: Request, res: Response) => {
 const authToken = req.headers.authorization.split('Bearer ')[1]
 const secret = process.env.JWT_SECRET;
 const verificationResponse = jwt.verify(authToken, secret) as DataStoredInToken;
 const id = verificationResponse._id;
 const user = await userModel.findById(id).select('-password');
 if (user) {
  res.send(JSON.stringify(user))
 } else {
  res.send(JSON.stringify({ message: 'user not found' }))
 }
}

export default getUser;