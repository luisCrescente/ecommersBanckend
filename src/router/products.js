const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, getProductById, editProducts, deleteProduct} = require('../controller/productsController');


router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/', createProduct);

router.put('/:id', editProducts);

router.delete('/:id', deleteProduct);

module.exports = router;