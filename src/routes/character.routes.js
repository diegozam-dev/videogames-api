import { Router } from 'express'
import apicache from 'apicache'
import verifyToken from '../middlewares/verifyToken.middleware.js'
import { CharacterController } from '../controllers/index.js'

const characterController = new CharacterController()
const characterRouter = Router()
const cache = apicache.middleware

/**
 * @swagger
 * /v1/api/characters:
 *  get:
 *   tags:
 *    - Character
 *   summary: Obtener todos los personajes.
 *   description: Retorna una lista de personajes.
 *   parameters:
 *    - $ref: '#/components/parameters/pageSizeParam'
 *    - $ref: '#/components/parameters/pageNumParam'
 *    - $ref: '#/components/parameters/genderParam'
 *    - $ref: '#/components/parameters/speciesParam'
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
 *           $ref: '#/components/schemas/CompleteCharacter'
 */
characterRouter.get('/', cache('5 minutes'), characterController.getAll)

/**
 * @swagger
 * /v1/api/characters/{characterId}:
 *  get:
 *   tags:
 *    - Character
 *   summary: Obtener un personaje por id.
 *   description: Retorna un personaje.
 *   parameters:
 *    - $ref: '#/components/parameters/characterIdParam'
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
 *          $ref: '#/components/schemas/CompleteCharacter'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 */
characterRouter.get(
  '/:characterId',
  cache('5 minutes'),
  characterController.getById
)

/**
 * @swagger
 * /v1/api/characters:
 *  post:
 *   tags:
 *    - Character
 *   summary: Crear un personaje.
 *   description: Retorna el personaje creado.
 *   security:
 *    - BearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/BasicCharacter'
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
 *          $ref: '#/components/schemas/CompleteCharacter'
 *    400:
 *     $ref: '#/components/responses/BadRequest'
 *    401:
 *     $ref: '#/components/responses/Unauthorized'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 */
characterRouter.post('/', verifyToken, characterController.create)

/**
 * @swagger
 * /v1/api/characters/{characterId}:
 *  put:
 *   tags:
 *    - Character
 *   summary: Actualizar un personaje.
 *   description: Retorna el personaje actualizado.
 *   parameters:
 *    - $ref: '#/components/parameters/characterIdParam'
 *   security:
 *    - BearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/BasicCharacter'
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
 *          $ref: '#/components/schemas/CompleteCharacter'
 *    401:
 *     $ref: '#/components/responses/Unauthorized'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 */
characterRouter.put('/:characterId', verifyToken, characterController.update)

/**
 * @swagger
 * /v1/api/characters/{characterId}:
 *  delete:
 *   tags:
 *    - Character
 *   summary: Eliminar un personaje.
 *   description: Retorna "True" si el proceso fue completado.
 *   security:
 *    - BearerAuth: []
 *   parameters:
 *    - $ref: '#/components/parameters/characterIdParam'
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
characterRouter.delete('/:characterId', characterController.delete)

export default characterRouter
