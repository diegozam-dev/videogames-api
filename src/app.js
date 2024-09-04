import express, { json } from 'express'
import cors from 'cors'
import router from './routes/index.js'
import errorHandler from './middlewares/errorHandler.middleware.js'

const app = express()

// MIDDLEWARE
app.use(json())
app.use(cors())

// CONFIG
app.set('x-powered-by', null)

// ROUTES
app.use(router)

// ERROR HANDLER
app.use(errorHandler)

export default app
