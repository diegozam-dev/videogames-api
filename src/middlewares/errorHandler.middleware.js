import mongoose from 'mongoose'

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
    status: httpStatus,
    messages: messages.length > 0 || 'Internal server error'
  })
}

export default errorHandler
