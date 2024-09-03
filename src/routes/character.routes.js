import { Router } from 'express'
import { CharacterController } from '../controllers/index.js'

const characterController = new CharacterController()

const characterRouter = Router()

characterRouter.get('/', characterController.getAll)
characterRouter.get('/:characterId', characterController.getById)
characterRouter.post('/', characterController.create)
characterRouter.put('/:characterId', characterController.update)
characterRouter.delete('/:characterId', characterController.delete)

export default characterRouter
