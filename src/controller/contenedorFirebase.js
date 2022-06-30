import admin from 'firebase-admin';
import config from '../daos/config/firebase-credentials.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
    databaseURL: 'https://segunda-entrega-25790.firebaseio.com'
});

const db = admin.firestore()

class ContainerFirebase {
    constructor(nameCollection){
        this.collection = db.collection(nameCollection)
    }

    async saveProduct(newProduct){
        try{
            const save = await this.collection.add(newProduct);
            return{...newProduct, id: save.id}
        } catch (error) {
            console.log(error);
        }
    }
    
    async getProducts (){
        try{
            const totalProducts =[];
            const products = await this.collection.get();
            products.forEach(doc =>{
                totalProducts.push({id: doc.id, ...doc.data()})
            })
            return totalProducts
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById (id){
        try{
            const doc = await this.collection.doc(id).get();
            if(!doc.exists){
                throw new Error('No se encontro el producto encontrdado')
            } else {
                const data = doc.data();
                return{ ...data, id }
            }
        }catch (error) {
            console.log(error);
        }
    }

    // async editProduct(newProduct){
    //     try{
    //         const product = await this.collection.doc(newProduct.id).set(newProduct);
    //         return product
    //     }catch (error) {
    //         console.log(error);
    //     }
    // }


    async desconectar() {
    }
}


export default ContainerFirebase