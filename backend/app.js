require('dotenv').config();
require('colors');

const express = require('express');
const cors = require('cors');

const connectdb = require('./config/database.js');

const app = express();

app.use(
  cors({
    origin: ['https://react-skv-mail.netlify.app', 'http://localhost:5050'],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 4000;

// routers requires
const userRouter = require('./router/user.js');
const userPasswordRouter = require('./router/userPassword');
const mailRouter = require('./router/mail.js');
const CustomError = require('./utils/customError.js');
const errorMiddleware = require('./middleware/errorMiddleware.js');

// routers
app.use('/api/users', userRouter);
app.use('/api/password', userPasswordRouter);
app.use('/api/mails', mailRouter);

app.use((req, res, next) => {
  throw new CustomError(`Requested URL ${req.path} not found!`, 404);
});

// Global Error Handling
app.use(errorMiddleware);

connectdb()
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Server is running at http://localhost:${PORT}`.underline.cyan
      )
    );
  })
  .catch((err) => console.log(err.message));
