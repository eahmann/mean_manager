const config = require('config.json');
const db = require('_helpers/db');
const Role = require('_helpers/role');


module.exports = {
    getAll,
    getById,
    create,
    update
};

async function getAll() {
    const projects = await db.Project.find();
    return projects.map(x => basicProject(x));
}

async function getById(id) {
    const project = await getProject(id);
    return basicProject(project);
}

async function create(params) {
    const project = new db.Project(params);
    project.created = Date.now();

    // save project
    await project.save();

    return basicProject(project);
}

async function update(id, params) {
    const project = await getProject(id);

    // copy params to project and save
    Object.assign(project, params);
    project.updated = Date.now();
    await project.save();

    return basicProject(project);
}


// helper functions
function basicProject(project) {
    const { id, title, description, active, customerId, locationId, startDate, endDate, created, updated } = project;
    return { id, title, description, active, customerId, locationId, startDate, endDate, created, updated };
}

async function getProject(id) {
    if (!db.isValidId(id)) throw 'Project not found';
    const project = await db.Project.findById(id);
    if (!project) throw 'Project not found';
    return project;
}