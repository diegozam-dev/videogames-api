import BaseService from './base.service.js'
import { GameRepository } from '../repositories/index.js'

let _gameRepository = null

class GameService extends BaseService {
  constructor() {
    super(GameRepository)
    _gameRepository = new GameRepository()
  }

  async getAll({ startDate, endDate, genre, category, pageSize, pageNum }) {
    const filter = {}

    if (startDate || endDate) filter.releaseDate = {}
    if (startDate) filter.releaseDate.$gte = new Date(startDate)
    if (endDate) filter.releaseDate.$lte = new Date(endDate)
    if (genre) filter.genres = genre
    if (category) filter.category = category

    return await _gameRepository.getAll({ filter, pageSize, pageNum })
  }
}

export default GameService
