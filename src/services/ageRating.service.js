import { AgeRatingRepository } from '../repositories/index.js'
import BaseService from './base.service.js'

let _ageRatingRepository = null

class AgeRatingService extends BaseService {
  constructor() {
    super(AgeRatingRepository)
    _ageRatingRepository = new AgeRatingRepository()
  }

  async getAll({ category, rating, pageSize, pageNum }) {
    const filter = {}

    if (category) filter.category = category
    if (rating) filter.rating = rating

    return await _ageRatingRepository.getAll({ filter, pageSize, pageNum })
  }
}

export default AgeRatingService
