const express = require('express');
const router = express.Router();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const workSegmentService = require('./work_segment.service');

// routes
router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);
router.get('/project/:id', authorize(), getAllByProjectId);
router.post('/', authorize(Role.Admin), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    workSegmentService.getAll()
        .then(segments => res.json(segments))
        .catch(next);
}

function getById(req, res, next) {
    workSegmentService.getById(req.params.id, req)
        .then(segment => segment ? res.json(segment) : res.sendStatus(404))
        .catch(next);
}

function getAllByProjectId(req, res, next) {
    workSegmentService.getAllByProjectId(req)
    .then(segments => res.json(segments))
    .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        date: Joi.date(),
        description: Joi.string(),
        hours: Joi.number(),
        employee: Joi.objectId(),
        project: Joi.objectId(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    workSegmentService.create(req.body)
        .then(project => res.json(project))
        .catch(next);
}

function updateSchema(req, res, next) {
    // Note: Employee is missing here so we don't allow segments to be reassigned to a new employee
    const schemaRules = {
        date: Joi.date().empty(''),
        description: Joi.string().empty(''),
        hours: Joi.number().empty(''),
        project: Joi.objectId().empty(''),
    };

    const schema = Joi.object(schemaRules)
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    workSegmentService.update(req, req.body)
        .then(segment => res.json(segment))
        .catch(err => res.status(500).send({
            message:
            err.message || "An error occurred while updating work segment"
        }))
        .catch(next);
}

function _delete(req, res, next) {
    // Admins can delete any segment
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    workSegmentService.delete(req)
        .then(() => res.json({ message: 'Work segment deleted successfully' }))
        .catch(next);
}
