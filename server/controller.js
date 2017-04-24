const axios = require('axios');
const moment = require('moment');
const SpotifyWebApi = require('spotify-web-api-node');

require('dotenv').config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.APP_KEY,
  clientSecret: process.env.APP_SECRET,
  redirectUri: 'http://localhost:8000/auth/callback',
});

const getArtistIDList = artistList => (
  artistList.map(artist => (
    spotifyApi.searchArtists(artist)
            .then(response => response.body.artists.items[0].id)
            .catch(err => console.error('Spotify API Error: ', err))
  ))
);
const getTopTracks = artistIDList => artistIDList.map(artist => spotifyApi.getArtistTopTracks(artist, 'US')
      .then((data) => {
        const tracks = data.body.tracks;
        const tracklist = {};
        tracklist[artist] = [];
        tracks.forEach(((track) => {
          tracklist[artist].push(`spotify:track:${track.id}`);
        }));
        const artistCount = artistIDList.length;
        const allTracks = tracklist[Object.keys(tracklist)[0]];
        const sizing = Math.floor(30 / artistCount);

        if (allTracks.length > sizing) {
          tracklist[Object.keys(tracklist)[0]].splice(sizing);
        }
        return tracklist;
      })
      .catch(err => console.error(err)));

const getArtistImages = artistIDList => spotifyApi.getArtists(artistIDList)
    .then((data) => {
      const artistImages = [];
      data.body.artists.forEach((artist) => {
        if (artist.images[1] === undefined) {
          artistImages.push('../assets/unavailable.png');
        } else {
          artistImages.push(artist.images[1].url);
        }
      });
      return artistImages;
    })
    .catch(err => console.error(err));

let userID;

module.exports = {
  getSpotlightOnePlaylist: (req, res) => {
    res.send('FIRST FESTIVAL RESPONSE');
  },
  getSpotlightTwoPlaylist: (req, res) => {
    res.send('SECOND FESTIVAL RESPONSE');
  },
  createPlaylist: (req, res) => {
    // console.log('SELECTED', req.body.selected);
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
                const name = data.body.display_name;
                return [userID, name];
              })
              .then((user) => {
                spotifyApi.createPlaylist(user[0], `${user[1]}'s Gigify Playlist - ${moment().format('M/D, hA')}`, { public: false })
                .then(data => [user[0], data.body.id])
                .then((playlistInfo) => {
                  let tracksToAdd = [];
                  for (const artist in merged) {
                    tracksToAdd = tracksToAdd.concat(merged[artist]);
                  }
                  spotifyApi.addTracksToPlaylist(playlistInfo[0], playlistInfo[1], tracksToAdd)
                    .then(() => {
                    })
                    .catch(err => console.error(err));

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
  checkSession: (req, res) => {
    spotifyApi.getMe()
    .then(() => {
      res.send('logged');
    }).catch(() => {
      res.send('notlogged');
    });
  },
  getEvents: (req, res) => {
    axios.get(`http://api.songkick.com/api/3.0/users/${req.params.username}/calendar.json?reason=tracked_artist&apikey=${process.env.SONGKICK_KEY}`)
    .then((results) => {
      const eventList = results.data.resultsPage.results.calendarEntry;
      const events = [];
      const festivals = [];
      const allArtists = [];
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

        if (artists.length < 7) {
          allArtists.push(artists[0]);
        }

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
      Promise.all(getArtistIDList(allArtists))
        .then(artistIds => getArtistImages(artistIds))
          .then((imageUrls) => {
            events.forEach((event, i) => {
              event.imageUrl = imageUrls[i];
              event.id = i;
            });
          })
          .then(() => res.send(events));
    });
  },
  spotifyApi,
};
