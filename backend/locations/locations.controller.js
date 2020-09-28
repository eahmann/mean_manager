const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const locationService = require('./account.location');

// routes
router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(Role.Admin), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);

function getAll(req, res, next) {
    locationService.getAll()
        .then(accounts => res.json(accounts))
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

function updateSchema(req, res, next) {
    const schemaRules = {
        addressLine1: Joi.string().empty(''),
        addressLine2: Joi.string().empty(''),
        city: Joi.string().email().empty(''),
        state: Joi.string().min(2).empty(''),
        zipCode: Joi.number().valid(),
        notes: Joi.objectId().valid()
    };

    // only admins can update role
    if (req.user.role === Role.Admin) {
        schemaRules.role = Joi.string().valid(Role.Admin, Role.User).empty('');
    }

    const schema = Joi.object(schemaRules).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string().required(),
        city: Joi.string().email().required(),
        state: Joi.string().min(6).required(),
        zipCode: Joi.number().required(),
        notes: Joi.objectId().valid()
    });
    validateRequest(req, next, schema);
}