const scheduler = require('node-schedule');
const sendNotification = require('./sendreminder');

module.exports = {
  job: () => {
    const rule = new scheduler.RecurrenceRule();
    rule.minute = 20;
    rule.hour = 15;
    scheduler.scheduleJob(rule, () => {
      sendNotification.sendNotification();
    });
  },
};
