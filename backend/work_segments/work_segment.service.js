const config = require('config.json');
const db = require('_helpers/db');
const Role = require('_helpers/role');


module.exports = {
    getAll,
    getById,
    getAllByProjectId,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const segments = await db.WorkSegment.find();
    return segments.map(x => basicSegment(x));
}

async function getById(id, req) {
    const segment = await getSegment(id);
    // Only the employee that created the segment and Admins can get by id
    if (segment.employee !== req.user.id && req.user.role !== Role.Admin) throw new Error('Unauthorized');
    return basicSegment(segment);
}

async function getAllByProjectId(req) {
    const segments = await db.WorkSegment.find({ 'project': req.params.id });
    return segments.map(x => basicSegment(x));
}

async function create(params) {
    const segment = new db.WorkSegment(params);
    segment.created = Date.now();
    await segment.save();
    return basicSegment(segment);
}

async function update(req, params) {
    const segment = await getSegment(req.params.id);

    // Only the employee that created the segment and Admins can update
    if (segment.employee !== req.user.id && req.user.role !== Role.Admin) throw new Error('Unauthorized');

    // copy params to segment and save
    Object.assign(segment, params);
    segment.updated = Date.now();
    await segment.save();
    return basicSegment(segment);
}

async function _delete(req) {
    const segment = await getSegment(req.params.id);
    // Only the employee that created the segment and Admins can delete
    if (segment.employee !== req.user.id && req.user.role !== Role.Admin) throw new Error('Unauthorized');
    await segment.remove();
}


// helper functions
function basicSegment(segment) {
    const { id, date, description, hours, employee, project, created, updated } = segment;
    return { id, date, description, hours, employee, project, created, updated };
}

async function getSegment(id) {
    if (!db.isValidId(id)) throw 'Work segment not found';
    const segment = await db.WorkSegment.findById(id);
    if (!segment) throw 'Work segment not found';
    return segment;
}
