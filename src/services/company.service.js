import BaseService from './base.service.js'
import { CompanyRepository } from '../repositories/index.js'

let _companyRepository = null

class CompanyService extends BaseService {
  constructor() {
    super(CompanyRepository)
    _companyRepository = new CompanyRepository()
  }

  async getAll({ startDate, endDate, country, pageSize, pageNum }) {
    const filter = {}

    if (startDate || endDate) filter.startDate = {}
    if (startDate) filter.startDate.$gte = new Date(startDate)
    if (endDate) filter.startDate.$lte = new Date(endDate)
    if (country) filter.country = country

    return await _companyRepository.getAll({ filter, pageSize, pageNum })
  }
}

export default CompanyService
