const cron = require('node-cron');
const addData = require('./addHNData');

// Fetch data from HN every hour
cron.schedule('0 0 */1 * * *', () => {
  try {
    addData();

    console.log('---------------------');
    console.log('saving data from HN');
  } catch (error) {
    console.log(error.message);
  }
});
