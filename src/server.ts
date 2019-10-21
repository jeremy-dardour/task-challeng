import App from './app';
import TaskController from './task/task.controller';
import UserController from './user/user.controller';

const app = new App(
  [
    new UserController(),
    new TaskController(),
  ],
);

app.listen();
