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
                res.status(200).json({
                    msg:'No hay productos',
                    error:200
                })
            }
        }catch(error){console.log(error)}
    };

    createProduct = async (req,res) =>{

        try{
            const allProducts = await readJson(this.file);
            const newProduct ={
                id: lastId(allProducts) +1,
                timesTamps: new Date(),
                name: req.body.name,
                price:req.body.price,
                code: req.body.code,
                description:req.body.description,
                stock: req.body.stock,
                image: req.file != undefined ? req.file.filename :'noImage.jpg',
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

    editProduct = async (req,res) =>{
        try{
            const allProducts = await readJson(this.file);
            const id = req.params.id;
            const productToEdit = allProducts.find( product => product.id == id);
            if(productToEdit != undefined){
                const editProduct ={
                    ...productToEdit,
                    name: req.body.name != undefined ? req.body.name : productToEdit.name,
                    price: req.body.price != undefined ? req.body.price : productToEdit.price,
                    code: req.body.code != undefined ? req.body.code : productToEdit.code,
                    description: req.body.description != undefined ? req.body.description : productToEdit.description,
                    stock: req.body.stock != undefined ? req.body.stock : productToEdit.stock,
                    image: req.file != undefined ? req.file.filename : productToEdit.file,
                    
                }
                const edit = allProducts.indexOf(productToEdit);
                allProducts[edit] = editProduct;
                await writeJson(this.file, allProducts);
                
                res.status(200).json({
                    data:editProduct,
                    msg:'Producto editado',
                    status:200
                })
            }else{
                res.status(400).json({
                    msg:'Producto no encontrado',
                    error:400
                })
            }
        } catch(error){console.log(error)}
    };

    delete = async (req,res)=>{

        try {
        const allProducts = await readJson(this.file);
        const id = req.params.id;
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