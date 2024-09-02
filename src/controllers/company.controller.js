import { CompanyService } from '../services/index.js'

let _companyService = null

class CompanyController {
  constructor() {
    _companyService = new CompanyService()
  }

  async getAll(req, res, next) {
    const { query } = req

    try {
      const companies = await _companyService.getAll(query)

      res.status(200).json({ status: 'Ok', data: companies })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  async getById(req, res, next) {
    const { companyId } = req.params
    try {
      const company = await _companyService.getById(companyId)

      res.status(200).json({ status: 'Ok', data: company })
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    const { body } = req

    try {
      const createdCompany = await _companyService.create(body)

      res.status(201).json({ status: 'Created', data: createdCompany })
    } catch (err) {
      next(err)
    }
  }

  async update(req, res, next) {
    const { companyId } = req.params
    const { body } = req

    try {
      const updatedCompany = await _companyService.update(companyId, body)

      res.status(200).json({ status: 'Updated', data: updatedCompany })
    } catch (err) {
      next(err)
    }
  }

  async delete(req, res, next) {
    const { companyId } = req.params

    try {
      const result = await _companyService.delete(companyId)

      res.status(200).json({ status: 'Deleted', result })
    } catch (err) {
      next(err)
    }
  }
}

export default CompanyController
