const express = require('express');

const rootRouter = express.Router();
const userRoot = require('./v1/userRoute')

rootRouter.use("/v1/user", userRoot)

module.exports = rootRouter;