const { Router } = require("express");

const stocksRouter = require("./stock.routes");
const productsRouter = require("./product.routes");

const routes = Router();

routes.use("/depositos", stocksRouter);
routes.use("/depositos/produtos", productsRouter);

module.exports =  routes;