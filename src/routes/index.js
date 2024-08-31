import { Router } from 'express'
import homeRoutes from './home.routes.js'
import characterRouter from './character.routes.js'
import ageRatingRouter from './ageRating.routes.js'

const apiRoutes = Router()
const router = Router()

apiRoutes.use('/age-ratings', ageRatingRouter)
apiRoutes.use('/characters', characterRouter)
// apiRoutes.use('/companies')
// apiRoutes.use('/games')
// apiRoutes.use('/platforms')

router.use('/', homeRoutes)
router.use('/v1/api', apiRoutes)
// router.use('/api-docs')

export default router
