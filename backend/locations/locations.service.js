const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');


module.exports = {
    getAll,
};



async function getAll() {
    const projects = await db.Project.find();
    return projects.map(x => basicProject(x));
}

function basicProject(location) {
    const { addressLine1, addressLine2, city, state, zipCode, notes } = project;
    return { addressLine1, addressLine2, city, state, zipCode, notes };
}