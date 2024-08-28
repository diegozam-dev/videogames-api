import { Router } from 'express'
import homeRoutes from './home.routes.js'
import characterRouter from './character.routes.js'

const apiRoutes = Router()
const router = Router()

// apiRoutes.use('/age-ratings')
// apiRoutes.use('/age-rating-categories')
// apiRoutes.use('/age-rating-cont-desc')
// apiRoutes.use('/age-rating-values')
apiRoutes.use('/characters', characterRouter)
// apiRoutes.use('/character-genders', characterGenderRouter)
// apiRoutes.use('/character-species')
// apiRoutes.use('/companies')
// apiRoutes.use('/countries')
// apiRoutes.use('/games')
// apiRoutes.use('/game-categories')
// apiRoutes.use('/game-genres')
// apiRoutes.use('/game-modes')
// apiRoutes.use('/languages')
// apiRoutes.use('/platforms')

router.use('/', homeRoutes)
router.use('/v1/api', apiRoutes)
// router.use('/api-docs')

export default router
