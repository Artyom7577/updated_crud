//const bcrypt = require('bcryptjs');
const db = require('helpers/db.js');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Employee.findAll();
}

async function getById(id) {
    return await getEmployee(id);
}

async function create(params) {

    if (await db.Employee.findOne({where: {email: params.email}})) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const employee = new db.Employee(params);

    // user.passwordHash = await bcrypt.hash(params.password, 10);

    await employee.save();
}

async function update(id, params) {
    const employee = await getEmployee(id);


    const employeeNameChanged = params.username && employee.username !== params.username;
    if (employeeNameChanged && await db.Employee.findOne({where: {username: params.username}})) {
        throw 'EmployeeName "' + params.username + '" is already taken';
    }

    // // hash password if it was entered
    // if (params.password) {
    //     params.passwordHash = await bcrypt.hash(params.password, 10);
    // }

    Object.assign(employee, params);
    await employee.save();
}

async function _delete(id) {
    const employee = await getEmployee(id);
    await employee.destroy();
}

async function getEmployee(id) {
    const employee = await db.Employee.findByPk(id);
    if (!employee) throw 'Employee not found';
    return employee;

}