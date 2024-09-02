import { Router } from 'express'
import { CompanyController } from '../controllers/index.js'

const companyController = new CompanyController()

const companyRouter = Router()

companyRouter.get('/', companyController.getAll)
companyRouter.get('/:companyId', companyController.getById)
companyRouter.post('/', companyController.create)
companyRouter.put('/:companyId', companyController.update)
companyRouter.delete('/:companyId', companyController.delete)

export default companyRouter
