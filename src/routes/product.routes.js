const { Router } = require("express");
const StockController = require("../controllers/StockController")
const stockRoutes = Router();

const  stockController = new StockController();
stockRoutes.get('/deposito/', stockController.list);
stockRoutes.get('/:id', stockController.showStock);
stockRoutes.post('/', stockController.createStock);
stockRoutes.put('/:id', stockController.updateStock);
stockRoutes.delete('/:id', stockController.deleteStock);

module.exports = stockRoutes