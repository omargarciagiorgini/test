const UserRepository = require('../repositories/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getAll = async (req) => {
    return await UserRepository.getAllUsers(req);
}

exports.register = async(userName , email , pass) => {
    return await UserRepository.register(userName , email , pass);    
}

exports.login =  async(userName, pass) => {
    try {
        const userID = await UserRepository.getUserIDByUserName(userName);
        const res = await UserRepository.verifyPassword(userID, pass);
            // create token
        const token = jwt.sign({
            name: userName,
            id: userID
        }, process.env.TOKEN_SECRET)
        
        return [200, res?token:"user or pass incorrect"];
    } catch (error) {
        console.log('login error controller',error);
        return [500,'Error: {$error}'+error];
    }
}