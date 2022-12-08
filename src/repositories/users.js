const  models = require('../db/models/index');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const Redis = require("ioredis");

exports.getAllUsers = async (req) => {
    const redis = new Redis(process.env.REDIS_URL);

    try {
        const { query } = req;
        const res = await redis.get(JSON.stringify(query), (err, result) => {
            if (err) {
              console.error('redis get error: ',err);
            } 
          });
        if(res!=null) return res;
        const opt = [];
        Object.entries(query).forEach(([key, value]) => {
            opt.push({[key]:value} );          
        });
        const users = await models.User.findAll({
            attributes: {exclude: ['password']},order: [['id','DESC']],
            where:{ [Op.or]: opt}});
        if(users.length !== 0)
            redis.set(JSON.stringify(query), JSON.stringify(users , null ,2),'ex',3600);

        return JSON.stringify(users, null, 2);
        
    } catch (error) {
        console.log(error);
    }
}

exports.register = async (userName , email , pass) => {
    try {
        const saltRounds = 10
        const encryptedPass = await bcrypt.hash(pass, saltRounds);
        const newUser = {   first_name : userName,
                            email: email,
                            password: encryptedPass
                        }
        await models.User.create(newUser);
        const clone = Object.assign({}, { ...newUser });
        delete clone.password;
        return clone;
    } catch (error) {
        console.log('Error al intentar guardar un nuevo usuario: ', error);
        return error;
    }
}

exports.verifyPassword = async(userID, pass) => {
    try {
        const storedHash = await models.User.findOne({
            attributes: ['password'],
            where: { id: userID },
          });
        const result = await bcrypt.compare(pass, storedHash.dataValues.password);
        return result;
    } catch (error) {
        console.log('verifyPassword:',error);
    }
    return false;  
}

exports.getUserIDByUserName= async (userName) => {
    try {
        const result = await models.User.findOne({ attributes: ['id'],where:{ first_name:userName}});
        return result.dataValues.id;
    } catch (error) {
        console.log('Error at getUserIDByUserName in UserRepo:', error);
        return error;        
    }
}

exports.findOne = async (userName , email) => {
    try {
        const result = await models.User.findOne({ where:{ [Op.or]: [{first_name:userName},{email:email}]}});
        return result === null?false:true;
    } catch (error) {
            console.log(error);        
    }
}