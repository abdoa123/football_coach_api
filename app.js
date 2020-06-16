var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var historyRouter = require('./routes/History')
var scoreRouter = require('./routes/score/score')

var registerRouter = require('./routes/Authenticate/register');
var loginRouter= require('./routes/Authenticate/login');
var logoutRouter= require('./routes/Authenticate/logout');
var personalRouter= require('./routes/Personal/info');
var uploadRouter= require('./routes/Upload/photo');
var rankingRouter= require('./routes/Rankings/ranking');

var app = express();


var server = app.listen(process.env.PORT||8080, function() {
  console.log('Ready on port %d', server.address().port);
});

app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/authenticate', registerRouter);
app.use('/authenticate', loginRouter);
app.use('/authenticate', logoutRouter);
app.use('/history', historyRouter);
app.use('/score',scoreRouter);
app.use('/personal', personalRouter);
app.use('/upload', uploadRouter);
app.use('/ranking', rankingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.json({ error: "err" })

});

module.exports = app;
