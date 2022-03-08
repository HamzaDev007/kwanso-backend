import { NextFunction, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import userModel from '../schemas/user.model';

interface DataStoredInToken {
  _id: string
}
async function verifyAuth(request: Request, response: Response, next: NextFunction) {
  try {
    const authToken = request.headers.authorization.split('Bearer ')[1]
    const secret = process.env.JWT_SECRET;
    const verificationResponse = jwt.verify(authToken, secret) as DataStoredInToken;
    const id = verificationResponse._id;
    const user = await userModel.findById(id);
    if (user) {
      next();
    } else {
      response.send({message: `Unauthorized`})
    }
  } catch (error) {
    response.send({message: `Unauthorized: ${error.message}`})
  }
}

export default verifyAuth;