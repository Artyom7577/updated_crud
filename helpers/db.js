const config = require('./config.json');
const mysql = require('mysql');
const {Sequelize} = require('sequelize');


module.exports = db = {};

initialize().catch((error) => {
    console.error('Initialization error:', error);
});
async function initialize() {

    const {host, port, user, password, database} = config.database;
    const connection = await mysql.createConnection({host, port, user, password});
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    /** Connection to db */
    const sequelize = new Sequelize(database, user, password, {dialect: 'mysql'});

    db.Employee = require('../employees/employees.model')(sequelize);

    await sequelize.sync({alter: true})
}

module.exports = db;