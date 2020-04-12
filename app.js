const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
app.use(express.urlencoded({ extended: false }));
// const products = [];
const products = [
	{
		productName:
			"TP-Link Archer C20 AC Wireless Dual Band 750 Mbps Router  (Blue, Dual Band)",
		productURL:
			"https://www.flipkart.com/tp-link-archer-c20-ac-wireless-dual-band-750-mbps-router/p/itme8gkfgb5hyqzq",
		targetPrice: 1299,
		currentPrice: 1599,
		targetReached: false,
	},
	{
		productName:
			"TP-Link Archer C50 AC1200 Wireless Dual Band 1200 Mbps Router  (White, Dual Band)",
		productURL:
			"https://www.flipkart.com/tp-link-archer-c50-ac1200-wireless-dual-band-1200-mbps-router/p/itmehsxsuxax7tec",
		targetPrice: 1399,
		currentPrice: 1899,
		targetReached: false,
	},
];
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});

app.post("/addproduct", async (req, res) => {
	const { productURL, targetPrice } = req.body;
	const { productName, currentPrice } = await fetchDetails(productURL);
	const targetReached = currentPrice <= targetPrice;
	// products.push({
	// 	productName,
	// 	productURL,
	// 	targetPrice,
	// 	currentPrice,
	// 	targetReached,
	// });
	res.redirect("/tracker");
	// console.log(products);
});

app.get("/tracker", (req, res) => {
	res.status(200).render("tracker", { products });
});

app.listen(3000, () => {
	console.log("App up & running at port 3000");
});

const fetchDetails = async (url) => {
	try {
		const response = await axios.get(url);
		const $ = cheerio.load(response.data);
		const currentPrice = $("._1vC4OE").text().replace(/₹|,/gi, "");
		const productName = $("._35KyD6").text();
		// const pic = $("div").find("._3iN4zu").find("img").attr("src");
		return { productName, currentPrice };
	} catch (error) {
		console.error(error);
	}
};
// fetchDetails(
// 	"https://www.flipkart.com/tp-link-archer-c20-ac-wireless-dual-band-750-mbps-router/p/itme8gkfgb5hyqzq"
// );
