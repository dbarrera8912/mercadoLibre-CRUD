
const fs = require('fs');
const { Module } = require('module');
const path = require('path');


const loaldProducts = () => {
    return JSON.parse(
        fs.readFileSync(path.join(__dirname, "./productsDataBase.json"), 'utf-8')
    );
};

const storeProducts = (produc) => {
    fs.writeFileSync(path.join(__dirname, "./productsDataBase.json"),JSON.stringify(produc), 'utf-8')
};

module.exports = {
    loaldProducts,
    storeProducts
};
