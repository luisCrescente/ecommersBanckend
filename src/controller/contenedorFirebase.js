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

    async save(newElement){
        try{
            const save = await this.collection.add(newElement);
            return{...newElement, id: save.id}
        } catch (error) {
            console.log(error);
        }
    }
    
    async getAll (){
        try{
            const totalElement =[];
            const element = await this.collection.get();
            element.forEach(doc =>{
                totalElement.push({id: doc.id, ...doc.data()})
            })
            return totalElement
        } catch (error) {
            console.log(error);
        }
    }

    async getElementById (id){
        try{
            const doc = await this.collection.doc(id).get();
            if(!doc.exists){
                throw new Error('Error al borrar, no se pudo encontrar')
            } else {
                const data = doc.data();
                return{ ...data, id }
            }
        }catch (error) {
            console.log(error);
        }
    }

    // async updateElement(newProduct){
    //     try{
    //         const product = await this.collection.doc(newProduct.id).set(newProduct);
    //         return product
    //     }catch (error) {
    //         console.log(error);
    //     }
    // }

    async delete(id) {
        try{
            const element = await this.collection.doc(id).delete();
            return element
        }catch (error) {
            console.log(error);
        }
    };

    async desconectar() {
    }
}


export default ContainerFirebase