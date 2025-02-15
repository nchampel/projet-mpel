const express = require('express');

const router = express.Router();

const User = require('../models/User');

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });


const userController = require('../controllers/user');

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/check', userController.checkAuth);

module.exports = router;