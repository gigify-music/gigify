const axios = require('axios');
const moment = require('moment');

module.exports = {
  goHome: (req, res) => {
    console.log('BEING CALLED');
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
};
