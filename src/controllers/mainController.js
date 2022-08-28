const { loaldProducts } = require('../data/dbModule');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// Do the magic
		let products = loaldProducts();
		let productsVisited = products.filter(produc => produc.category === "visited");
		let productsInsale = products.filter(produc => produc.category === "in-sale");

		
		return res.render("index",{
			productsVisited,
		    productsInsale,
			toThousand
		})
	},

	search: (req, res) => {
		// Do the magic
		let keywords = req.query.keywords;
		let products = loaldProducts();
		let result = products.filter(produc => produc.name.toLowerCase().includes(keywords.toLowerCase()));
	    return res.render('results', {
			result,
			toThousand,
			keywords
		})
	}
};

module.exports = controller;
