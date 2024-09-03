import { GameService } from '../services/index.js'

let _gameService = null

class GameController {
  constructor() {
    _gameService = new GameService()
  }

  async getAll(req, res, next) {
    const { query } = req

    try {
      const games = await _gameService.getAll(query)

      res.status(200).json({ status: 'Ok', data: games })
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    const { gameId } = req.params

    try {
      const game = await _gameService.getById(gameId)

      res.status(200).json({ status: 'Ok', data: game })
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    const { body } = req

    try {
      const createdGame = await _gameService.create(body)

      res.status(201).json({ status: 'Created', data: createdGame })
    } catch (err) {
      next(err)
    }
  }

  async update(req, res, next) {
    const { gameId } = req.params
    const { body } = req

    try {
      const updatedGame = await _gameService.update(gameId, body)

      res.status(200).json({ status: 'Updated', data: updatedGame })
    } catch (err) {
      next(err)
    }
  }

  async delete(req, res, next) {
    const { gameId } = req.params

    try {
      const result = await _gameService.delete(gameId)

      res.status(200).json({ status: 'Deleted', result })
    } catch (err) {
      next(err)
    }
  }
}

export default GameController
