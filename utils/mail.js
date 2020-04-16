const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASS,
	},
});

const email = (productName, price) => {
	const mailOptions = {
		from: process.env.EMAIL,
		to: process.env.TO,
		subject: "Alert from Flipkart Price Tracker",
		text: `Price of ${productName} reached ${price}`,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};

module.exports = email;
