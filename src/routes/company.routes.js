import { Router } from 'express'
import apicache from 'apicache'
import verifyToken from '../middlewares/verifyToken.middleware.js'
import { CompanyController } from '../controllers/index.js'

const companyController = new CompanyController()
const companyRouter = Router()
const cache = apicache.middleware

/**
 * @swagger
 * /v1/api/companies:
 *  get:
 *   tags:
 *    - Company
 *   summary: Obtener todas las compañías.
 *   description: Retorna una lista de compañías.
 *   parameters:
 *    - $ref: '#/components/parameters/pageSizeParam'
 *    - $ref: '#/components/parameters/pageNumParam'
 *    - $ref: '#/components/parameters/countryParam'
 *    - $ref: '#/components/parameters/startDateParam'
 *    - $ref: '#/components/parameters/endDateParam'
 *   responses:
 *    200:
 *     description: Ok
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status:
 *          type: string
 *          example: Ok
 *         data:
 *          type: array
 *          items:
 *           $ref: '#/components/schemas/CompleteCompany'
 */
companyRouter.get('/', cache('5 minutes'), companyController.getAll)

/**
 * @swagger
 * /v1/api/companies/{companyId}:
 *  get:
 *   tags:
 *    - Company
 *   summary: Obtener una compañía por id.
 *   description: Retorna una compañía.
 *   parameters:
 *    - $ref: '#/components/parameters/companyIdParam'
 *   responses:
 *    200:
 *     description: Ok
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status:
 *          type: string
 *          example: Ok
 *         data:
 *          $ref: '#/components/schemas/CompleteCompany'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 */
companyRouter.get('/:companyId', cache('5 minutes'), companyController.getById)

/**
 * @swagger
 * /v1/api/companies:
 *  post:
 *   tags:
 *    - Company
 *   summary: Crear una compañía.
 *   description: Retorna la compañía creada.
 *   security:
 *    - BearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/BasicCompany'
 *   responses:
 *    201:
 *     description: Creado
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status:
 *          type: string
 *          example: Created
 *         data:
 *          $ref: '#/components/schemas/CompleteCompany'
 *    400:
 *     $ref: '#/components/responses/BadRequest'
 *    401:
 *     $ref: '#/components/responses/Unauthorized'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 */
companyRouter.post('/', verifyToken, companyController.create)

/**
 * @swagger
 * /v1/api/companies/{companyId}:
 *  put:
 *   tags:
 *    - Company
 *   summary: Actualizar una compañía.
 *   description: Retorna la compañía actualizada.
 *   parameters:
 *    - $ref: '#/components/parameters/companyIdParam'
 *   security:
 *    - BearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/BasicCompany'
 *   responses:
 *    200:
 *     description: Actualizado
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status:
 *          type: string
 *          example: Updated
 *         data:
 *          $ref: '#/components/schemas/CompleteCompany'
 *    401:
 *     $ref: '#/components/responses/Unauthorized'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 */
companyRouter.put('/:companyId', verifyToken, companyController.update)

/**
 * @swagger
 * /v1/api/companies/{companyId}:
 *  delete:
 *   tags:
 *    - Company
 *   summary: Eliminar una compañía.
 *   description: Retorna "True" si el proceso fue completado.
 *   security:
 *    - BearerAuth: []
 *   parameters:
 *    - $ref: '#/components/parameters/companyIdParam'
 *   responses:
 *    200:
 *     description: Eliminado
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status:
 *          type: string
 *          example: Deleted
 *         result:
 *          type: boolean
 *    401:
 *     $ref: '#/components/responses/Unauthorized'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 */
companyRouter.delete('/:companyId', verifyToken, companyController.delete)

export default companyRouter
