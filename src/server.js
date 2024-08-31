import express, { json } from 'express'
import cors from 'cors'
import router from './routes/index.js'
import errorHandler from './middlewares/errorHandler.middleware.js'

const app = express()

// CONFIG
app.set('x-powered-by', null)

// ROUTES
app.use(router)

// MIDDLEWARE
app.use(json())
app.use(cors())
app.use(errorHandler)

export default app
