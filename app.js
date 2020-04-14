const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const Products = require("./models/products");
const bodyParser = require("body-parser");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});

app.post("/addproduct", async (req, res) => {
	const { productURL, targetPrice } = req.body;
	const { productName, currentPrice } = await fetchDetails(productURL);
	const targetReached = currentPrice <= targetPrice;
	const Product = new Products({
		productName,
		productURL,
		targetPrice,
		currentPrice,
		targetReached,
	});
	try {
		await Product.save();
		res.redirect("/tracker");
	} catch (error) {
		res.status(500).send();
	}
});

app.get("/tracker", async (req, res) => {
	try {
		const products = await Products.find({});
		res.status(200).render("tracker", { products });
	} catch (error) {
		res.status(500).send(error);
	}
});

app.patch("/update/:id", async (req, res) => {
	// console.log(req.body);
	try {
		const product = await Products.findOneAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!product) {
			return res.status(404).send();
		}

		res.send(product);
	} catch (e) {
		res.status(400).send(e);
	}
});

app.delete("/delete/:id", async (req, res) => {
	try {
		const product = await Products.findByIdAndDelete(req.params.id);

		if (!product) {
			return res.status(404).send();
		}

		res.status(200).send(product);
	} catch (error) {
		res.status(500).send(error);
	}
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
