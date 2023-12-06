const InboxMail = require('../model/InboxMail');
const Mail = require('../model/Mail');
const User = require('../model/User');

exports.sendMail = async (req, res, next) => {
  // console.log(req.body);
  try {
    const receiver = await User.findOne({ email: req.body.to });

    if (!receiver)
      return res.status(404).json({
        success: false,
        message: 'Receiver email does not exist!',
      });

    receiver.unreadMailCount += 1;

    const mail = new Mail({
      ...req.body,
      from: req.user.email,
    });

    const inboxMail = new InboxMail({
      ...req.body,
      from: req.user.email,
    });

    await Promise.all([mail.save(), inboxMail.save(), receiver.save()]);

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
      case 'inbox':
        allMails = await InboxMail.find({
          to: req.user.email,
        }).sort({ date: -1 });
        break;

      case 'sent':
        allMails = await Mail.find({
          from: req.user.email,
        }).sort({ date: -1 });
        break;

      case 'starred':
        const mails = await Mail.find({
          from: req.user.email,
          starred: true,
        });

        const inboxMails = await InboxMail.find({
          to: req.user.email,
          starred: true,
        });

        let newSentMails = mails.map(({ _doc }) => ({
          ..._doc,
          type: 'sent',
        }));

        let newInboxMails = inboxMails.map(({ _doc }) => ({
          ..._doc,
          type: 'inbox',
        }));

        allMails = [...newSentMails, ...newInboxMails].sort(
          (a, b) => b.date - a.date
        );
        break;

      case 'all':
        const allSent = await Mail.find({
          from: req.user.email,
        });

        const allInboxMails = await InboxMail.find({
          to: req.user.email,
        });

        const newAllSentMails = allSent.map(({ _doc }) => ({
          ..._doc,
          type: 'sent',
        }));

        const newAllInboxMails = allInboxMails.map(({ _doc }) => ({
          ..._doc,
          type: 'inbox',
        }));

        allMails = [...newAllSentMails, ...newAllInboxMails].sort(
          (a, b) => b.date - a.date
        );
        break;

      default:
        break;
    }

    return res
      .status(200)
      .json({ success: true, allMails, unreadMails: req.user.unreadMailCount });
  } catch (error) {
    console.log(error);
  }
};

exports.getSingleMail = async (req, res, next) => {
  try {
    let mail;

    if (req.params.type === 'sent') {
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
    } else {
      mail = await Mail.findOne({ _id: req.params.id });

      if (!mail) mail = await InboxMail.findOne({ _id: req.params.id });

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
    if (req.params.type === 'sent') {
      await Mail.updateOne({ _id: req.params.id }, { $set: req.body });
    } else if (req.params.type === 'inbox') {
      await InboxMail.updateOne({ _id: req.params.id }, { $set: req.body });

      if (req.user.unreadMailCount > 0)
        await User.updateOne(
          { _id: req.user._id },
          { unreadMailCount: req.user.unreadMailCount - 1 }
        );
    } else {
      let mail = await Mail.findOne({ _id: req.params.id });

      if (mail)
        await Mail.updateOne({ _id: req.params.id }, { $set: req.body });
      else
        await InboxMail.updateOne({ _id: req.params.id }, { $set: req.body });
    }

    res
      .status(200)
      .json({ success: true, message: 'mail updated successfully!' });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteMail = async (req, res, next) => {
  try {
    if (req.params.type === 'sent') {
      await Mail.deleteOne({ _id: req.params.id });
    } else if (req.params.type === 'inbox') {
      await InboxMail.findOneAndDelete({ _id: req.params.id });
    }

    res
      .status(200)
      .json({ success: true, message: 'mail deleted successfully!' });
  } catch (error) {
    console.log(error);
  }
};
