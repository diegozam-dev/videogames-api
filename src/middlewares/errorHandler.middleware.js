import mongoose from 'mongoose'

const STATUS_CODES = {
  400: 'Bad Request',
  404: 'Not Found',
  500: 'Internal Server Error'
}

const errorHandler = (err, req, res, next) => {
  const messages = []
  let httpStatus

  if (err instanceof mongoose.Error.ValidationError) {
    const errKeys = Object.keys(err.errors)

    errKeys.forEach(key => messages.push(err.errors[key].message))
    httpStatus = 400
  } else {
    httpStatus = err.status ? err.status : 500
    messages.push(err.message)
  }

  return res.status(httpStatus).json({
    status: STATUS_CODES[httpStatus],
    messages: messages.length > 0 ? messages : 'Internal server error'
  })
}

export default errorHandler
