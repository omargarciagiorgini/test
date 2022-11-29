const  models = require('../db/models/index');
const bcrypt = require('bcrypt')

exports.getAllUsers = async () => {
    try {
        console.log(models.User);
        const users = await models.User.findAll();
        console.log("All users:", JSON.stringify(users, null, 2));
        return JSON.stringify(users, null, 2);
        
    } catch (error) {
        console.log(error);
    }
}

exports.register = async (userName , email , pass) => {
    const saltRounds = 10

    const encryptedPass = await bcrypt.hash(pass, saltRounds);
    const newUser = { first_name : userName,
                        email: email,
                        password: encryptedPass
                    }
                    console.log('newUser: ',newUser);
    models.User.create(newUser).then(function(newUser){
        console.log(newUser.name); // John
        // John is now in your db!
    }).catch(function(error){
            console.log('Error al intentar guardar un nuevo usuario: ', error);
    });
}

exports.verifyPassword = async(userID, pass) => {
    try {
        const storedHash = await models.User.findOne({
            attributes: ['password'],
            where: { id: userID },
          });
          console.log('storedHash',storedHash.dataValues.password);
        const result = await bcrypt.compare(pass, storedHash.dataValues.password);
        return result;
    } catch (error) {
        console.log('verifyPassword:',error);
    }
    return false;  
}

exports.getUserIDByUserName= async (userName) => {
    const result = await models.User.findOne({ attributes: ['id'],where:{ first_name:userName}});
    console.log('getUserIDByUserName', result.dataValues.id);
    return result.dataValues.id;
}