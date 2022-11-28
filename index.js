const express = require('express'); //Import the express dependency
const UsersController = require('./controllers/users');

const app = express();
const port = 5000;

app.get('/users', async (req, res) => {
    const users = await  UsersController.getAll();
    res.send(users);
  })

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 