const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const locationService = require('./locations.service');

// routes
router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(Role.Admin), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    locationService.getAll()
        .then(locations => res.json(locations))
        .catch(next);
}

function getById(req, res, next) {
    // users can get their own account and admins can get any account
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    locationService.getById(req.params.id)
        .then(location => location ? res.json(location) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().min(2).required(),
        zipCode: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    locationService.create(req.body)
        .then(location => res.json(location))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schemaRules = {
        addressLine1: Joi.string().empty(''),
        addressLine2: Joi.string().empty(''),
        city: Joi.string().email().empty(''),
        state: Joi.string().min(2).empty(''),
        zipCode: Joi.number().valid(),
    };

    // only admins can update role
    if (req.user.role === Role.Admin) {
        schemaRules.role = Joi.string().valid(Role.Admin, Role.User).empty('');
    }

    const schema = Joi.object(schemaRules).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    // users can update their own project and admins can update any project
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    locationService.update(req.params.id, req.body)
        .then(location => res.json(location))
        .catch(next);
}
