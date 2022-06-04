const express = require('express')
const router = express.Router();
const controller = require('../controller/products');
const upload = require('../middleware/multer');
const userAdm = require('../middleware/checkAdmin')

router.get('/products',controller.getAll);

router.post('/products',userAdm ,upload.single('img'),controller.createProduct);

router.put('/products/:id',userAdm ,upload.single('img'),controller.editProduct);

router.delete('/products/:id',userAdm ,controller.delete);

module.exports = router;