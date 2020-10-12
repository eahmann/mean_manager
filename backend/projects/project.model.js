const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    active: Boolean,
    customer: { type: ObjectId, ref: "Account", required: false},
    location: { type: ObjectId, ref: "Location", required: false},
    startDate: Date,
    endDate: Date,
    created: { type: Date, default: Date.now },
    updated: Date
});


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (ret) {
        // remove these props when object is serialized
        delete ret._id;
    }
});

module.exports = mongoose.model('Project', schema);