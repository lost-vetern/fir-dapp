var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session'),
    user = require('./user'),
    axios = require('axios'),
    localStrategy = require('passport-local');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'topsecreat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

mongoose.connect('mongodb://localhost:27017/fir');

app.use(express.static('/public'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/../public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/fail', (req, res) => {
    res.json({ msg: ':(' });
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    user.register(new user({
        username: req.body.username
    }), req.body.password, function(err, user) {
        if (err) res.json({ msg: err });
        res.render('signin');
    });
});

app.get('/signin', (req, res) => {
    res.render('signin');
});

app.post('/signin', passport.authenticate('local'), (req, res) => {
    console.log('i am here');
    res.render('addfir');
});


function auth(req, res, next) {
    if (req.isAuthenticated()) { next(); } else res.redirect('/fail');
}


////chain routes
require('./chainRoutes')(app, auth);

app.listen(3001, () => {
    console.log('Server is up!');
});