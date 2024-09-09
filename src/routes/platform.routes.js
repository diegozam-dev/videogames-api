import { Router } from 'express'
import verifyToken from '../middlewares/verifyToken.middleware.js'
import { PlatformController } from '../controllers/index.js'

const platformController = new PlatformController()

const platformRouter = Router()

platformRouter.get('/', platformController.getAll)
platformRouter.get('/:platformId', platformController.getById)
platformRouter.post('/', verifyToken, platformController.create)
platformRouter.put('/:platformId', verifyToken, platformController.update)
platformRouter.delete('/:platformId', verifyToken, platformController.delete)

export default platformRouter
