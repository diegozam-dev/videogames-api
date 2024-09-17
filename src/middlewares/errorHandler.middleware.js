import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import STATUS_CODES from '../utils/statusCodes.utils.js'

const errorHandler = (err, req, res, next) => {
  let messages
  let httpStatus

  if (err instanceof mongoose.Error.ValidationError) {
    const errKeys = Object.keys(err.errors)

    messages = errKeys.map(key => err.errors[key].message)
    httpStatus = 400
  } else if (err instanceof jwt.JsonWebTokenError) {
    httpStatus = 403
    messages = 'Token not valid'
  } else {
    httpStatus = err.status || 500
    messages = err.message
  }

  return res.status(httpStatus).json({
    status: STATUS_CODES[httpStatus],
    messages: messages || 'Something bad is happening'
  })
}

export default errorHandler
