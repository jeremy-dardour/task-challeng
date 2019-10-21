import * as express from 'express';
import Controller from '../interface/controller.interface';
import authenticationMiddleware from '../middleware/authentication.middleware';
import validationMiddleware from '../middleware/validation.middleware';
import CreateTaskDto from './task.dto';
import Task from './task.model';

class TaskController implements Controller {
  public path = '/tasks';
  public router = express.Router();
  public model = Task;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, authenticationMiddleware, validationMiddleware(CreateTaskDto), this.createTask);
    this.router.get(`${this.path}`, authenticationMiddleware, this.findAllTasks);
  }

  private findAllTasks = async (request: express.Request, response: express.Response) => {
    const tasks = await this.model.find();
    response.send(tasks);
  }

  private createTask = async (request: express.Request, response: express.Response) => {
    const task: CreateTaskDto = {...request.body};

    if (!task.completed) {
      task.completed = false;
    }

    const createdTask = new this.model(task);
    const savedTask = await createdTask.save();

    response.send(savedTask);
  }
}

export default TaskController;
