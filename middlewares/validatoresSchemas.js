const Joi = require('joi'); 

exports.getUsersSchema = Joi.object().keys({ 
    first_name: Joi.string().optional(), 
    city: Joi.string().optional() 
  }); 