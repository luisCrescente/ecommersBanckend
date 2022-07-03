const connect = require('mongoose').connect;

const uri = 'mongodb+srv://luis:8986cc7cc5@cluster0.6wsge.mongodb.net/ecommerce?retryWrites=true&w=majority';

async function connectMongoDb() {
    try {
        const client = await connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('Base de datos conectada', client.connection.name);
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectMongoDb;