const Products = require('../models/products')
const fetchDetails = require('./details')

const update = async () => {
    const products = await Products.find({});
    // console.log(products)
    for (i = 0; i < products.length; i++) {
        if (!products[i].targetReached) {
            console.log(products[i])
            const oldPrice = products[i].currentPrice
            const { currentPrice } = await fetchDetails(products[i].productURL);
            const curPrice = Number(currentPrice)
            if (oldPrice !== curPrice) {
                const targetReached = curPrice <= products[i].targetPrice;
                const updates = { currentPrice, targetReached }
                const update = await Products.findByIdAndUpdate(products[i]._id, updates, {
                    new: true,
                    runValidators: true,
                });
            }
        }

    }
}

module.exports = update