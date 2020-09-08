const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const dev = app.get('env') !== 'production';

if (!dev) {
    app.disable('x-powered-by');
    app.use(express.static(path.resolve(__dirname, 'build')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

if (dev) {
    require('dotenv').config();
}

const { User } = require('./server/models/user');

const replies = require('./server/routes/replies');

app.use(cors());
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
        User.findOne({ key: username }, (err, res) => {
            if (err) {
                return done(err);
            } else {
                return done(null, res);
            }
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, res) => {
        if (err) {
            done(err);
        } else {
            done(null, res)
        }
    });
});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
    try {
        session.user = req.user;
        res.status(200).send(req.user);
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

app.get('/api/loggedIn', isAuthenticated, (req, res) => {
    res.status(200).json(req.user);
});

app.get('/api/user', (req, res) => {
    res.send(session.user);
});

app.post('/api/logout', (req, res) => {
    req.logOut();
    delete session.user;
    res.sendStatus(200);
});

app.use('/api/replies', replies);

require('./server/io/replies')(io);

http.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
});