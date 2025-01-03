import { Router } from 'express'
import apicache from 'apicache'
import verifyToken from '../middlewares/verifyToken.middleware.js'
import { GameController } from '../controllers/index.js'

const gameController = new GameController()
const gameRouter = Router()
const cache = apicache.middleware

/**
 * @swagger
 * /v1/api/games:
 *  get:
 *   tags:
 *    - Game
 *   summary: Obtener todos los videojuegos.
 *   description: Retorna una lista de videojuegos.
 *   parameters:
 *    - $ref: '#/components/parameters/pageSizeParam'
 *    - $ref: '#/components/parameters/pageNumParam'
 *    - $ref: '#/components/parameters/genreParam'
 *    - $ref: '#/components/parameters/categoryParam'
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
 *           $ref: '#/components/schemas/CompleteGame'
 *       examples:
 *        getAllGamesExample:
 *         $ref: '#/components/examples/getAllGamesExample'
 */
gameRouter.get('/', cache('5 minutes'), gameController.getAll)

/**
 * @swagger
 * /v1/api/games/{gameId}:
 *  get:
 *   tags:
 *    - Game
 *   summary: Obtener un videojuego por id.
 *   description: Retorna un videojuego.
 *   parameters:
 *    - $ref: '#/components/parameters/gameIdParam'
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
 *          $ref: '#/components/schemas/CompleteGame'
 *       examples:
 *        getGameExample:
 *         $ref: '#/components/examples/getGameExample'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 */
gameRouter.get('/:gameId', cache('5 minutes'), gameController.getById)

/**
 * @swagger
 * /v1/api/games:
 *  post:
 *   tags:
 *    - Game
 *   summary: Crear un videojuego.
 *   description: Retorna el videojuego creado.
 *   security:
 *    - BearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/BasicGame'
 *      examples:
 *        requestCreateGameExample:
 *         $ref: '#/components/examples/requestCreateGameExample'
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
 *          $ref: '#/components/schemas/CompleteGame'
 *       examples:
 *        responseCreateGameExample:
 *         $ref: '#/components/examples/responseCreateGameExample'
 *    400:
 *     $ref: '#/components/responses/BadRequest'
 *    401:
 *     $ref: '#/components/responses/Unauthorized'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 */
gameRouter.post('/', verifyToken, gameController.create)

/**
 * @swagger
 * /v1/api/games/{gameId}:
 *  put:
 *   tags:
 *    - Game
 *   summary: Actualizar un videojuego.
 *   description: Retorna el videojuego actualizado.
 *   parameters:
 *    - $ref: '#/components/parameters/gameIdParam'
 *   security:
 *    - BearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/BasicGame'
 *      examples:
 *        requestUpdateGameExample:
 *         $ref: '#/components/examples/requestUpdateGameExample'
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
 *          $ref: '#/components/schemas/CompleteGame'
 *       examples:
 *        responseUpdateGameExample:
 *         $ref: '#/components/examples/responseUpdateGameExample'
 *    401:
 *     $ref: '#/components/responses/Unauthorized'
 *    403:
 *     $ref: '#/components/responses/Forbidden'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 */
gameRouter.put('/:gameId', verifyToken, gameController.update)

/**
 * @swagger
 * /v1/api/games/{gameId}:
 *  delete:
 *   tags:
 *    - Game
 *   summary: Eliminar un videojuego.
 *   description: Retorna "True" si el proceso fue completado.
 *   security:
 *    - BearerAuth: []
 *   parameters:
 *    - $ref: '#/components/parameters/gameIdParam'
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
gameRouter.delete('/:gameId', verifyToken, gameController.delete)

export default gameRouter
