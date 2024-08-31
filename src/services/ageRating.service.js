import { AgeRatingRepository } from '../repositories/index.js'
import BaseService from './base.service.js'

const _ageRatingRepository = new AgeRatingRepository()

class AgeRatingService extends BaseService {
  constructor() {
    super(AgeRatingRepository)
  }

  async getAll({ category, rating, pageSize, pageNum }) {
    const filter = {}

    if (category) filter.category = category
    if (rating) filter.rating = rating

    return await _ageRatingRepository.getAll({ filter, pageSize, pageNum })
  }
}

export default AgeRatingService
