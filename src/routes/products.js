const express = require('express')
const router = express.Router();
const controller = require('../controller/products');
const upload = require('../middleware/multer');
const {user, admin} = require('../middleware/checkAdmin')

router.get('/products',controller.getAll);

router.post('/products',user, admin ,upload.single('img'),controller.createProduct);

router.put('/products/:id',user, admin ,upload.single('img'),controller.editProduct);

router.delete('/products/:id',user, admin ,controller.delete);

module.exports = router;