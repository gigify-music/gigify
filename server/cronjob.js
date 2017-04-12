const cron = require('node-cron');
const sendNotification = require('./sendreminder');


module.exports = {
  job: () => {
    cron.schedule('00 12 * * *', () => {
      sendNotification.sendNotification();
    });
  },
};
