import { Router } from 'express'
import verifyToken from '../middlewares/verifyToken.middleware.js'
import { CharacterController } from '../controllers/index.js'

const characterController = new CharacterController()

const characterRouter = Router()

characterRouter.get('/', characterController.getAll)
characterRouter.get('/:characterId', characterController.getById)
characterRouter.post('/', verifyToken, characterController.create)
characterRouter.put('/:characterId', verifyToken, characterController.update)
characterRouter.delete('/:characterId', verifyToken, characterController.delete)

export default characterRouter
