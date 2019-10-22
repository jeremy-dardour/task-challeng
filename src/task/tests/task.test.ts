import request from 'supertest';
import App from '../../app';
import Task from '../../task/task.model';
import User from '../../user/user.model';
import TaskController from '../task.controller';

const app = new App([ new TaskController()]);

describe('/tasks Enpoints', () => {
  let userJwt: string;

  beforeAll(async () => {
    const user = new User ({
      email: 'test@budy.com',
      name: 'TestBuddy',
      password: 'password',
    });

    userJwt = await user.generateAuthTokenAndSave();
  });

  afterAll(async () => {
    await User.remove({});
    await Task.remove({});
  });

  describe('GET /tasks', () => {
    it('should be protected by authentication', () => {
      return request(app.app).get('/tasks').expect(401);
    });

    it('should return tasks if authenticated', async () => {
      const task = { title: 'toto', shouldBeDoneOn: '2019-10-22T09:48:34.693Z' };
      const taskClass = new Task(task);
      await taskClass.save();

      return request(app.app)
        .get('/tasks')
        .set('Authorization', userJwt)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((response) => {
          expect(response.body.length).toEqual(1);
          expect(response.body[0].title).toEqual(task.title);
          expect(response.body[0].shouldBeDoneOn).toEqual(task.shouldBeDoneOn);
        });
    });
  });
});
