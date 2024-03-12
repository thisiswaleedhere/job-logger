const { StatusCodes } = require('http-status-codes')


const errorHandlerMiddleware = (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong. Try again later"
    }

    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field. Please choose another value`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    if (err.name === "ValidationError") {
        // Use this in case you wanna be more explicit
        // console.log(Object.values(err.errors).map((item) => item.message).join(','))
        customError.msg = "Please provide all details"
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    if (err.name === "CastError") {
        customError.msg = `No item found with id: ${err.value}`
        customError.statusCode = StatusCodes.NOT_FOUND
    }

    return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware