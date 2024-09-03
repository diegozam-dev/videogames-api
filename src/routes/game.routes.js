import { Router } from 'express'
import { GameController } from '../controllers/index.js'

const gameController = new GameController()

const gameRouter = Router()

gameRouter.get('/', gameController.getAll)
gameRouter.get('/:gameId', gameController.getById)
gameRouter.post('/', gameController.create)
gameRouter.put('/:gameId', gameController.update)
gameRouter.delete('/:gameId', gameController.delete)

export default gameRouter
