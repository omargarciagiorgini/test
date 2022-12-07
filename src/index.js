const express = require('express'); //Import the express dependency
const UsersController = require('./controllers/users');
const validationMiddleware= require('./middlewares/validators');
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

app.use('/users', verifyToken, validationMiddleware.validateGetUsers);
app.get('/users', async (req, res) => {
    const users = await  UsersController.getAll(req);
    res.status(200).send(users);
  })

app.post('/register', validationMiddleware.validatePostRegister,  async (req, res) => {
  try {
    const data = await UsersController.register(req.body.user_name, req.body.mail, req.body.pass);
    console.log(data);
    res.status(200).json({data});
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
})

app.post('/login', validationMiddleware.validatePostLogin, async(req, res) => {
  const [status , token] = await UsersController.login(req.body.user_name, req.body.pass).catch((e)=> console.log(e));
  res.header('auth-token', token).json({
    error: null,
    data: {token}
  }).status(status);
})
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 