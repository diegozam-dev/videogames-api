import mongoose from 'mongoose'
import { MONGODB_URI, DB_NAME } from '../../config.js'

export const connectDB = async () => {
  await mongoose.connect(MONGODB_URI, {
    dbName: DB_NAME
  })
}
