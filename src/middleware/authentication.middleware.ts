import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedException from '../exceptions/UnAuthorizedException';
import VerifiedJwtToken from '../interface/verified-jwt-token.interface';
import User from '../user/user.model';

async function authMiddleware(request: Request, response: Response, next: NextFunction) {
  let authorizationHeader = request.header('Authorization');

  if (!authorizationHeader) {
    next(new UnauthorizedException());
  } else {
    authorizationHeader = authorizationHeader as string;

    try {
      const token = authorizationHeader.replace('Bearer ', '');
      const tokenData = jwt.verify(token, process.env.JWT_KEY as string) as VerifiedJwtToken;
      const user = await User.findOne({ '_id': tokenData._id, 'tokens.token': token });

      if (!user) {
        next(new UnauthorizedException());
      }

      next();
    } catch (error) {
      next(new UnauthorizedException());
    }
  }
}

export default authMiddleware;
