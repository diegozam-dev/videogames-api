import { CharacterService } from '../services/index.js'

let _characterService = null

class CharacterController {
  constructor() {
    _characterService = new CharacterService()
  }

  async getAll(req, res, next) {
    const { query } = req

    try {
      const characters = await _characterService.getAll(query)

      res.status(200).json({ status: 'Ok', data: characters })
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    const { characterId } = req.params

    try {
      const character = await _characterService.getAll(characterId)

      res.status(200).json({ status: 'Ok', data: character })
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    const { body } = req

    try {
      const createdCharacter = await _characterService.create(body)

      res.status(201).json({ status: 'Created', data: createdCharacter })
    } catch (err) {
      next(err)
    }
  }

  async update(req, res, next) {
    const { characterId } = req.params
    const { body } = req

    try {
      const updatedCharacter = await _characterService.update(characterId, body)

      res.status(200).json({ status: 'Updated', data: updatedCharacter })
    } catch (err) {
      next(err)
    }
  }

  async delete(req, res, next) {
    const { characterId } = req.params

    try {
      const deletedCharacter = await _characterService.delete(characterId)

      res.status(200).json({ status: 'Deleted', data: deletedCharacter })
    } catch (err) {
      next(err)
    }
  }
}

export default CharacterController
