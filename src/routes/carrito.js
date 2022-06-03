const express = require('express')
const router = express.Router();
const controller = require('../controller/carrito');
const uploads = require('../middleware/multer');


router.get('/carrito',controller);
router.post('/carrito',uploads.single('img'),controller);
router.put('/carrito/:id',uploads.single('img'),controller);
router.delete('/carrito/:id',controller);

module.exports = router;