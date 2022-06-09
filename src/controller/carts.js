const fs = require('fs');
const { readJson, writeJson, lastId } = require('./helpers');

class classCarts {
    constructor(file){
        this.file = file;
    }

    create = async (req,res) =>{

        try{
            const carts = await readJson(this.file);
            let newCart ={
                id: lastId(carrito)+1,
                timestamps: new Date.now(),
                products:[]
            }
            carts.push(newCart);
            await writeJson(this.file,carts);
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
            
        } catch (error){ console.log(error) }
    };

    getCart = async (req, res) =>{
        
        try{
            
        } catch (error){ console.log(error) }
    };

    saveProducts = async (req, res) =>{

        try{
            let id = req.params.id;

        } catch (error) {console.log(error) }
    };
    
    deleteProduct = async (req, res) =>{

        try{
            const id = req.params.id;

        } catch (error){ console.log(error) }
    };
};

const carts = new classCarts('cartsDataBase');

module.exports = carts;
