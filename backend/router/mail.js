const express = require('express');
const { authUser } = require('../middleware/authUser');
const {
  sendMail,
  getMails,
  getSingleMail,
  updateMail,
} = require('../controller/mail');
const router = express.Router();

router.get('/:type', authUser, getMails);

router.post('/', authUser, sendMail);

router.get('/:type/:id', authUser, getSingleMail);

router.put('/:type/:id', authUser, updateMail);

module.exports = router;
