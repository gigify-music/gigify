// const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

const appKey = process.env.APP_KEY;
const appSecret = process.env.APP_SECRET;

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
