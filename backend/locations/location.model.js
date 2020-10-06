const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, required: true },
    city: { type: String, required: true},
    state: { type: String, required: true},
    zipCode: { type: Number, required: true}
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