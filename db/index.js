const Sequelize = require("sequelize");


exports.init_db = () => {

    const sequelize = new Sequelize(
        'db_Debates-Node_dev',
        'omar',
        'omar4072',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
    );
    
    
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });
};