class BaseService {
  constructor(Repository) {
    this.repository = new Repository()
  }

  async getAll(pageSize, pageNum) {
    return await this.repository.getAll(pageSize, pageNum)
  }

  async create(entity) {
    return await this.repository.create(entity)
  }
}

export default BaseService
