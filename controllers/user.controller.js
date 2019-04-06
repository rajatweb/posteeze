const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
}

async function authenticate(userData) {
    const user = await User.findOne({ username: userData.username }, { _id: 1, username: 1, email: 1, password: 1 });

    if (user !== null && bcrypt.compareSync(userData.password, user.password)) {
        const token = jwt.sign({ user: user }, '123abc', { expiresIn: "1h" });
        const refreshToken = jwt.sign({ user: user }, '123abc', { expiresIn: "2h" });

        const response = {
            user: user,
            token: token,
            refreshToken: refreshToken
        };

        return response;
    } else {
        throw 'Username & Password Incorrect';
    }
}

async function getAll() {
    return await User.find({});
}

async function getById(id) {
    if (ObjectId.isValid(id))
        return await User.findById(id)
    else
        throw 'user id is not valid!'
}

async function create(userParam) {
    if (userParam.username.length < 3) {
        throw 'Username must be 3 charater long!'
    }
    if (await User.findOne({
        $or: [
            { username: userParam.username },
            { email: userParam.email }
        ]
    })) {
        throw 'Username or Email already taken!'
    }

    const user = new User(userParam);
    await user.save();

    return user._id;
}

async function update(id, userParam) {
    const user = User.findById(id);

    if (!ObjectId.isValid(id)) throw 'user id is not valid';
    if (!user) throw 'User not found';

}
async function _delete(id) {
    await User.findOneAndDelete({ _id: id });
}