const UserRepository = require('../repositories/users');

exports.getAll = async () => {
    return await UserRepository.getAllUsers();
}

exports.register = async(userName , email , pass) => {
    return await UserRepository.register(userName , email , pass);    
}

exports.login =  async(userName, pass) => {
    try {
        const userID = await UserRepository.getUserIDByUserName(userName);
        const res = await UserRepository.verifyPassword(userID, pass);
        return [200,res?"logged":"user or pass incorrect"];
    } catch (error) {
        console.log('login error controller',error);
        return [500,'Error: {$error}'+error];
    }
}