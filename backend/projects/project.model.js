const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  //  projectCode: { type: String, required: true  },
    title: { type: String, required: true },
    description: { type: String, required: false },
    active: Boolean,
    customerId: { type: ObjectId, required: false},
    locationId: { type: ObjectId, required: false},
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