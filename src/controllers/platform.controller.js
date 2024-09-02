import { PlatformService } from '../services/index.js'

let _platformService = null

class PlatformController {
  constructor() {
    _platformService = new PlatformService()
  }

  async getAll(req, res, next) {
    const { query } = req

    try {
      const platforms = await _platformService.getAll(query)

      res.status(200).json({ status: 'Ok', data: platforms })
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    const { platformId } = req.params

    try {
      const platform = await _platformService.getById(platformId)

      res.status(200).json({ status: 'Ok', data: platform })
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    const { body } = req

    try {
      const createdPlatform = await _platformService.create(body)

      res.status(201).json({ status: 'Created', data: createdPlatform })
    } catch (err) {
      next(err)
    }
  }

  async update(req, res, next) {
    const { platformId } = req.params
    const { body } = req

    try {
      const updatedPlatform = await _platformService.update(platformId, body)

      res.status(200).json({ status: 'Updated', data: updatedPlatform })
    } catch (err) {
      next(err)
    }
  }

  async delete(req, res, next) {
    const { platformId } = req.params

    try {
      const result = await _platformService.delete(platformId)

      res.status(200).json({ status: 'Deleted', result })
    } catch (err) {
      next(err)
    }
  }
}

export default PlatformController
