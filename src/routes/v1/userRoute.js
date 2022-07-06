const express = require('express');

const userRoute = express.Router();

const userController = require('../../controllers/userController')

userRoute.get("/getUser", userController.getUser)
userRoute.get("/getUserByID/:id", userController.getUserByID)
userRoute.post("/createUser", userController.createUser)
userRoute.put("/updateUser/:id", userController.updateUser)
userRoute.delete("/deleteUser/:id", userController.deleteUser)

module.exports = userRoute;