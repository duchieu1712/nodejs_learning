const successCode = (message, data, res) => {
    res.status(200).send({
        statusCode: 200,
        message,
        data
    })
}

const errorCode = (message, res) => {
    res.status(400).send({
        statusCode: 400,
        message,
    })
}

const failCode = (message, res) => {
    res.status(500).send({
        statusCode: 500,
        message,
    })
}

module.exports = {
    successCode,
    errorCode,
    failCode
}