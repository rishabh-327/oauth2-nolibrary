const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const config = require('config');

const session = require('./middlewares/session');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: config.get('client_url'),
  credentials: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session);

app.use('/', indexRouter);
app.use('/auth', authRouter);

module.exports = app;
