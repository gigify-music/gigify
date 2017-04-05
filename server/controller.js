const axios = require('axios');
const moment = require('moment');
const session = require('express-session');
const passport = require('passport');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.APP_KEY,
  clientSecret: process.env.APP_SECRET,
  redirectUri: 'http://localhost:8000/auth/callback',
});

spotifyApi.setAccessToken(passport.accessToken);

const getArtistIDList = (artistList) => {
  return artistList.map((artist) => {
    return spotifyApi.searchArtists(artist)
      .then((response) => {
        // console.log(response.body.artists.items[0].name, response.body.artists.items[0].id);
        return response.body.artists.items[0].id;
      })

      .catch(err => console.error(err));
  });
};
const getTopTracks = (artistIDList) => {
  return artistIDList.map((artist) => {
    return spotifyApi.getArtistTopTracks(artist, 'US')
      .then((data) => {
        const tracks = data.body.tracks;
        const tracklist = {};
        tracklist[artist] = [];
        tracks.forEach(((track) => {
          tracklist[artist].push(track.id);
        }));
        // console.log('THE TRACKLIST: ', tracklist);
        return tracklist;
      })
      .catch(err => console.error(err));
  });
};

module.exports = {
  createPlaylist: (req, res) => {
    const artists = ['The National', 'New Order', 'Kanye West', 'Porches'];
    Promise.all(getArtistIDList(artists))
      .then(artistIDList => getTopTracks(artistIDList))
      .then((tracksArray) => {
        Promise.all(tracksArray)
          .then((results) => {
            const merged = Object.assign(...results);
            console.log('THE TRACKS OBJ: ', merged);
            return merged;
          });
      });

    // .then((response) => {
    //   artistIDList = response;
    //   console.log(artistIDList);
    // });

    res.end();
  },
  // createPlaylist: (req, res) => {
  //   const artists = ['The National', 'New Order', 'Kanye West', 'Porches'];
  //
  //   const artistIDList = [];
  //   artists.forEach((artist) => {
  //     const query = artist.split(' ').join('%20');
  //     axios.get(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`, { headers: { Authorization: `Bearer ${passport.accessToken}` } })
  //       .then((response) => {
  //         artistIDList.push(response.data.artists.items[0].id);
  //       });
    // });
    // .then(() => {
    //   console.log(artistIDList);
    //   artistIDList.forEach((artistID) => {
    //     axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=US`)
    //       .then((response) => {
    //         console.log(response.data.tracks[0].name);
    //       });
    //   });
    // });
  goHome: (req, res) => {
    console.log('BEING CALLED');
    res.redirect('/home');
  },
  getEvents: (req, res) => {
    axios.get(`http://api.songkick.com/api/3.0/users/jp-marra/calendar.json?reason=tracked_artist&apikey=${process.env.SONGKICK_KEY}`)
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
      res.send(events);
    });
  },
};
