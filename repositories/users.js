const  models = require('../db/models/index');
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