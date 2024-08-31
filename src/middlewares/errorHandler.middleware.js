const errorHandler = (err, req, res, next) => {
  const httpStatus = err.status || 500

  return res.status(httpStatus).json({
    status: httpStatus,
    message: err.message || 'Internal server error'
  })
}

export default errorHandler
