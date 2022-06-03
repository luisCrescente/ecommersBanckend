const path = require('path');
const fs = require('fs');

const helpers = {
    
    readJson:  async (archivoJson)=>{ 
    let productsFilePath = await fs.promises.readFile(`./${archivoJson}.json`, "utf-8")
        return JSON.parse(productsFilePath);
    },

    writeJson: async (archivoJson,products)=>{
        
        await fs.promises.writeFile(`./${archivoJson}.json`, JSON.stringify(products, null, '\t'))
    },

    lastId:  (archivoJson) => {
        let last = 0;
        archivoJson.forEach(product => {
            if (last < product.id) {
                last = product.id;
            };
        });
    return last;
    }



}
module.exports = helpers;