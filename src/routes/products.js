const express = require('express')
const router = express.Router();
const controller = require('../controller/products');
const upload = require('../middleware/multer');
const products = require('../controller/products');

router.get('/products',controller);
router.post('/products',upload.single('img'),controller);
router.put('/products/:id',upload.single('img'),controller);
router.delete('/products/:id',controller);

module.exports = router;