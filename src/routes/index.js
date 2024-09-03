import { Router } from 'express'
import homeRoutes from './home.routes.js'
import ageRatingRouter from './ageRating.routes.js'
import companyRouter from './company.routes.js'
import platformRouter from './platform.routes.js'
import gameRouter from './game.routes.js'
import characterRouter from './character.routes.js'

const apiRoutes = Router()
const router = Router()

apiRoutes.use('/age-ratings', ageRatingRouter)
apiRoutes.use('/companies', companyRouter)
apiRoutes.use('/platforms', platformRouter)
apiRoutes.use('/games', gameRouter)
apiRoutes.use('/characters', characterRouter)

router.use('/', homeRoutes)
router.use('/v1/api', apiRoutes)
// router.use('/api-docs')

export default router
