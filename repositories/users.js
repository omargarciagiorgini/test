const  User = require('../db/models/user');
exports.getAllUsers = async () => {
    try {
        const users = await User.findAll();
        console.log(users.every(user => user instanceof User)); // true
        console.log("All users:", JSON.stringify(users, null, 2));
        return JSON.stringify(users, null, 2);
        
    } catch (error) {
        console.log(error);
    }
}