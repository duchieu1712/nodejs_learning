const initModels = require("../models/init-models");
const sequelize = require("../models/index");
const {Op} = require("sequelize")

const model = initModels(sequelize);

const getProduct = async (req,res) => {
    try {
        const products = await model.products.findAll()
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getProductByKey = async (req,res) => {
    try {
        const {key} = req.params;
        const products = await model.products.findAll({
            where: {
                product_name: {[Op.like]: `%${key}%`}
            }
        })
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error)
    }
}

const createProduct = async (req,res) => {
    try {
        const {product_name, price} = req.body;
        const productModel = {
            product_name,
            price
        }
        const result = await model.products.create(productModel)
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getProduct,
    getProductByKey,
    createProduct
}