import express from 'express'
const { Router } = express
const app = express();

const port = 8080;

import{
    productsDao as productsApi,
    cartsDaos as cartsApi
} from './src/daos/index.js'


app.use(express.urlencoded({ extended: true}));
app.use(express.json());



// Rutas Productos firebase 

const productsRouter = new Router()

app.use('/api/products', productsRouter)

productsRouter.post('/',  async (req, res)=>{
    res.json(await productsApi.save(req.body))
});

productsRouter.get('/',  async (req, res)=>{
    const products = await productsApi.getAll();
    res.json(products)
});

productsRouter.get('/:id', async (req, res) =>{
    res.json(await productsApi.getElementById(req.params.id))
});

// productsRouter.put('/:id', async (req, res)=>{
//     res.json( await productsApi.updateElement(req.params.id, req.body))
// })


productsRouter.delete('/:id', async (req, res) =>{
    res.json( await productsApi.delete(req.params.id))
});



//  Rutas carrito firebase 

const cartsRouter = new Router();

app.use('/api/carts', cartsRouter);

cartsRouter.get('/', async (req, res)=>{
    res.json((await cartsApi.getAll()).map(cart => cart.id))
});

cartsRouter.post('/', async (req,res)=>{
    res.json(await cartsApi.save(req.body))
});

cartsRouter.get('/:id/products', async (req, res) =>{
    const cart = await cartsApi.getAll(req.params.id)
    res.json(carts.products)
});

cartsRouter.post('/:id/products', async (req, res) =>{
    const carts = await cartsApi.getAll(req.params.id)
    const product = await productsApi.getAll(req.body.id)
    carts.products.push(product);
    await cartsApi.updateElement(carts);
    res.end()
});

cartsRouter.delete('/:id/products/:idProd', async (req, res) =>{
    const carts = await cartsApi.getAll(req.params.id)
    const index = carts.products.findIndex( elem => elem.id == req.params.idProd)
    if(index != -1){
        carts.products.splice(index, 1)
        await cartsApi.updateElement(carts)
    }
    res.end()
});

app.use((req, res) => {
        res.json({
            error: '-2', 
            description: `ruta ${req.originalUrl} metodo ${req.method} no implementada`
        });
    });


app.listen(8080, ()=>{
    console.log(`Escuchando en el puerto ${port}`);
});