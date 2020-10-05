const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    addressLine1: { type: String, required: false },
    addressLine2: { type: String, required: false },
    city: { type: String, required: false},
    state: { type: String, required: false},
    zipCode: Number,
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (ret) {
        // remove these props when object is serialized
        delete ret._id;
    }
});

module.exports = mongoose.model('locations', schema);