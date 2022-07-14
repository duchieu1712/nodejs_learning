const initModels = require("../models/init-models");
const sequelize = require("../models/index");
const model = initModels(sequelize);
const response = require("../config/response");
const authController = require("./authController");

const getUser = async (req, res) => {
  //   const getUser = await model.users.findAll();

  //   Lấy 1 bảng
  //   const getUser = await model.users.findAll({include:"type"});

  // Lấy 2 bảng 1-n
  //   const getUser = await model.users_type.findAll({include:"users"});

  // Lấy 2 bảng quan hệ n-n
  //   const getUser = await model.orders.findAll({ include: ["product", "user"] });
  const getUser = await model.users.findAll({ include: "product_id_products" });

  response.successCode("Successfully", getUser, res);
};

const getUserByID = async (req, res) => {
  const { id } = req.params;
  const getUser = await model.users.findAll({
    where: {
      userId: id,
    },
  });

  // const getUser = await User.findByPk(id)

  response.successCode("Successfully", getUser, res);
};

const createUser = async (req, res) => {
  try {
    const { user_name, user_password, first_name, last_name, sdt, type_id } =
      req.body;

    const userModel = {
      user_name,
      user_password,
      first_name,
      last_name,
      sdt,
      type_id,
    };

    const result = await model.users.create(userModel);

    response.successCode("Successfully", result, res);
  } catch (err) {
    response.errorCode("Error", res);
    return;
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { user_name, user_password, first_name, last_name, sdt, type_id } =
      req.body;

    const checkUser = await model.users.findByPk(id);

    if (checkUser) {
      const userModel = {
        user_name,
        user_password,
        first_name,
        last_name,
        sdt,
        type_id,
      };

      // Cách 1:
      //   const result = await User.update(userModel, {
      //     where: {
      //       user_id: id,
      //     },
      //   });

      // Cách 2:
      const result = await checkUser.update(userModel);
      // result: 0 là có ko có update, 1 là có update
      response.successCode("Successfully", result, res);
    } else {
      res.status(400).send("Don't exist");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const checkUser = await model.users.findByPk(id);

    if (checkUser) {
      const result = await checkUser.destroy();

      response.successCode("Successfully", result, res);
    } else {
      res.status(400).send("Don't exist");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const signUp = async (req, res) => {
  try {
    const { user_name, user_password, first_name, last_name, sdt, type_id } =
      req.body;

    const checkLogin = await model.users.findOne({
      where: { user_name: user_name },
    });

    if (checkLogin) {
      response.errorCode("Account Existed", res);
    } else {
      const userModel = {
        user_name,
        user_password: authController.hashPassword(user_password),
        first_name,
        last_name,
        sdt,
        type_id,
      };
      const result = await model.users.create(userModel);
      response.successCode("Sign up success", result, res);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const signIn = async (req, res) => {
  try {
    const { user_name, user_password } = req.body;

    // Kiem tra user_name lay ra user
    const checkLogin = await model.users.findOne({
      where: {
        user_name: user_name,
      },
    });

    if (checkLogin) {
      // Kiem tra mat khau
      const checkPass = authController.comparePassword(
        user_password,
        checkLogin.user_password
      );
      if (checkPass) {
        // Tao token va gan cho user
        const token = authController.generateToken(checkLogin)
        response.successCode("Login success", token, res);
      } else {
        response.errorCode("Wrong password", res);
      }
    } else {
      response.errorCode("Wrong user name", res);
    }
  } catch (error) {
    response.failCode("Error",res)
  }
    
  
};

module.exports = {
  getUser,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
  signUp,
  signIn,
};
