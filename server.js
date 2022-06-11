const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

app.use(express.static(path.resolve(__dirname,'./public')));


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const products = require('./src/routes/products');
const carts = require('./src/routes/carts');

app.use('/api',products);
app.use('/api/carts',carts);


app.listen(8080, ()=>{
    console.log(`Escuchando en el puerto ${port}`);
});