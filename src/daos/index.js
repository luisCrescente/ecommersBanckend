let productsDao;
let cartsDaos

const {default: ProductsDaoFirebase} = await import('./products/productsDaosFirebase.js')
const {default: CartsDaoFirebase} = await import('./carts/cartsDaosFirebase.js')


productsDao = new ProductsDaoFirebase();
cartsDaos = new CartsDaoFirebase();

export{ productsDao, cartsDaos}