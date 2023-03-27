const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const photoRouter = require('./routes/photo');

const user = require('./model/user');
const app = express();

const hbs = require('hbs');


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
app.use(async (req, res, next) => {

  req.login = { loggedIn: false };

  if (req.body.username != undefined && req.body.password != undefined && req.body.action == 'login') {

    let auth = await user.passwordLogin(
      req.body.username,
      req.body.password);

    req.login = auth;

    // if logged in, set cookies
    if (req.login.loggedIn) {
      // store a cookie for the user_id
      res.cookie('uid', req.login.user.user_id, { maxAge: 1000 * 60 * 60 * 24 * 7 });
      // store a cookie for the cookie code
      res.cookie('ch', req.login.cookie, { maxAge: 1000 * 60 * 60 * 24 * 7 });
      // console.log('requested redirect' + req.body.redirect);
      if (req.body.redirect != undefined &&
        req.body.redirect != '' &&
        req.body.redirect != null
      ) {
        res.redirect(req.body.redirect);
      } else {
        res.redirect('/');
      }
    }
  }

  if (!req.cookies.uid != undefined && req.cookies.ch != undefined) {
    // if the uid and cookie code are set, try logging in with cookies
    let auth = await user.cookieLogin(req.cookies.uid, req.cookies.ch);
    req.login = auth;

    if (req.query.logout != undefined) {
      // clear cookies
      res.clearCookie('uid');
      res.clearCookie('ch');
      req.login = { loggedIn: false };
    }
  }

  next();
});
app.use('/photo/', photoRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books/', booksRouter);


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
