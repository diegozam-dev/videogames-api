import { Router } from 'express'
import apicache from 'apicache'
import verifyToken from '../middlewares/verifyToken.middleware.js'
import { PlatformController } from '../controllers/index.js'

const platformController = new PlatformController()
const platformRouter = Router()
const cache = apicache.middleware

/**
 * @swagger
 * /v1/api/platforms:
 *  get:
 *   tags:
 *    - Platform
 *   summary: Obtener todas las plataformas.
 *   description: Retorna una lista de plataformas.
 *   parameters:
 *    - $ref: '#/components/parameters/pageSizeParam'
 *    - $ref: '#/components/parameters/pageNumParam'
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
 *           $ref: '#/components/schemas/CompletePlatform'
 *       examples:
 *        getAllPlatformsExample:
 *         $ref: '#/components/examples/getAllPlatformsExample'
 */
platformRouter.get('/', cache('5 minutes'), platformController.getAll)

/**
 * @swagger
 * /v1/api/platforms/{platformId}:
 *  get:
 *   tags:
 *    - Platform
 *   summary: Obtener una plataforma por id.
 *   description: Retorna una plataforma.
 *   parameters:
 *    - $ref: '#/components/parameters/platformIdParam'
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
 *          $ref: '#/components/schemas/CompletePlatform'
 *       examples:
 *        getPlatformExample:
 *         $ref: '#/components/examples/getPlatformExample'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 */
platformRouter.get(
  '/:platformId',
  cache('5 minutes'),
  platformController.getById
)

/**
 * @swagger
 * /v1/api/platforms:
 *  post:
 *   tags:
 *    - Platform
 *   summary: Crear una plataforma.
 *   description: Retorna la plataforma creada.
 *   security:
 *    - BearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/BasicPlatform'
 *      examples:
 *        requestCreatePlatformExample:
 *         $ref: '#/components/examples/requestCreatePlatformExample'
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
 *          $ref: '#/components/schemas/CompletePlatform'
 *       examples:
 *        responseCreatePlatformExample:
 *         $ref: '#/components/examples/responseCreatePlatformExample'
 *    400:
 *     $ref: '#/components/responses/BadRequest'
 *    401:
 *     $ref: '#/components/responses/Unauthorized'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 */
platformRouter.post('/', verifyToken, platformController.create)

/**
 * @swagger
 * /v1/api/platforms/{platformId}:
 *  put:
 *   tags:
 *    - Platform
 *   summary: Actualizar una plataforma.
 *   description: Retorna la plataforma actualizada.
 *   parameters:
 *    - $ref: '#/components/parameters/platformIdParam'
 *   security:
 *    - BearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/BasicPlatform'
 *      examples:
 *        requestUpdatePlatformExample:
 *         $ref: '#/components/examples/requestUpdatePlatformExample'
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
 *          $ref: '#/components/schemas/CompletePlatform'
 *       examples:
 *        responseUpdatePlatformExample:
 *         $ref: '#/components/examples/responseUpdatePlatformExample'
 *    401:
 *     $ref: '#/components/responses/Unauthorized'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 */
platformRouter.put('/:platformId', verifyToken, platformController.update)

/**
 * @swagger
 * /v1/api/platforms/{platformId}:
 *  delete:
 *   tags:
 *    - Platform
 *   summary: Eliminar una plataforma.
 *   description: Retorna "True" si el proceso fue completado.
 *   security:
 *    - BearerAuth: []
 *   parameters:
 *    - $ref: '#/components/parameters/platformIdParam'
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
platformRouter.delete('/:platformId', verifyToken, platformController.delete)

export default platformRouter
