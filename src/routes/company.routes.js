import { Router } from 'express'
import verifyToken from '../middlewares/verifyToken.middleware.js'
import { CompanyController } from '../controllers/index.js'

const companyController = new CompanyController()

const companyRouter = Router()

companyRouter.get('/', companyController.getAll)
companyRouter.get('/:companyId', companyController.getById)
companyRouter.post('/', verifyToken, companyController.create)
companyRouter.put('/:companyId', verifyToken, companyController.update)
companyRouter.delete('/:companyId', verifyToken, companyController.delete)

export default companyRouter
