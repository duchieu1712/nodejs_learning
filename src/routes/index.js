const express = require('express');

const rootRouter = express.Router();
const userRoot = require('./v1/userRoute')
const productRoot = require('./v1/productRoute')

rootRouter.use("/v1/user", userRoot)
rootRouter.use("/v1/product", productRoot)

module.exports = rootRouter;