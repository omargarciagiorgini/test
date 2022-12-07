const Joi = require('joi'); 
const   { getUsersSchema, postRegisterSchema, postLoginSchema } =require('../middlewares/validatoresSchemas');

exports.validateGetUsers = async (req, res, next)=> {
  return await validation(req.query, res, next, getUsersSchema);
}

exports.validatePostRegister = async (req, res, next)=> {
  return await validation(req.body, res, next, postRegisterSchema);
}

exports.validatePostLogin = async (req, res, next)=> {
  return await validation(req.body, res, next, postLoginSchema);
}
const validation = async (data, res, next, schema) => {
  
    const result = await schema.validate(data); 
    const { value, error } = result; 
    const valid = error == null; 
    if (!valid) { 
      res.status(422).json({ 
        message: 'Invalid request', 
        data: error.details[0].message
      }) 
    } else { next();}
}