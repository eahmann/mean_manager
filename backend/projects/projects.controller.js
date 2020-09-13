const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const projectService = require('./project.service');

// routes
router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(Role.Admin), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);

module.exports = router;

function getAll(req, res, next) {
    projectService.getAll()
        .then(projects => res.json(projects))
        .catch(next);
}

function getById(req, res, next) {
    // users can get their own project and admins can get any project
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    projectService.getById(req.params.id)
        .then(project => project ? res.json(project) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        active: Joi.boolean().required(),
        customerId: Joi.string().required(),
        locationId: Joi.string().required(),
        startDate: Joi.date(),
        endDate: Joi.date(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    projectService.create(req.body)
        .then(project => res.json(project))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schemaRules = {
        title: Joi.string().empty(''),
        description: Joi.string().empty(''),
        active: Joi.boolean().empty(''),
        customerId: Joi.string().empty(''),
        locationId: Joi.string().empty(''),
        startDate: Joi.date().empty(''),
        endDate: Joi.date().empty('')
    };

    const schema = Joi.object(schemaRules)
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    // users can update their own project and admins can update any project
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    projectService.update(req.params.id, req.body)
        .then(project => res.json(project))
        .catch(next);
}