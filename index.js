const express = require('express'); //Import the express dependency
const UsersController = require('./controllers/users');
const { validateGetUsers  }= require('./middlewares/validators');
const verifyToken = require('./middlewares/auth');
const app = express();
const port = 5000;
// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(express.json());

app.use('/users', verifyToken, validateGetUsers);
app.get('/users', async (req, res) => {
    const users = await  UsersController.getAll(req);
    res.send(200,users);
  })

app.post('/register', async (req, res) => {
  try {
    await UsersController.register(req.body.userName, req.body.mail, req.body.pass);
    res.status(204).send("")
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
})

app.post('/login', async(req, res) => {
  const [status , token] = await UsersController.login(req.body.userName, req.body.pass).catch((e)=> console.log(e));
  res.header('auth-token', token).json({
    error: null,
    data: {token}
  }).status(status);
})
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 