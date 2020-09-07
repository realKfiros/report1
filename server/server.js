const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const publicPath = path.join(__dirname, '..', 'public');

const replies = require('./routes/replies');

app.use(cors());
app.use(express.static(publicPath));
app.use(session({ 
  secret: "bullshit",
  resave: false
}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'username',
        passReqToCallback: false
    }, (username, password, done) => {
        return done(null, username);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    try {
        req.session.user = req.user;
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

let isAuthenticated = (req, res, next) => {
    if (req.user) {
      return res.status(200);
    } else {
      return res.status(401).json({
        error: 'User not authenticated'
      });
    }
};

app.get('/loggedIn', isAuthenticated, (req, res) => {
    res.status(200).json(req.user);
});

app.get('/user', (req, res) => {
    res.send(req.session.user);
});

app.post('/logout', (req, res) => {
    req.logOut();
    delete req.session.user;
    res.sendStatus(200);
});

app.use('/replies', replies);

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

require('./io/replies')(io);

http.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
});