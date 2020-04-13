const mongoose = require("mongoose");
require("../db/mongoose");

const Products = mongoose.model("Products", {
	productName: {
		type: String,
		required: true,
		trim: true,
	},
	productURL: {
		type: String,
		required: true,
		trim: true,
	},
	targetPrice: {
		type: Number,
		required: true,
		trim: true,
	},
	currentPrice: {
		type: Number,
		required: true,
		trim: true,
	},
	targetReached: {
		type: Boolean,
	},
});
module.exports = Products;

// const temp = new Products({
// 	productName: "TP Link Archer C20",
// 	targetPrice: 1299,
// });

// temp
// 	.save()
// 	.then((data) => console.log(data))
// 	.catch((error) => console.log(error));

// async function temp() {
// 	const users = await Products.find({});
// 	console.log(users);
// }
// temp();
