const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const noteService = require('./note.service');

// routes
router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(Role.Admin), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    noteService.getAll()
        .then(notes => res.json(notes))
        .catch(next);
}

function getById(req, res, next) {
    // users can get their own note and admins can get any note
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    noteService.getById(req.params.id)
        .then(note => note ? res.json(note) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        visibility: Joi.string().required(),
        noteBody: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    noteService.create(req)
        .then(note => res.json(note))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schemaRules = {
        title: Joi.string().empty(''),
        description: Joi.string().empty(''),
        visibility: Joi.string().empty(''),
    };

    const schema = Joi.object(schemaRules)
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    // users can update their own note and admins can update any note
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    noteService.update(req.params.id, req.body)
        .then(note => res.json(note))
        .catch(next);
}

function _delete(req, res, next) {
    // users can delete their own account and admins can delete any account
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    noteService.delete(req.params.id)
        .then(() => res.json({ message: 'Note deleted successfully' }))
        .catch(next);
}
