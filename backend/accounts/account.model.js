const mongoose = require('mongoose');
const textSearch = require('mongoose-partial-full-search');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const { ObjectId } = require('mongodb');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true },
    projects: [ { type: ObjectId, ref: "Project"} ],
    verificationToken: String,
    verified: Date,
    resetToken: {
        token: String,
        expires: Date
    },
    passwordReset: Date,
    created: { type: Date, default: Date.now },
    updated: Date
});

schema.virtual('isVerified').get(function () {
    return !!(this.verified || this.passwordReset);
});

schema.virtual('fullName').get(function () {
    return (this.firstName + ' ' + this.lastName);
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});

//schema.plugin(textSearch);

schema.index({'$**': 'text'});
schema.plugin(mongoose_fuzzy_searching , { fields: ['email', 'firstName', 'lastName']})

module.exports = mongoose.model('Account', schema);