const mongoose = require('mongoose');
const textSearch = require('mongoose-partial-full-search');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const { ObjectId } = require('mongodb');
const Schema = mongoose.Schema;

const schema = new Schema({
    visibility: { type: String, required: true},   //Creating classes for Notes
    title: { type: String, required: true },
    description: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: Date 
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
    }
});

//schema.plugin(textSearch);

schema.index({'$**': 'text'});

module.exports = mongoose.model('Notes', schema);