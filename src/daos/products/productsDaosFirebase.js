import ContainerFirebase from "../../controller/contenedorFirebase.js";

class ProductsDaoFirebase extends ContainerFirebase {
    constructor(){
        super('products')
    }
}

export default ProductsDaoFirebase