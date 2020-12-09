const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Schema = mongoose.Schema;

const schema = new Schema({
    visibility: { type: String, required: true},
    account: { type: ObjectId, ref: "Account", required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    noteBody: {type: String, require: true },
    created: { type: Date, default: Date.now },
    updated: Date 
});

schema.set('toJSON', {
    virtual: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
    }
});

schema.index({'$**': 'text'});

module.exports = mongoose.model('Notes', schema);