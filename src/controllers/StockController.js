const uuid = require("uuid");
const uuid4 = uuid.v4();
const fs = require('fs');
const { data } = require("../database/loadDatabase");
const { Stock } = require("../models/Stock");


class StockController {
    list(request, response) {
        response.json(data);
    }

    showStock(request, response) {
        let stockFromDatabase = data;
        const { id } = request.params;

        const indexOfStockID = stockFromDatabase.stocks.findIndex(x=> x.id === id);

        if(indexOfStockID === -1){
            response.json({
                message: "Estoque não encotrado!"
            });
        } else {
            response.json(stockFromDatabase.stocks[indexOfStockID]);
        }

    }

    createStock(request, response) {
         
        const { name, description } = request.body;

        const StockMain = new Stock(uuid4, name, description);

        let stockFromDatabase = data;
        
        stockFromDatabase.stocks.push(StockMain);
        
        fs.writeFile("./src/database/database.json", JSON.stringify(stockFromDatabase , null, 4), function(err) {
            if (err) {
                console.log(err);
            }
        
            console.log("Salvo.")
        });
        
        response.json(stockFromDatabase);

    }

    updateStock(request, response) {
        let stockFromDatabase = data;
        const { id } = request.params;
        const { name, description } = request.body;

        const indexOfStockID = stockFromDatabase.stocks.findIndex(x=> x.id === id);

        if(indexOfStockID === -1){
            response.json({
                message: "Estoque não encotrado!"
            });
        } else {
            stockFromDatabase.stocks[indexOfStockID].name = name;
            stockFromDatabase.stocks[indexOfStockID].description = description;

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

    deleteStock(request, response) {
        let stockFromDatabase = data;
        const { id } = request.params;

        const indexOfStockID = stockFromDatabase.stocks.findIndex(x=> x.id === id);

        if(indexOfStockID === -1){
            response.json({
                message: "Estoque não encotrado!"
            });
        } else {
            stockFromDatabase.stocks.splice(indexOfStockID, 1);

            fs.writeFile("./src/database/database.json", JSON.stringify(stockFromDatabase , null, 4), function(err) {
                if (err) {
                    console.log(err);
                }
                console.log("Deletado!")
            });

            response.json({
                message: "Estoque deletado com sucesso!"
            });
        }
    }
}

module.exports = StockController ;