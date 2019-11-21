const cron = require('node-cron');
const addData = require('./addHNData');

// Fetch data from HN at 11:59pm everyday
cron.schedule('59 23 * * *', () => {
  try {
    addData();

    console.log('---------------------');
    console.log('saving data from HN');
  } catch (error) {
    console.log(error.message);
  }
});
