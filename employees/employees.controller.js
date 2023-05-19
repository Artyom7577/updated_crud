const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validateRequest');
const employeeService = require('./employees.service');

/** Routes */

router.get('/', getAll);

router.get('/:id', getById);

router.post('/', createSchema, create);

router.put('/:id', updateSchema, update);

router.delete('/:id', _delete);

module.exports = router;

async function getAll(req, res, next) {
    try {
        const employees = await employeeService.getAll();
        res.json(employees);
    } catch (error) {
        next(error);
    }
}

async function getById(req, res, next) {
    try {
        const employeeId = req.params.id;
        const employee = await employeeService.getById(employeeId);
        res.json(employee);
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        await employeeService.create(req.body);
        res.json({message: 'Employee created'});
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const employeeId = req.params.id;
        const updatedEmployee = req.body;
        await employeeService.update(employeeId, updatedEmployee);
        res.json({message: 'Employee updated'});
    } catch (error) {
        next(error);
    }
}

async function _delete(req, res, next) {
    try {
        const employeeId = req.params.id;
        await employeeService.delete(employeeId);
        res.json({message: 'Employee deleted'});
    } catch (error) {
        next(error);
    }
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.number().required(),
        /** password: Joi.string().min(8).required(),
         * confirmPassword: Joi.string().valid(Joi.ref('password')).required() */
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
        phoneNumber: Joi.number().empty(),
        /** password: Joi.string().min(6).empty(''),
         * confirmPassword: Joi.string().valid(Joi.ref('password')).empty('') */
    });
    /**.with('password', 'confirmPassword');*/
    validateRequest(req, next, schema);
}