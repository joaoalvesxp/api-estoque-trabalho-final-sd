const uuid = require("uuid");
const uuid4 = uuid.v4();
const fs = require('fs');
const { data } = require("../database/loadDatabase");
const { Stock } = require("../models/Stock");
const { Product } = require("../models/Product");

class ProductController {
    list(request, response) {
        let stock = data;

        let produtos = {produtos: []}
        stock.stocks.forEach(element => {
            produtos.produtos.push(element.products);
        });

        response.json(produtos);
    }

    createProduct(request, response) {
        const { stockid, name, description, price, quantity } = request.body;
        const product = new Product(uuid4, stockid, name, description, price, quantity);

        let stockFromDatabase = data;
        
        const indexOfStockID = stockFromDatabase.stocks.findIndex(x=> x.id === stockid);

        if(indexOfStockID === -1){
            response.json({
                message: "Estoque não encotrado!"
            });
        } else {
            stockFromDatabase.stocks[indexOfStockID].products.push(product);

            fs.writeFile("./src/database/database.json", JSON.stringify(stockFromDatabase , null, 4), function(err) {
                if (err) {
                    console.log(err);
                }
                console.log("Produto cadastrado!")
            });

            response.json({
                message: "Produto cadastro com sucesso!"
            });
        }
    }

    updateProduct(request, response) {
        let stockFromDatabase = data;
        const url = request.params;

        const id = url.id
        const idStock = url.idstock
        console.log(id, idStock);
        const { name, description, price, quantity } = request.body;

        const indexOfStockID = stockFromDatabase.stocks.findIndex(x=> x.id === idStock);

        if(indexOfStockID === -1) {
            response.json({
                message: "Estoque não encotrado!"
            });
        } else {

            const indexOfProduct = stockFromDatabase.stocks[indexOfStockID].products.findIndex(x=> x.id === id);

            if(indexOfProduct === -1) {
                response.json({
                    message: "Produto não encotrado!"
                });
            }

            else {
                stockFromDatabase.stocks[indexOfStockID].products[indexOfProduct].name = name;
                stockFromDatabase.stocks[indexOfStockID].products[indexOfProduct].description = description;
                stockFromDatabase.stocks[indexOfStockID].products[indexOfProduct].price = price;
                stockFromDatabase.stocks[indexOfStockID].products[indexOfProduct].quantity = quantity;

                fs.writeFile("./src/database/database.json", JSON.stringify(stockFromDatabase , null, 4), function(err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Atualizado!")
                });
    
                response.json({
                    message: "Estoque Atualizado com sucesso!"
                });
            }

            
        }
    }

}

module.exports = ProductController;