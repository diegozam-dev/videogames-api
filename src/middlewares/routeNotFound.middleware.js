const routeNotFound = (req, res, next) => {
  res.status(404).json({ message: `Cannot ${req.method} ${req.originalUrl}` })
}

export default routeNotFound
