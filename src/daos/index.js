let productsDao;

const {default: ProductsDaoFirebase} = await import('./products/productsDaosFirebase.js')
productsDao = new ProductsDaoFirebase()

export{ productsDao}