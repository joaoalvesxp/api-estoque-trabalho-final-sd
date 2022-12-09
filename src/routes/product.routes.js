const { Router } = require("express");
const ProductController = require("../controllers/ProductController");
const productRoutes = Router();

const  productController = new ProductController();

productRoutes.get('/', productController.list);
//productRoutes.get('/:id', productController.showStock);
productRoutes.post('/', productController.createProduct);
productRoutes.put('/:id/:idstock', productController.updateProduct);
//productRoutes.delete('/:id', productController.deleteStock);

module.exports = productRoutes