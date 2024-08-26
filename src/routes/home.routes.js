import { Router } from 'express'

const homeRoutes = Router()

homeRoutes.get('', (req, res) => {
  res.send('<h1>Hola mundo...</h1>')
})

export default homeRoutes
