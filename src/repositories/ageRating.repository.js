import BaseRepository from './base.repository.js'
import { AgeRatingModel } from '../models/index.js'

let _ageRatingModel = AgeRatingModel

class AgeRatingRepository extends BaseRepository {
  constructor() {
    super(AgeRatingModel)
    _ageRatingModel = AgeRatingModel
  }
}

export default AgeRatingRepository
