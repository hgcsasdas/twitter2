const {Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
    image_id: {type: ObjectId },
    email: { type: String},
    name: { type: String},
    gravatar: {type: String},
    comment: {type: String},
    tymestamp: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', CommentSchema);