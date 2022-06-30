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
    
    async desconectar() {
    }
}


export default ContainerFirebase