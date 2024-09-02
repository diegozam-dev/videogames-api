import BaseRepository from './base.repository.js'
import { CompanyModel } from '../models/index.js'

let _companyModel = null

class CompanyRepository extends BaseRepository {
  constructor() {
    super(CompanyModel)
    _companyModel = CompanyModel
  }
}

export default CompanyRepository
