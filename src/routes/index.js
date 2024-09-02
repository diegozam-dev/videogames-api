import { Router } from 'express'
import homeRoutes from './home.routes.js'
import characterRouter from './character.routes.js'
import ageRatingRouter from './ageRating.routes.js'
import companyRouter from './company.routes.js'

const apiRoutes = Router()
const router = Router()

apiRoutes.use('/age-ratings', ageRatingRouter)
apiRoutes.use('/companies', companyRouter)
// apiRoutes.use('/platforms')
apiRoutes.use('/characters', characterRouter)
// apiRoutes.use('/games')

router.use('/', homeRoutes)
router.use('/v1/api', apiRoutes)
// router.use('/api-docs')

export default router
