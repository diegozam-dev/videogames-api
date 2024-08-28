import { CharacterModel } from '../models/index.js'
import BaseRepository from './base.repository.js'

let _characterModel = null

class CharacterRepository extends BaseRepository {
  constructor() {
    super(CharacterModel)
    _characterModel = CharacterModel
  }

  async getAll(pageSize = 10, pageNum = 1) {
    const skips = pageSize * (pageNum - 1)
    return await _characterModel
      .find({}, { createdAt: 0, updatedAt: 0 })
      .skip(skips)
      .limit(pageSize)
      .populate({ path: 'gender', select: 'name' })
  }
}

export default CharacterRepository
