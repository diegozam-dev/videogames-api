import { CharacterService } from '../services/index.js'

let _characterService = null

class CharacterController {
  constructor() {
    _characterService = new CharacterService()
  }

  async getAll(req, res) {
    try {
      const { pageSize, pageNum } = req.query

      const result = await _characterService.getAll(pageSize, pageNum)

      res.status(200).json({ data: result })
    } catch (err) {
      console.log(err.message)
    }
  }

  async create(req, res) {
    try {
      const { name, genderId, speciesId, games, description } = req.body

      const character = await _characterService.create({
        name,
        gender: genderId,
        species: speciesId,
        games,
        description
      })

      res.status(200).json({ data: character })
    } catch (err) {
      console.log(err.message)
    }
  }
}

export default CharacterController
