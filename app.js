const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const photoRouter = require('./routes/photo');
const app = express();

const hbs = require('hbs');

// const user = require('./model/user');
// user.addUser("bob", "bob@bob.com", "1234");

//register partials
hbs.registerPartials(__dirname + '/views/partials');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//middleware: no path ->
// run for every request that reaches this line
app.use((req, res, next) => {
  console.log("cookie user" + req.cookies.user);
  if (req.query.u != undefined) { // if there is a u parameter in the qs
    //record that username, create/store login object onto req
    req.login = {
      username: req.query.u.toLowerCase().trim(),
      auth: true
    };

  } else {
    req.login = {
      username: null,
      auth: false
    }
  }
  // res.send(req.login.username);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books/', booksRouter);
app.use('/photo/', photoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
