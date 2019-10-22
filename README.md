# Install:

- `npm install`
- add given .env file at the root of the project

# Start

- `npm run dev`
- The app connects remotely to a mongodb hosted by Mongo Atlas

# Current endpoints

## /users

- POST `/users/login` to get a new token
- GET `/users` to retrieve all users (secured by auth)


## /tasks

- POST `/tasks` to post a new task (secured by auth)
- GET `/tasks` to retrieve all tasks (secured by auth)


# User already in DB

- name: 'Johny'
- email: 'johny@yahoo.xr'
- password: '12345'

# Tests

- `npm run test:watch` or `npm run test`
- The tests run with mongodb-memory-server and must download the binary on the first test run (it can take a bit of time)

# Next steps

- Encrypt password when saving user to db
- Add limited validation time for jwt tokens
- Test `/tasks` POST endpoint
- Test `/users` enpoints
