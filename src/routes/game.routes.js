import { Router } from 'express'
import verifyToken from '../middlewares/verifyToken.middleware.js'
import { GameController } from '../controllers/index.js'

const gameController = new GameController()

const gameRouter = Router()

gameRouter.get('/', gameController.getAll)
gameRouter.get('/:gameId', gameController.getById)
gameRouter.post('/', verifyToken, gameController.create)
gameRouter.put('/:gameId', verifyToken, gameController.update)
gameRouter.delete('/:gameId', verifyToken, gameController.delete)

export default gameRouter
