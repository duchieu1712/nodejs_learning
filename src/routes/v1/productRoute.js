const express = require('express');

const productRoute = express.Router();

const productController = require('../../controllers/productController')

productRoute.get("/getProduct", productController.getProduct)
productRoute.get("/getProductByKey/:key", productController.getProductByKey)
productRoute.post("/createProduct", productController.createProduct)

module.exports = productRoute;