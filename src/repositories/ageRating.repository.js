import BaseRepository from './base.repository.js'
import { AgeRatingModel } from '../models/index.js'

class AgeRatingRepository extends BaseRepository {
  constructor() {
    super(AgeRatingModel)
  }
}

export default AgeRatingRepository
