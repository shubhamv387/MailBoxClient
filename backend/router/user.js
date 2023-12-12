const express = require('express');
const { authUser } = require('../middleware/authUser');
const { register, login, validateToken } = require('../controller/user');

const router = express.Router();

router.get('/validate-token', authUser, validateToken);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
