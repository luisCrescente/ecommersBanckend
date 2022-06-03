const fs = require('fs');
const { readJson, writeJson, lastId } = require('./helpers');

class products {
    constructor(file){
        this.file = file;
    }

    createProduct = async (req,res) =>{
        const allProducts = await readJson(this.file);
        const newProduct ={
            id: lastId(allProducts) +1,
            name: req.body.name,
            price:req.body.price,
            code: req.body.code,
            description:req.body.description,
            stock: req.body.stock,
            img: req.body.img,
        }
        try {
            allProducts.push(newProduct);
            await writeJson(this.file, allProducts);
        } catch (error) { console.log(error) }
    }

};

const products = new products('dataBase');

module.exports = products;