import app from './server.js'
import { PORT } from '../config.js'

const start = () => {
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
  })
}

start()
