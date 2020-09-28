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

function basicProject(account) {
    const { id, title, description, active, customerId, locationId, startDate, endDate, created, updated } = project;
    return { id, title, description, active, customerId, locationId, startDate, endDate, created, updated };
}