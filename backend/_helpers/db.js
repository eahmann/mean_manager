const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    Account: require('accounts/account.model'),
    RefreshToken: require('accounts/refresh-token.model'),
    isValidId,
    Project: require('projects/project.model'),
    Note: require('notes/note.model'),
    Location: require('locations/location.model'),
    WorkSegment: require('work_segments/work_segment.model')
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}