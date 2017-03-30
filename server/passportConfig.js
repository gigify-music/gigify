// const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

const appKey = '23731471249b4d0f95d701fab0dd6dd6';
const appSecret = 'd6f8c8793eb14efab63c184e31762dd9';

const signIn = new SpotifyStrategy({
  clientID: appKey,
  clientSecret: appSecret,
  callbackURL: 'http://localhost:8000/auth/callback',
}, (accessToken, refreshToken, profile, done) => {
    // asynchronous verification, for effect...
  process.nextTick(() => {
    console.log('profile :', profile);
    (done(null, profile));
  });
});


module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use('signIn', signIn);
};
