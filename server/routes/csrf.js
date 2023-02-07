const express = require('express');
const bodyParser = require('body-parser');
const csrf = require('csurf')
const cookieParser = require('cookie-parser')
const app = express();
const csrfProtection = csrf({ cookie: true });

app.use(cookieParser());
app.set('view engine', 'ejs');

app.get('/api/csrf', csrfProtection, (req, res) => {
  res.render('index', { csrfToken: req.csrfToken() });
});

app.post('/profile', csrfProtection, (req, res, next) => {
  res.send(req.body.name);
});