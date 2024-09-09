import 'dotenv/config'

export const {
  PORT = 3000,
  MONGODB_URI,
  DB_NAME,
  SECRET_JWT_KEY,
  USERNAME,
  PASSWORD
} = process.env
