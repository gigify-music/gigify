const pool = require('./database');

module.exports = {
  addReminder: (req, res) => {
    const singleQuoteReplaced = req.body.eventname.replace(/'/g, '"');
    const phoneNumber = req.body.phone.toString().replace(/[)(-]/g, '');
    const query = `insert into reminder (date, eventname, phone, status) values
    ('${req.body.date}', '${singleQuoteReplaced}', ${phoneNumber}, 0)`;
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
         })
         .catch((err) => {
           console.error('Client Error:  reminder', err);
         });
  },
};
