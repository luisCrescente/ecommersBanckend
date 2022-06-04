const fs = require('fs');
const { readJson, writeJson, lastId } = require('./helpers');

class classProducts {
    constructor(file){
        this.file = file;
    }
    getAll = async (req,res)=>{

        try{
            const allProducts = await readJson(this.file);
            if(allProducts.length > 0){

                res.status(200).json({
                    data:allProducts,
                    status:(200)
                })
            }else{
                res.status(400).json({
                    msg:'No hay productos',
                    error:400
                })
            }
        }catch(error){console.log(error)}
    };

    createProduct = async (req,res) =>{

        try{
            const allProducts = await readJson(this.file);
            const newProduct ={
                id: lastId(allProducts) +1,
                name: req.body.name,
                price:req.body.price,
                code: req.body.code,
                description:req.body.description,
                stock: req.body.stock,
                img: req.body.img,
            };

            allProducts.push(newProduct);
            await writeJson(this.file, allProducts);
            res.status(200).json({
                data:newProduct,
                msg:'Producto creado',
                status:200
            })
        } catch (error) { console.log(error) }
    };

    delete = async (req,res)=>{

        try {
        const allProducts = await readJson(this.file);
        const productById = allProducts.filter( product => product.id != id);

            if (productById.length != allProducts.length){
    
                await writeJson(this.file, productById);
                res.status(200).json({
                    msg:'Producto borrado',
                    status:200
                });
            }else {
                res.status(400).json({
                    msg:'Producto no encontrada',
                    error:400,
                })
            }
        } catch(error){ console.log(error);}
    };

};

const products = new classProducts('dataBase');

module.exports = products;