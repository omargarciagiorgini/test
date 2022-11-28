const UserRepository = require('../repositories/users');

exports.getAll = async () => {
    return await UserRepository.getAllUsers();
}