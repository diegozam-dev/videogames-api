import { Router } from 'express'
import { PlatformController } from '../controllers/index.js'

const platformController = new PlatformController()

const platformRouter = Router()

platformRouter.get('/', platformController.getAll)
platformRouter.get('/:platformId', platformController.getById)
platformRouter.post('/', platformController.create)
platformRouter.put('/:platformId', platformController.update)
platformRouter.delete('/:platformId', platformController.delete)

export default platformRouter
