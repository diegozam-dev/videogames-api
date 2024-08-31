import { Router } from 'express'
import { AgeRatingController } from '../controllers/index.js'

const ageRatingController = new AgeRatingController()

const ageRatingRouter = Router()

ageRatingRouter.get('/', ageRatingController.getAll)
ageRatingRouter.get('/:ageRatingId', ageRatingController.getById)
ageRatingRouter.post('/:gameId', ageRatingController.create)
ageRatingRouter.put('/:ageRatingId', ageRatingController.update)
ageRatingRouter.delete('/:ageRatingId', ageRatingController.delete)

export default ageRatingRouter
