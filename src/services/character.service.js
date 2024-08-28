import BaseService from './base.service.js'
import { CharacterRepository } from '../repositories/index.js'

let _characterRepository = null

class CharacterService extends BaseService {
  constructor() {
    super(CharacterRepository)
    _characterRepository = new CharacterRepository()
  }
}

export default CharacterService
