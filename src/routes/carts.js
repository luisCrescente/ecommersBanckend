const express = require('express')
const router = express.Router();
const controller = require('../controller/carts');

router.post('/',controller.create); 

router.delete('/:id',controller.delete);

router.get('/:id/products',controller.getCartProducts);

// router.post('/:id/products', controller.saveProducts); 

// router.delete('/:id/products/:id_prod',controller.deleteProduct); 


module.exports = router;