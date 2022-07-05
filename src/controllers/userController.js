const { update } = require('../models/users')
const User = require('../models/users')

const getUser = async (req, res) => {
    const getUser = await User.findAll()


    res.status(200).send(getUser)
}

const getUserByID = async (req, res) => {
    const {
        id
    } = req.params;
    const getUser = await User.findAll({
        where: {
            userId: id
        }
    })

    // const getUser = await User.findByPk(id)

    res.status(200).send(getUser)
}

const createUser = async (req, res) => {
    try {
        const {
            userName,
            userPassword,
            firstName,
            lastName,
            sdt,
            typeId
        } = req.body;

        const userModel = {
            userName,
            userPassword,
            firstName,
            lastName,
            sdt,
            typeId
        }

        const result = await User.create(userModel)

        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err)
    }

}

const updateUser = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const {
            userName,
            userPassword,
            firstName,
            lastName,
            sdt,
            typeId
        } = req.body;

        const checkUser = await User.findByPk(id)

        if (checkUser) {
            const userModel = {
                userName,
                userPassword,
                firstName,
                lastName,
                sdt,
                typeId
            }

            // Cách 1:
            const result = await User.update(userModel, {
                where: {
                    userId: id
                }
            })

            // Cách 2:
            
            // result: 0 là có ko có update, 1 là có update 
            res.status(200).send(result)

        } else {
            res.status(400).send("Don't exist")
        }
    } catch (err) {
        res.status(500).send(err)
    }



}

module.exports = {
    getUser,
    getUserByID,
    createUser,
    updateUser
}