const { json } = require('express');
const fs = require('fs');
const { readJson, writeJson, lastId } = require('./helpers');

class classCarts {
    constructor(file){
        this.file = file;
    }

    create = async (req,res) =>{

        try{
            const allCarts = await readJson(this.file);
            let newCart ={
                id: lastId(allCarts)+1,
                timestamps: new Date.now(),
                products:[]
            }
            allCarts.push(newCart);
            await writeJson(this.file, allCarts);

            res.status(200).json({
                data:newCarrito,
                msg:'carrito creado',
                status:200
            })
        } catch (error){ console.log(error) }
    };

    delete = async (req, res) => {

        try{
            const id = req.params.id;
            const allCarts = readJson(this.file);
            const cartById = allCarts.filter( cart => cart.id != id);

            if(cartById.length != allCarts.length){
                await writeJson(this.file, cartById);
                res.status(200).json({
                    data: cartById,
                    status:200
                })
            }else {
                res.status(400).josn({
                    msg: ' no se encuentra el carrito',
                    error:400
                })
            }
            
        } catch (error){ console.log(error) }
    };

    getCartProducts = async (req, res) =>{
        
        try{
            const id = req.params.id;
            const findCart = allCarts.find(cart => cart.id == id);
            if( findCart != undefined){
                if( findCart.products.length > 0){
                    res.status(200).json({
                        data: findCart.products,
                        status:200
                    })
                }else {
                    res.status(200).json({
                        msg: ' el carrito no tiene productos',
                        status:200
                    })
                }
            }else {
                res.status(400).json({
                    msg:' no se encuentra el carrito',
                    error: 400
                })
            }

        } catch (error){ console.log(error) }
    };

    saveProducts = async (req, res) =>{

        try{
            const id = req.params.id;
            const idProduct = req.params.products;
            const allCarts = await readJson(this.file);
            allProducts = await readJson('dataBase');

            const cartById = allCarts.find( cart => cart.id == parseInt(id));
            if(cartById){
                const product = allProducts.find( product => product.id == parseInt(idProduct));

                if(product){
                    cartById.products.push(product)
                    await writeJson(this.file, allCarts)
                    res.status(200).json({
                        data: allCarts,
                        status:200
                    })
                }else {
                    res.status(400).json({
                        msg: 'no se encontro el producto ',
                        status:400
                    })
                }
            } else {
                res.status(400).json({
                    msg:'no se encuentra el carrito',
                    error:400
                })
            }

        } catch (error) {console.log(error) }
    };
    
    deleteProduct = async (req, res) =>{

        try{
            const id = req.params.id;
            const idProduct = req.params.id_prod;

            const allCarts = await readJson(this.file);
            const cartById = allCarts.find( cart => cart.id == parseInt(id));
            if (cartById) {
                const newCart = cartById.products.filter( product => product.id != idProduct);
                if (newCart.length != cartById.length > 0){
                    await writeJson(this.file, allCarts)
                    res.status(200).json({
                        data: allCarts,
                        status:200,
                    })
                } else{
                    res.status(400).json({
                        msg:'no se encontro el prodcuto en el carrito',
                        error:400
                    })
                }
            }else{
                res.status(400).json({
                    msg:'no se encuentra el carrito',
                    error:400
                })
            }

        } catch (error){ console.log(error) }
    };
};

const carts = new classCarts('cartsDataBase');

module.exports = carts;
