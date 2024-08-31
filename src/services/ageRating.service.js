import { AgeRatingRepository, GameRepository } from '../repositories/index.js'
import BaseService from './base.service.js'

let _ageRatingRepository = null
let _gameRepository = null

class AgeRatingService extends BaseService {
  constructor() {
    super(AgeRatingRepository)
    _ageRatingRepository = new AgeRatingRepository()
    _gameRepository = new GameRepository()
  }

  async getAll({ category, rating, pageSize, pageNum }) {
    const filter = {}

    if (category) filter.category = category
    if (rating) filter.rating = rating

    return await _ageRatingRepository.getAll({ filter, pageSize, pageNum })
  }

  async create(gameId, ageRating) {
    if (!gameId) {
      const err = new Error()
      err.status = 400
      err.message = 'game id must be sent'
      throw err
    }

    const game = await _gameRepository.getById(gameId)

    if (!game) {
      const err = new Error()
      err.status = 404
      err.message = `Game, with id: ${gameId}, does not found`
      throw err
    }

    const createdAgeRating = await _ageRatingRepository.create(ageRating)

    game.ageRating = createdAgeRating._id

    await _gameRepository.update(gameId, game)

    return createdAgeRating
  }
}

export default AgeRatingService
