const express = require('express');
const {
  resetForgotPassword,
  createNewPassword,
  PostCreateNewPassword,
} = require('../controller/userPassword');

const router = express.Router();

router.post('/forgot-password', resetForgotPassword);

router.get('/reset-password/:uuid', createNewPassword);

router.post('/reset-password/:uuid', PostCreateNewPassword);

module.exports = router;
