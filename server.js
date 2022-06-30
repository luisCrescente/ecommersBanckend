import express from 'express'
const { Router } = express
const app = express();

const port = 8080;

import{
    productsDao as productsApi
} from './src/daos/index.js'


const productsRouter = new Router()

productsRouter.post('/',  async (req,res)=>{
    res.json(await productsApi.saveProduct(req.body))
});


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/api/products', productsRouter)

app.use((req, res) => {
        res.json({
            error: '-2', 
            description: `ruta ${req.originalUrl} metodo ${req.method} no implementada`
        });
    });

app.listen(8080, ()=>{
    console.log(`Escuchando en el puerto ${port}`);
});