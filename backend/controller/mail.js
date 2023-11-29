const Mail = require('../model/Mail');
const User = require('../model/User');

exports.sendMail = async (req, res, next) => {
  try {
    const receiver = await User.findOne({ email: req.body.to });

    if (!receiver)
      return res.status(404).json({
        success: false,
        message: 'Receiver email does not exist!',
      });

    const mail = new Mail({
      ...req.body,
      from: req.user.email,
      senderId: req.user._id,
      receiverId: receiver._id,
    });

    await mail.save();

    res.status(201).json({ success: true, mail });
  } catch (error) {
    console.log(error);
  }
};

exports.getMails = async (req, res, next) => {
  // console.log(req.params.type);

  try {
    let allMails = [];

    switch (req.params.type) {
      case 'all':
        allMails = await Mail.find({ senderId: req.user._id });
        break;

      case 'inbox':
        allMails = await Mail.find({
          to: req.user.email,
        });
        break;

      case 'outbox':
        allMails = await Mail.find({
          from: req.user.email,
        });
        break;

      default:
        break;
    }

    return res.status(200).json({ success: true, allMails });
  } catch (error) {
    console.log(error);
  }
};

exports.updateMail = async (req, res, next) => {
  try {
    let updatedMail = await Mail.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (!updatedMail.modifiedCount)
      return res.status(404).json({ success: false, message: 'failed!' });

    res
      .status(200)
      .json({ success: true, message: 'mail updated successfully!' });
  } catch (error) {
    console.log(error);
  }
};
