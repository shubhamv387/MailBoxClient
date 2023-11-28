const Mail = require('../model/Mail');

exports.sendMail = async (req, res, next) => {
  try {
    const mail = new Mail({
      to: req.body.to,
      from: req.user.email,
      subject: req.body.subject,
      message: req.body.message,
      type: req.body.type,
      userId: req.user._id,
    });

    await mail.save();

    res.status(201).json({ success: true, mail });
  } catch (error) {
    console.log(error);
  }
};

exports.getMails = async (req, res, next) => {
  try {
    const allMails = await Mail.find({ userId: req.user._id });

    res.status(200).json({ success: true, allMails });
  } catch (error) {
    console.log(error);
  }
};

exports.updateMail = async (req, res, next) => {
  console.log(req.params._id);
  try {
    //
  } catch (error) {
    console.log(error);
  }
};
