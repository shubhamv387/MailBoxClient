const asyncErrorHandler = require('../utils/asyncErrorHandler');
const InboxMail = require('../model/InboxMail');
const Mail = require('../model/Mail');
const User = require('../model/User');
const CustomError = require('../utils/customError');

exports.sendMail = asyncErrorHandler(async (req, res, next) => {
  const receiver = await User.findOne({ email: req.body.to });
  if (!receiver) throw new CustomError('Receiver email does not exist!', 404);
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
});

exports.getMails = asyncErrorHandler(async (req, res, next) => {
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
});

exports.getSingleMail = asyncErrorHandler(async (req, res, next) => {
  let mail;

  if (req.params.type === 'sent') {
    mail = await Mail.findOne({ _id: req.params.id });

    if (!mail) throw new CustomError('Bad Request!', 400);
  } else if (req.params.type === 'inbox') {
    mail = await InboxMail.findOne({ _id: req.params.id });

    if (!mail) throw new CustomError('Bad Request!', 400);
  } else {
    mail = await Mail.findOne({ _id: req.params.id });

    if (!mail) mail = await InboxMail.findOne({ _id: req.params.id });

    if (!mail) throw new CustomError('Bad Request!', 400);
  }

  res.status(200).json({ success: true, mail });
});

exports.updateMail = asyncErrorHandler(async (req, res, next) => {
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

    if (mail) await Mail.updateOne({ _id: req.params.id }, { $set: req.body });
    else await InboxMail.updateOne({ _id: req.params.id }, { $set: req.body });
  }

  res
    .status(200)
    .json({ success: true, message: 'mail updated successfully!' });
});

exports.deleteMail = asyncErrorHandler(async (req, res, next) => {
  if (req.params.type === 'sent') {
    await Mail.deleteOne({ _id: req.params.id });
  } else if (req.params.type === 'inbox') {
    await InboxMail.findOneAndDelete({ _id: req.params.id });
  }

  res
    .status(200)
    .json({ success: true, message: 'mail deleted successfully!' });
});
