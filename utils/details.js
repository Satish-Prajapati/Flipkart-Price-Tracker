const axios = require("axios");
const cheerio = require("cheerio");

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

module.exports = fetchDetails