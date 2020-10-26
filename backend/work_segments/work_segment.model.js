const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    date: { type: Date, required: false },
    description: { type: String, required: true },
    hours: { type: Number, required: true },
    employee: { type: ObjectId, ref:"Account", required: true},
    project: { type: ObjectId, ref:"Project", required: true},
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

module.exports = mongoose.model('WorkSegment', schema);