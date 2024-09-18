import { Router } from 'express'
import { swaggerSpec } from '../../swagger/index.js'
import swaggerUi from 'swagger-ui-express'
import errorHandler from '../middlewares/errorHandler.middleware.js'
import routeNotFound from '../middlewares/routeNotFound.middleware.js'
import companyRouter from './company.routes.js'
import platformRouter from './platform.routes.js'
import gameRouter from './game.routes.js'
import characterRouter from './character.routes.js'

const apiRoutes = Router()
const router = Router()

apiRoutes.use('/companies', companyRouter)
apiRoutes.use('/platforms', platformRouter)
apiRoutes.use('/games', gameRouter)
apiRoutes.use('/characters', characterRouter)

// MIDDLEWARE
apiRoutes.use(errorHandler)
apiRoutes.use(routeNotFound)

router.use('/v1/api', apiRoutes)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default router
