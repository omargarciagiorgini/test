const express = require('express'); //Import the express dependency
const UsersController = require('./controllers/users');

const app = express();
const port = 5000;
app.use(express.json());

app.get('/users', async (req, res) => {
    const users = await  UsersController.getAll();
    res.send(200,users);
  })

app.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body.userName, req.body.mail, req.body.pass);
    await UsersController.register(req.body.userName, req.body.mail, req.body.pass);
    res.status(204).send("")
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
})

app.post('/login', async(req, res) => {
  const [status , msg] = await UsersController.login(req.body.userName, req.body.pass).catch((e)=> console.log(e));
  res.status(status).send(msg);
})
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 