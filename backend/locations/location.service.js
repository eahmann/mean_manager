const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');

module.exports = {
    getAll,
    getById,
    create,
    update: update,
    delete: _delete,
    getProjectsByLocation
};

async function getAll() {
    const location = await db.Location.find().populate('projects');
    return location.map(x => basicLocation(x));
}

async function getById(id) {
    const location = await getLocation(id);
    return basicLocation(location);
}

async function create(params) {
    const location = new db.Location(params);
    location.created = Date.now();

    await location.save();

    return basicLocation(location);
}

async function update(id, params) {
    const location = await getLocation(id);

    Object.assign(location, params);
    location.updated = Date.now();
    await location.save();

    return basicLocation(location);
}
async function getProjectsByLocation(id) {
    const location = await getLocationProjects(id);
    return { location: { id: location.id, address: location.addressLine1 + " " + location.city + " " + location.zipCode }, projects: location.projects }
}

async function _delete(id) {
    const location = await getLocation(id);
    await location.remove();
}

async function getLocationProjects(id) {
    if (!db.isValidId(id)) throw 'Project not found';
    const location = await db.Location.findById(id).populate('projects');
    if (!location) throw 'Project not found';
    console.log(location)
    return location;
}

function basicLocation(location) {
    const { id, onsite, track, project, addressLine1, city, state, zipCode } = location;
    return { id, onsite, track, project, addressLine1, city, state, zipCode };
}

async function getLocation(id) {
    if (!db.isValidId(id)) throw 'Location not found';
    const location = await db.Location.findById(id);
    if (!location) throw 'Location not found';
    return location;
}