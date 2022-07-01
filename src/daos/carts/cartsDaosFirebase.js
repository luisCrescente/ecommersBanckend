import ContainerFirebase from '../../controller/contenedorFirebase.js'

class CartsDaoFirebase extends ContainerFirebase {
    constructor() {
        super('carts')
    }
        async save(carts = { products: [] }) {
            return super.save(carts)
        }
}

export default CartsDaoFirebase