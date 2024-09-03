import { CharacterModel } from '../models/index.js'
import BaseRepository from './base.repository.js'

let _characterModel = null

class CharacterRepository extends BaseRepository {
  constructor() {
    super(CharacterModel)
    _characterModel = CharacterModel
  }
}

export default CharacterRepository
