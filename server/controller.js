const passport = require('passport');
const axios = require('axios');
const moment = require('moment');
const session = require('express-session');
const SpotifyWebApi = require('spotify-web-api-node');
const pool = require('./database');
require('dotenv').config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.APP_KEY,
  clientSecret: process.env.APP_SECRET,
  redirectUri: 'http://localhost:8000/auth/callback',
});

const getArtistIDList = artistList => artistList.map(artist => spotifyApi.searchArtists(artist)
      .then(response =>
        // ADD THIS ARTIST IN DATABSE BY ADDING THE ASSOCIATED ARTIST NAME IN ARTISTNAMES
        // ADD TO DB [artist, response.body.artists.items[0].id]
        // console.log(response.body.artists.items[0].name, response.body.artists.items[0].id);
        // pool.connect()
        //   .then((client) => {
        //     client.query('INSERT into artists (spotify_id, artist_name) VALUES ($1, $2)', [response.body.artists.items[0].id, artist])
        //       .then((res) => {
        //         client.release();
        //       })
        //       .catch((err) => {
        //         console.error('error running query', err);
        //       });
        //   })
        //   .catch((err) => {
        //     console.error('error fetching client from pool', err);
        //   });
        return response.body.artists.items[0].id;
      })

      .catch(err => console.error(err)));
const getTopTracks = artistIDList => artistIDList.map(artist => spotifyApi.getArtistTopTracks(artist, 'US')
      .then((data) => {
        const tracks = data.body.tracks;
        const tracklist = {};
        tracklist[artist] = [];
        tracks.forEach(((track) => {
          tracklist[artist].push(`spotify:track:${track.id}`);
        }));
        // console.log('THE TRACKLIST: ', tracklist);
        return tracklist;
      })
      .catch(err => console.error(err)));

let userID;

module.exports = {
  getSpotlightOnePlaylist: (req, res) => {
    console.log('GETTING FIRST SPOTLIGHT REQUEST');
    res.send('FIRST FESTIVAL RESPONSE');
  },
  getSpotlightTwoPlaylist: (req, res) => {
    console.log('GETTING SECOND SPOTLIGHT REQUEST');
    res.send('SECOND FESTIVAL RESPONSE');
  },
  createPlaylist: (req, res) => {
    console.log('SELECTED', req.body.selected);
    Promise.all(getArtistIDList(req.body.selected))
      .then(artistIDList => getTopTracks(artistIDList))
      .then((tracksArray) => {
        Promise.all(tracksArray)
          .then((results) => {
            const merged = Object.assign(...results);
            return merged;
          })
          .then((merged) => {
            spotifyApi.getMe()
              .then((data) => {
                userID = data.body.id;
                return userID;
              })
              .then((user) => {
                spotifyApi.createPlaylist(user, 'Gigify Playlist', { public: false })
                .then((data) => {
                  console.log('Created playlist!');
                  return [user, data.body.id];
                })
                .then((playlistInfo) => {
                  for (artist in merged) {
                    spotifyApi.addTracksToPlaylist(playlistInfo[0], playlistInfo[1], merged[artist])
                    .then((data) => {
                      console.log('ADDED SONGS TO PLAYLIST');
                    })
                    .catch(err => console.error(err));
                  }
                  res.send(playlistInfo);
                })
                .catch(err => console.error(err));
              });
          });
      });
  },
  goHome: (req, res) => {
    res.redirect('/home');
  },
  getEvents: (req, res) => {
    console.log(req.params, 'USERNAME ******');
    axios.get(`http://api.songkick.com/api/3.0/users/${req.params.username}/calendar.json?reason=tracked_artist&apikey=${process.env.SONGKICK_KEY}`)
    .then((results) => {
      const eventList = results.data.resultsPage.results.calendarEntry;
      const events = [];
      const festivals = [];
      eventList.forEach((item) => {
        const concert = item.event;
        let eventTime = moment(concert.start.datetime).format('hA');
        if (eventTime === 'Invalid date') {
          eventTime = 'TBD';
        }
        let eventDate = moment(concert.start.date).format('M[/]D') || 'TBD';
        if (eventDate === 'Invalid date') {
          eventDate = 'TBD';
        }
        const artists = [];
        concert.performance.forEach((artist) => {
          artists.push(artist.displayName);
        });
        const event = {
          eventName: concert.displayName,
          eventUrl: concert.uri,
          performers: artists,
          venueName: concert.venue.displayName,
          venueUrl: concert.venue.uri,
          time: eventTime,
          date: eventDate,
        };
        if (event.performers.length > 7) {
          festivals.push(event);
        } else {
          events.push(event);
        }
      });
      // console.log(events, "EVENTS")
      res.send(events);
    });
  },
  spotifyApi,
};
