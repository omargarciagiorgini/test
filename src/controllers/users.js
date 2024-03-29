const UserRepository = require('../repositories/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getAll = async (req) => {
    return await UserRepository.getAllUsers(req);
}

exports.register = async(userName , email , pass) => { 
    try {
        if(await UserRepository.findOne(userName , email) === true) return 'Already in use!';
        else { return await UserRepository.register(userName , email , pass); }   
    } catch (error) {
        console.log(error);
        return error        
    }
}

exports.login =  async(userName, pass) => {
    try {
        const userID = await UserRepository.getUserIDByUserName(userName);
        const res = await UserRepository.verifyPassword(userID, pass);
            // create token
        return (userID && res )?[200,jwt.sign({
            name: userName,
            id: userID
        }, process.env.TOKEN_SECRET)]:[401,"user or pass incorrect"];
    } catch (error) {
        console.log('login error controller',error);
        return [500,'Error: {$error}'+error];
    }
}