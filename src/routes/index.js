const { Router } = require("express");

const stocksRouter = require("./stock.routes");
const productsRouter = require("./product.routes");

const routes = Router();

routes.use("/depositos", stocksRouter);
routes.use("/produtos", productsRouter);

module.exports = routes;