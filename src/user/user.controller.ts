import * as express from 'express';
import InvalidCredentialsException from '../exceptions/InvalidCredentialsException';
import Controller from '../interface/controller.interface';
import authenticationMiddleWare from '../middleware/authentication.middleware';
import validationMiddleware from '../middleware/validation.middleware';
import LoginDto from './login.dto';
import User from './user.model';

class UserController implements Controller {
  public path = '/users';
  public router = express.Router();
  public model = User;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.loginUser);
    this.router.get(`${this.path}`, authenticationMiddleWare, this.findAllUsers);
  }

  private findAllUsers = async (request: express.Request, response: express.Response) => {
    const users = await this.model.find();
    response.send(users);
  }

  private loginUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const loginData: LoginDto = request.body;
    const user = await this.model.findOne({ email: loginData.email });

    if (!user || user.password !== loginData.password) {
      next(new InvalidCredentialsException());
    } else {
      const token = await user.generateAuthTokenAndSave();

      response.send({ email: user.email, token });
    }
  }
}

export default UserController;
