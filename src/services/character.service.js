import BaseService from './base.service.js'
import { CharacterRepository } from '../repositories/index.js'

let _characterRepository = null

class CharacterService extends BaseService {
  constructor() {
    super(CharacterRepository)
    _characterRepository = new CharacterRepository()
  }

  async getAll({ gender, species, pageSize, pageNum }) {
    const filter = {}

    if (gender) filter.gender = gender
    if (species) filter.species = species

    return await _characterRepository.getAll({ filter, pageSize, pageNum })
  }
}

export default CharacterService
