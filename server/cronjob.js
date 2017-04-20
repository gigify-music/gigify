const scheduler = require('node-schedule');
const sendNotification = require('./sendreminder');

module.exports = {
  job: () => {
    const rule = new scheduler.RecurrenceRule();
    rule.minute = 50;
    rule.hour = 17;
    scheduler.scheduleJob(rule, () => {
      sendNotification.sendNotification();
    });
  },
};
