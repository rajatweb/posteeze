const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const validator = require('validator');

// End Point
router.get('/', getAll);
router.post('/register', register);
router.post('/authenticate', authenticate);
router.get('/me', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);


function getAll(req, res, next) {
    userCtrl.getAll()
        .then(users => res.send(users))
        .catch(err => next(err));
}

function register(req, res, next) {
    userCtrl.create(req.body)
        .then((user) => res.json({ user, message: 'user created successfully' }))
        .catch(err => res.status(500).json({ message: err }));
}

function authenticate(req, res, next) {
    userCtrl.authenticate(req.body)
        .then(user => res.json({ user, message: 'user logged in successfully' }))
        .catch(err => res.status(500).json({ message: err }));
}

function getCurrent(req, res, next) {
    userCtrl.getById(req.user.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userCtrl.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userCtrl.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userCtrl.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

module.exports = router;