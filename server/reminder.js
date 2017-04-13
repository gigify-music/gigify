const axios = require('axios');
const pool = require('./database');

module.exports = {
  addReminder: (req, res) => {
    console.log(req.body, "inside reminder controller");
    const singleQuoteReplaced = req.body.eventname.replace(/'/g, '"');
    // console.log(req.body.phone, typeof req.body.phone, "req body ph*****");
    const phoneNumber = req.body.phone.toString().replace(/[)(-]/g, '');
    // console.log(phoneNumber, 'replaced chars num');
    const num = Number(phoneNumber);
    // console.log(num, 'converted NUM')
    const query = `insert into reminder (date, eventname, phone, status) values
    ('${req.body.date}', '${singleQuoteReplaced}', ${num}, 0)`;
    pool.connect()
         .then((client) => {
           client.query(query)
             .then((resp) => {
               res.send(resp);
               client.release();
             })
             .catch((err) => {
               console.error('Querey Error reminder: ', err);
               res.send(err);
             });
         }).then(() => {
          //  console.log(resp, 'resp inside addreminder controller')
         })
         .catch((err) => {
           console.error('Client Error:  reminder', err);
         });
  }
}
