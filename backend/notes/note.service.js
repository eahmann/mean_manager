const config = require('config.json');
const db = require('_helpers/db');
const Role = require('_helpers/role');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const notes = await db.Note.find();
    return notes.map(x => basicNote(x));
}

async function getById(id) {
    const note = await getNote(id);
    return basicNote(note);
}

async function create(params) {
    const note = new db.Note(params);
    note.created = Date.now();

    // save note
    await note.save();

    return basicNote(note);
}

async function update(id, params) {
    const note = await getNote(id);

    // copy params to note and save
    Object.assign(note, params);
    note.updated = Date.now();
    await note.save();

    return basicNote(note);
}

async function _delete(id) {
    const note = await getNote(id);
    await note.remove();
}


// helper functions
function basicNote(note) {
    const { id, visibility, account, title, description, created, updated } = note;
    return { id, visibility, account, title, description, created, updated };
}

async function getNote(id) {
    if (!db.isValidId(id)) throw 'Note not found';
    const note = await db.Note.findById(id);
    if (!note) throw 'Note not found';
    return note;
}