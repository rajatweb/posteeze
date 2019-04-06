const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controller');

router.get('/', getAll);
router.post('/add', addPost);
router.get('/:id', getById);
router.delete('/:id', removePost);

module.exports = router;

function getAll(req, res, next) {
    res.send('Ok');
}

function getById(req, res, next) {
    res.send('Ok');
}

function addPost(req, res, next) {
    res.send('Ok');
}

function updatePost() {
    res.send('Ok');
}

function removePost(req, res, next) {
    res.send('Ok');
}