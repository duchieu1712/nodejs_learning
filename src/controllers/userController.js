const initModels = require("../models/init-models");
const sequelize = require("../models/index");

const model = initModels(sequelize);

const getUser = async (req, res) => {
  //   const getUser = await model.users.findAll();

  //   Lấy 1 bảng
  //   const getUser = await model.users.findAll({include:"type"});

  // Lấy 2 bảng 1-n
  //   const getUser = await model.users_type.findAll({include:"users"});

  // Lấy 2 bảng quan hệ n-n
//   const getUser = await model.orders.findAll({ include: ["product", "user"] });
const getUser = await model.users.findAll({ include: "product_id_products" });

  res.status(200).send(getUser);
};

const getUserByID = async (req, res) => {
  const { id } = req.params;
  const getUser = await model.users.findAll({
    where: {
      userId: id,
    },
  });

  // const getUser = await User.findByPk(id)

  res.status(200).send(getUser);
};

const createUser = async (req, res) => {
  try {
    const { userName, userPassword, firstName, lastName, sdt, typeId } =
      req.body;

    const userModel = {
      userName,
      userPassword,
      firstName,
      lastName,
      sdt,
      typeId,
    };

    const result = await model.users.create(userModel);

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { userName, userPassword, firstName, lastName, sdt, typeId } =
      req.body;

    const checkUser = await model.users.findByPk(id);

    if (checkUser) {
      const userModel = {
        userName,
        userPassword,
        firstName,
        lastName,
        sdt,
        typeId,
      };

      // Cách 1:
      //   const result = await User.update(userModel, {
      //     where: {
      //       userId: id,
      //     },
      //   });

      // Cách 2:
      const result = await checkUser.update(userModel);
      // result: 0 là có ko có update, 1 là có update
      res.status(200).send(result);
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

      res.status(200).send(result);
    } else {
      res.status(400).send("Don't exist");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getUser,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
};
