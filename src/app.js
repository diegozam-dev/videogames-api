import app from './server.js'
import { PORT } from '../config.js'
import { connectDB } from './db/connection.js'

const start = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log('MongoDB connect successfully')
      console.log(`Listening on port: ${PORT}`)
    })
  } catch (e) {
    console.log(e.message)
  }
}

start()
