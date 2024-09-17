import { Router } from 'express'
import homeRoutes from './home.routes.js'
import companyRouter from './company.routes.js'
import platformRouter from './platform.routes.js'
import gameRouter from './game.routes.js'
import characterRouter from './character.routes.js'
import { swaggerSpec } from '../../swagger/index.js'
import swaggerUi from 'swagger-ui-express'

const apiRoutes = Router()
const router = Router()

apiRoutes.use('/companies', companyRouter)
apiRoutes.use('/platforms', platformRouter)
apiRoutes.use('/games', gameRouter)
apiRoutes.use('/characters', characterRouter)

router.use('/', homeRoutes)
router.use('/v1/api', apiRoutes)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default router
