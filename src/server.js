import express, { json } from 'express'
import cors from 'cors'
import router from './routes/index.js'

const app = express()

// MIDDLEWARE
app.use(json())
app.use(cors())

// CONFIG
app.set('x-powered-by', null)

// ROUTES
app.use(router)

export default app
