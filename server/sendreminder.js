const twilio = require('twilio');
const pool = require('./database');

require('dotenv').config();

module.exports = {
  sendNotification: () => {
    const query = `select * from reminder where status = 0`
    pool.connect()
         .then((client) => {
           client.query(query)
             .then((resp) => {
              //  console.log(resp.rows, 'response from reminder select status query');
               client.release();
               extractDate(resp.rows);
              //  client.release();
             })
             .catch((err) => {
               console.error('Querey Error reminder: ', err);
             });
         })
         .catch((err) => {
           console.error('Client Error:  reminder', err);
         });
  },
};

const extractDate = (objectArray) => {
  objectArray.forEach((ele) => {
    const date1 = convertDate(new Date()).split('-');
    const date2 = convertDate(ele['date']).split('-');
    const difference = getDifferenceInDays(date1, date2);
    // console.log(difference, 'difference of each date');
    if (difference < 2) {
      sendMessage(ele.phone, ele.eventname);
    }
    return difference;
  });
}

const getDifferenceInDays = (date1, date2) => {
  date1 = new Date(date1[0], date1[1], date1[2]);
  date2 = new Date(date2[0], date2[1], date2[2]);

  date1_unixtime = parseInt(date1.getTime() / 1000);
  date2_unixtime = parseInt(date2.getTime() / 1000);

  const timeDifference = date2_unixtime - date1_unixtime;
  const timeDifferenceInHours = timeDifference / 60 / 60;
  const timeDifferenceInDays = timeDifferenceInHours  / 24;
  return timeDifferenceInDays;
}

const convertDate = (date) => {
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()+1).toString();
  var dd  = date.getDate().toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');

  return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}

const sendMessage = (phoneIn, eventName) => {
  const clientTwilio = new twilio.RestClient(process.env.TWILIOSID, process.env.TWILIOAUTHTOKEN);
  clientTwilio.sms.messages.create({
      to: `+1${phoneIn}`,
      from: '+14154032411',
      body: `Gigify: Your gig is tomorrow! => ${eventName}`,
  }, function(err, message) {
      if(message){
        console.log('Message SENT!');
        const query = `delete from reminder where phone = ${phoneIn}`;
        pool.connect()
             .then((client) => {
               client.query(query)
                 .then((resp) => {
                   client.release();
                 })
                 .catch((err) => {
                   console.error('Querey Error deleting reminders: ', err);
                 });
             })
             .catch((err) => {
               console.error('Client Error:  reminder', err);
             });
      } else {
        console.log(err, "twilio ERROR message");
      }
  });
}
