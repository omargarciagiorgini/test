const express = require('express'); //Import the express dependency
const conn = require('./db/index');
const UsersController = require('./controllers/users');

const app = express();
const port = 5000;

conn.init_db();

app.get('/users', async (req, res) => {
    const users = await  UsersController.getAll();
    res.send(users);
  })

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 