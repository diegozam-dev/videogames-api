import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY, USER_NAME, PASSWORD } from '../../config.js'

const verifyToken = (req, res, next) => {
  const header = req.header('Authorization') || ''
  const token = header.split(' ')[1]

  try {
    if (!token) {
      const error = new Error()
      error.status = 401
      error.message = 'Token not provied'
      throw error
    }

    const payload = jwt.verify(token, SECRET_JWT_KEY)

    if (USER_NAME !== payload.username || PASSWORD !== payload.password) {
      const error = new Error()
      error.status = 403
      error.message = 'Token not valid'
      throw error
    }

    next()
  } catch (err) {
    next(err)
  }
}

export default verifyToken
