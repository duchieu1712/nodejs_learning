const express = require("express");
const userRoute = express.Router();
const userController = require("../../controllers/userController");
const authController = require("../../controllers/authController");
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/public/img`)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + file.originalname // 6023451234+ten_img.jpg
    cb(null, uniqueSuffix)
  }
})
const upload = multer({storage})

userRoute.post("/upload", upload.single("avatar"), (req, res) => {
  res.send(req.file)
})
userRoute.get("/getUser", authController.verifyToken, userController.getUser);
userRoute.get(
  "/getUserByID/:id",
  authController.verifyToken,
  userController.getUserByID
);
userRoute.post(
  "/createUser",
  authController.verifyToken,
  userController.createUser
);
userRoute.put(
  "/updateUser/:id",
  authController.verifyToken,
  userController.updateUser
);
userRoute.delete(
  "/deleteUser/:id",
  authController.verifyToken,
  userController.deleteUser
);
userRoute.post("/signUp", userController.signUp);
userRoute.post("/signIn", userController.signIn);

module.exports = userRoute;
