import express from 'express'
const { Router } = express
const app = express();

const port = 8080;

import{
    productsDao as productsApi
} from './src/daos/index.js'


app.use(express.urlencoded({ extended: true}));
app.use(express.json());



/**** Rutas Productos ****/

const productsRouter = new Router()

app.use('/api/products', productsRouter)

productsRouter.post('/',  async (req, res)=>{
    res.json(await productsApi.saveProduct(req.body))
});

productsRouter.get('/',  async (req, res)=>{
    const products = await productsApi.getProducts();
    res.json(products)
});

productsRouter.get('/:id', async (req, res) =>{
    res.json(await productsApi.getProductById(req.params.id))
});

// productsRouter.put('/:id', async (req, res)=>{
//     res.json( await productsApi.editProduct(req.body))
// })

/**** Rutas Productos ****/


app.use((req, res) => {
        res.json({
            error: '-2', 
            description: `ruta ${req.originalUrl} metodo ${req.method} no implementada`
        });
    });


app.listen(8080, ()=>{
    console.log(`Escuchando en el puerto ${port}`);
});