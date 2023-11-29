const InboxMail = require('../model/InboxMail');
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
    });

    const inboxMail = new InboxMail({
      ...req.body,
      from: req.user.email,
    });

    await Promise.all([mail.save(), inboxMail.save()]);

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
        const mail = await Mail.find({
          from: req.user.email,
        });

        const inboxMail = await InboxMail.find({
          to: req.user.email,
        });

        allMails = [...mail, ...inboxMail].sort((a, b) => b.date - a.date);

        break;

      case 'inbox':
        allMails = await InboxMail.find({
          to: req.user.email,
        }).sort({ date: -1 });
        break;

      case 'outbox':
        allMails = await Mail.find({
          from: req.user.email,
        }).sort({ date: -1 });
        break;

      default:
        break;
    }

    const unreadMails = await InboxMail.countDocuments({
      to: req.user.email,
      isRead: false,
    });
    // console.log(unreadMails);

    return res.status(200).json({ success: true, allMails, unreadMails });
  } catch (error) {
    console.log(error);
  }
};

exports.getSingleMail = async (req, res, next) => {
  try {
    let mail;

    if (req.params.type === 'outbox') {
      mail = await Mail.findOne({ _id: req.params.id });

      if (!mail)
        return res
          .status(400)
          .json({ success: false, message: 'Bad Request!' });
    } else if (req.params.type === 'inbox') {
      mail = await InboxMail.findOne({ _id: req.params.id });

      if (!mail)
        return res
          .status(400)
          .json({ success: false, message: 'Bad Request!' });
    }

    res.status(200).json({ success: true, mail });
  } catch (error) {
    console.log(error);
  }
};

exports.updateMail = async (req, res, next) => {
  // console.log(req.body, req.params);
  try {
    let updatedMail;
    if (req.params.type === 'outbox') {
      updatedMail = await Mail.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
    } else if (req.params.type === 'inbox') {
      updatedMail = await InboxMail.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
    }

    if (!updatedMail.modifiedCount)
      return res.status(404).json({ success: false, message: 'failed!' });

    res
      .status(200)
      .json({ success: true, message: 'mail updated successfully!' });
  } catch (error) {
    console.log(error);
  }
};
