const fs = require('fs');
const { readJson, writeJson, lastId } = require('./helpers');

class classCarrito {
    constructor(file){
        this.file = file;
    }

    getAll = async (req, res)=>{
        res.send('carrito');
    };
};

const carrito = new classCarrito('dataBase');

module.exports = carrito;
