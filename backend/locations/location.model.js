const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    onsite: Boolean,
    track: { type: String, required: false },
    project: { type: ObjectId, ref: "projects", required: false},
    addressLine1: { type: String, required: true },
    city: { type: String, required: true},
    state: { type: String, required: true},
    zipCode: { type: Number, required: false}
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (ret) {
        // remove these props when object is serialized
        delete ret._id;
    }
});

module.exports = mongoose.model('Location', schema);