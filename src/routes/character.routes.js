import { Router } from 'express'
import { CharacterController } from '../controllers/index.js'

const characterController = new CharacterController()

const characterRouter = Router()

characterRouter.get('/', characterController.getAll)
characterRouter.post('/', characterController.create)

export default characterRouter
