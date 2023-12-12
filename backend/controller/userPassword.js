const Brevo = require('sib-api-v3-sdk');
const ForgotPasswordRequest = require('../model/ForgotPasswordRequests');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const mongoose = require('mongoose');

// @desc    Sending password reset mail to User
// @route   POST /api/password/forgot-password
// @access  Public
exports.resetForgotPassword = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: 'email does not Exists!' });

    const uuid = uuidv4();
    const FPR = new ForgotPasswordRequest({
      isActive: true,
      userId: user._id,
      uuid,
    });

    await FPR.save({ session });

    const defaultClient = await Brevo.ApiClient.instance;

    // Configure API key authorization: api-key
    const apiKey = defaultClient.authentications['api-key'];
    const transEmailApi = new Brevo.TransactionalEmailsApi();

    await Promise.all([apiKey, transEmailApi]);

    apiKey.apiKey = process.env.BREVO_API_KEY;

    const path = `https://react-skv-mail.netlify.app/reset-password/${uuid}`;
    // const path = `https://skv-expense-app.onrender.com/password/reset-password/${uuid}`;

    const sender = {
      email: 'shubhamv387@gmail.com',
      name: 'Shubhamv K',
    };
    const receivers = [req.body];

    await transEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: 'reset password mail',
      textContent: 'Click here to reset your password',
      htmlContent: `<a href="${path}">Click Here</a> to reset your password!`,
    });

    res
      .status(200)
      .json({ success: true, message: 'email sent successfully!' });
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    res.status(500).json({ success: false, message: 'request unsuccessful!' });
  } finally {
    await session.endSession();
  }
};

// @desc    Reset Password link check
// @route   GET /api/password/reset-password/:uuid
// @access  Private
exports.createNewPassword = async (req, res, next) => {
  try {
    const FPR = await ForgotPasswordRequest.findOne({ uuid: req.params.uuid });
    if (!FPR)
      return res.status(400).json({ success: false, message: 'invalid link' });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: 'Something went wrong!' });
  }
};

// @desc    Reset New Password
// @route   POST /api/password/reset-password/:uuid
// @access  Private
exports.PostCreateNewPassword = async (req, res, next) => {
  const { pass, confirmPass } = req.body;
  const session = await mongoose.startSession();

  if (pass !== confirmPass)
    return res
      .status(400)
      .send({ success: false, message: 'MisMatched Passwords!' });

  try {
    session.startTransaction();

    const FPR = await ForgotPasswordRequest.findOne({ id: req.params.id });

    if (!FPR)
      return res.status(400).json({ success: false, message: 'invalid link' });

    if (!FPR.isActive) {
      return res.status(400).send({
        success: false,
        message: 'Link expired, Request a new link!',
      });
    }

    FPR.isActive = false;

    const hashedPassword = bcrypt.hashSync(pass, bcrypt.genSaltSync(10));

    const updatedUser = User.updateOne(
      { _id: FPR.userId },
      { $set: { password: hashedPassword } },
      { session }
    );

    // updating user and FPR parallelly using Promise.all
    await Promise.all([FPR.save({ session }), updatedUser]);

    // throw new Error("custom error");

    await session.commitTransaction();
    res
      .status(200)
      .send({ success: true, message: 'Password Updated Successfully' });
  } catch (error) {
    await session.abortTransaction();
    console.log(error.message.underline.red);
  } finally {
    await session.endSession();
  }
};
