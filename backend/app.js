require('dotenv').config();
require('colors');

const express = require('express');
const cors = require('cors');

const connectdb = require('./config/database.js');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 4000;

// routers requires
const userRouter = require('./router/user.js');
const userPasswordRouter = require('./router/userPassword');
const mailRouter = require('./router/mail.js');

// routers
app.use('/api/users', userRouter);
app.use('/api/password', userPasswordRouter);
app.use('/api/mails', mailRouter);

app.use((req, res, next) => {
  res.status(200).json({ success: true, message: 'Page not found!' });
});

connectdb()
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Server is running at http://localhost:${PORT}`.underline.cyan
      )
    );
  })
  .catch((err) => console.log(err.message));
