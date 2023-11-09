require('express-async-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const authRouter = require('./routes/authRoute');
const jobRouter = require('./routes/jobsRoute');
const authenticateUser = require('./middlewares/auth');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);

app.use(notFound);
app.use(errorHandler);


module.exports = app;
