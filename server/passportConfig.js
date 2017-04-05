// const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

const appKey = process.env.APP_KEY;
const appSecret = process.env.APP_SECRET;
const session = require('express-session');

let access;

const signIn = new SpotifyStrategy({
  clientID: appKey,
  clientSecret: appSecret,
  callbackURL: 'http://localhost:8000/auth/callback',
}, (accessToken, refreshToken, profile, done) => {
    // asynchronous verification, for effect...
  access = accessToken;
  process.nextTick(() => {
    (done(null, profile));
  });
});


module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    passport.accessToken = access;
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use('signIn', signIn);
};
