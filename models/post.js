const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timestamps = require('mongoose-timestamp');
const validator = require('validator');

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    },
    post: {
        type: String
    }
});

module.exports = new mongoose.model('Post', PostSchema);