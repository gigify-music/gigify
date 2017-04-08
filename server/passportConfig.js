const SpotifyStrategy = require('passport-spotify').Strategy;

const appKey = process.env.APP_KEY;
const appSecret = process.env.APP_SECRET;
const session = require('express-session');
const { spotifyApi } = require('./controller');
const pool = require('./database');

const signIn = new SpotifyStrategy({
  clientID: appKey,
  clientSecret: appSecret,
  callbackURL: 'http://localhost:8000/auth/callback',
}, (accessToken, refreshToken, profile, done) => {
    // asynchronous verification, for effect...
    // ADD USERS TO DATABASE VIA THE PROFILE OBJECT RECIEVED IN THIS FUNCTION
 pool.connect()
  .then((client) => {
    client.query('INSERT into users (spotify_id, display_name, email) VALUES ($1, $2, $3)', [profile.id, profile.displayName, profile._json.email])
.then(() => {
  client.release();
  })
.catch((err) => {
  console.error('User Insertion Error: ', err.detail);
});
})
.catch((err)=>{
  console.error('Pool Error: ', err);
})
    spotifyApi.setAccessToken(accessToken);
    process.nextTick(() => {
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
