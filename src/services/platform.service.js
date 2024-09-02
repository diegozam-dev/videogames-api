import BaseService from './base.service.js'
import { PlatformRepository } from '../repositories/index.js'

let _platformRepository = null

class PlatformService extends BaseService {
  constructor() {
    super(PlatformRepository)
    _platformRepository = new PlatformRepository()
  }

  async getAll({ startDate, endDate, company, pageSize, pageNum }) {
    const filter = {}

    if (startDate || endDate) filter.launchDate = {}
    if (startDate) filter.launchDate.$gte = new Date(startDate)
    if (endDate) filter.launchDate.$lte = new Date(endDate)
    if (company) filter.company = company

    return await _platformRepository.getAll({ filter, pageSize, pageNum })
  }
}

export default PlatformService
