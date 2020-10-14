const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const locationService = require('./location.service');

// routes
router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(Role.Admin), createSchema, create);
router.put('/:id', authorize(Role.Admin), updateSchema);
router.delete('/:id', authorize());

module.exports = router;

function getAll(req, res, next) {
    locationService.getAll()
        .then(locations => res.json(locations))
        .catch(next);
}

function getById(req, res, next) {
    // 
    if (req.user.role !== Role.Admin) {
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
        state: Joi.string().required(),
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
        city: Joi.string().empty(''),
        state: Joi.string().empty(''),
        zipCode: Joi.number().empty('')
    };


function update(req, res, next) {
    // admins can update any project
    if (req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    locationService.update(req.params.id, req.body)
        .then(location => res.json(location))
        .catch(next);
}

function _delete(req, res, next) {
    //admins can delete any account
    if (req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    locationService.delete(req.params.id)
        .then(() => res.json({ message: 'Location deleted successfully' }))
        .catch(next);
    }

}