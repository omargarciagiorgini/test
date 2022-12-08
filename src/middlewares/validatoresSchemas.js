const Joi = require('joi'); 

exports.getUsersSchema = Joi.object().keys({ 
    first_name: Joi.string().optional(), 
    city: Joi.string().optional() 
  }); 

exports.postRegisterSchema = Joi.object().keys({ 
    user_name: Joi.string().min(3).max(30).required(), 
    mail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required() ,
    pass: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  }); 

exports.postLoginSchema = Joi.object().keys({ 
    user_name: Joi.string().min(3).max(30).required(), 
    pass: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
}); 