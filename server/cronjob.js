const cron = require('node-cron');
const sendNotification = require('./sendreminder');


module.exports = {
  job: () => {
    cron.schedule('01 00 * * *', () => {
      sendNotification.sendNotification();
    });
  },
};
