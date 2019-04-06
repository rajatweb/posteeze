const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const timestamps = require('mongoose-timestamp');
const validator = require('validator');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value)
            },
            message: '{VALUE} is not valid email!'
        }
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();

    return {
        _id: userObject._id,
        username: userObject.username,
        email: userObject.email,
        updatedAt: userObject.updatedAt,
        createdAt: userObject.createdAt,
    };
}

UserSchema.pre('save', function (next) {
    let user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.plugin(timestamps);
mongoose.set('useCreateIndex', true);
module.exports = mongoose.model('User', UserSchema);