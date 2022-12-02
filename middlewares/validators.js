const Joi = require('joi'); 
const   { getUsersSchema } =require('../middlewares/validatoresSchemas');

exports.validateGetUsers= async (req, res, next)=> {
    const { query } = req; 
    const result = await getUsersSchema.validate(query); 
    const { value, error } = result; 
    const valid = error == null; 
    if (!valid) { 
      res.status(422).json({ 
        message: 'Invalid request', 
        data: error.details[0].message
      }) 
    } else { next();}
}