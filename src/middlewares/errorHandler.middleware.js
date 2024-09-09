import mongoose from 'mongoose'

const STATUS_CODES = {
  400: 'Bad Request',
  404: 'Not Found',
  500: 'Internal Server Error'
}

const errorHandler = (err, req, res, next) => {
  let messages
  let httpStatus

  if (err instanceof mongoose.Error.ValidationError) {
    const errKeys = Object.keys(err.errors)

    messages = errKeys.map(key => err.errors[key].message)
    httpStatus = 400
  } else {
    httpStatus = err.status || 500
    messages = err.message
  }

  return res.status(httpStatus).json({
    status: STATUS_CODES[httpStatus],
    messages: messages || 'Internal server error'
  })
}

export default errorHandler
