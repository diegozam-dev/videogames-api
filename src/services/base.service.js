class BaseService {
  constructor(Repository) {
    this.repository = new Repository()
  }

  async getAll({ pageSize, pageNum }) {
    return await this.repository.getAll({
      pageSize,
      pageNum
    })
  }

  async getById(id) {
    if (!id) {
      const err = new Error()
      err.status = 400
      err.message = 'id must be sent'
      throw err
    }

    const currentEntity = await this.repository.getById(id)

    if (!currentEntity) {
      const err = new Error()
      err.status = 404
      err.message = `Entity, with id: ${id}, does not found`
      throw err
    }

    return currentEntity
  }

  async create(entity) {
    return await this.repository.create(entity)
  }

  async update(id, entity) {
    if (!id) {
      const err = new Error()
      err.status = 400
      err.message = 'id must be sent'
      throw err
    }

    return await this.repository.update(id, entity)
  }

  async delete(id) {
    if (!id) {
      const err = new Error()
      err.status = 400
      err.message = 'id must be sent'
      throw err
    }

    return await this.repository.delete(id)
  }
}

export default BaseService
