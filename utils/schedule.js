const cron = require("node-cron");
const update = require("./update");

cron.schedule("* */1 * * *", () => {
	update();
});
