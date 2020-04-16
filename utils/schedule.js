const cron = require('node-cron');
const update = require('./update')

cron.schedule('* */2 * * *', () => {
    update()
});