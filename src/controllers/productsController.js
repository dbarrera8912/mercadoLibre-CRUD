const { name } = require('ejs');
const fs = require('fs');
const path = require('path');
const { loaldProducts,storeProducts } = require('../data/dbModule');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		let products =  loaldProducts();
		return res.render('products',{
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		let products = loaldProducts();
		let product = products.find(produc => produc.id === +req.params.id)
		return res.render('detail', {
			product,
			toThousand 
		})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		return res.render('product-create-form')
	},

	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		const {name, price, discount, category, description} = req.body
		let products = loaldProducts();

		const newProduct = {
			id : products[products.length - 1].id + 1,
			name : name.trim(),
			price : +price,
			description : description.trim(),
			discount : +discount,
			category,
			image:"defaul- image.png"
		}
		productsModify = [...products, newProduct];
		storeProducts (productsModify);
		return res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		let productToEdit = loaldProducts().find(produc => produc.id === +req.params.id)
		return res.render('product-edit-form', {
			productToEdit
		})

	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		const {name, price, discount, category, description} = req.body
		let productsModify = loaldProducts().map(products => {
             if (products.id === +req.params.id) {
				return {
			           id : products.id,
					   name : name.trim(),
					   price : +price,
					   description : description.trim(),
					   discount : +discount,
					   category,
					   image: products.image


				}
			 }
			 return products
		})
		storeProducts (productsModify);
		return res.redirect('/products/detail/' + req.params.id)
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		// Do the magic
		let productsModify =  loaldProducts().filter(produc => produc.id !== +req.params.id)

            storeProducts(productsModify);
			return res.redirect('/products')

	}
};

module.exports = controller;