const express = require('express');
const { authUser } = require('../middleware/authUser');
const { sendMail, getMails, updateMail } = require('../controller/mail');
const router = express.Router();

router.get('/', authUser, getMails);

router.post('/', authUser, sendMail);

router.put('/:id', authUser, updateMail);

module.exports = router;
