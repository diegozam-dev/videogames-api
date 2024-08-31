import { AgeRatingService } from '../services/index.js'

let _ageRatingService = null

class AgeRatingController {
  constructor() {
    _ageRatingService = new AgeRatingService()
  }

  async getAll(req, res, next) {
    const { query } = req

    try {
      const ageRatings = await _ageRatingService.getAll(query)

      res.status(200).json({ status: 'Ok', data: ageRatings })
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    const { ageRatingId } = req.params

    try {
      const ageRating = await _ageRatingService.getById(ageRatingId)

      res.status(200).json({ status: 'Ok', data: ageRating })
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    const { gameId } = req.params
    const { body } = req

    try {
      const cratedAgeRating = await _ageRatingService.create(gameId, body)

      res.status(201).json({ status: 'Created', data: cratedAgeRating })
    } catch (err) {
      next(err)
    }
  }

  async update(req, res, next) {
    const { ageRatingId } = req.params
    const { body } = req

    try {
      const updatedAgeRating = await _ageRatingService.update(ageRatingId, body)

      res.status(200).json({ status: 'Updated', data: updatedAgeRating })
    } catch (err) {
      next(err)
    }
  }

  async delete(req, res, next) {
    const { ageRatingId } = req.params

    try {
      const result = await _ageRatingService.delete(ageRatingId)

      res.status(200).json({ status: 'Deleted', result })
    } catch (err) {
      next(err)
    }
  }
}

export default AgeRatingController
