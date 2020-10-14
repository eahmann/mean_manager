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
    delete: _delete
};

async function getAll() {
const location = await db.Location.find();
    return location.map(x => basicLocation(x));
}

async function getById(id) {
    const location = await getLocation(id);
    return basicLocation(location);
}

async function create(params) {
    const location = new db.Location(params);
    location.created = Date.now();
    // save project
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

async function _delete(id) {
    const location = await getLocation(id);
    await location.remove();
}

function basicLocation(location) {
    const { addressLine1, addressLine2, city, state, zipCode } = location;
    return { addressLine1, addressLine2, city, state, zipCode};
}

async function getLocation(id) {
    if (!db.isValidId(id)) throw 'Location not found';
    const location = await db.Location.findById(id);
    if (!location) throw 'Location not found';
    return location;
}