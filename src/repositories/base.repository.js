class BaseRepository {
  constructor(Model) {
    this.model = Model
  }

  async getAll({ filter = {}, pageSize = 10, pageNum = 1 }) {
    const skips = pageSize * (pageNum - 1)

    return await this.model
      .find(filter, { createdAt: 0, updatedAt: 0 })
      .skip(skips)
      .limit(pageSize)
  }

  async getById(id) {
    return await this.model.findById(id, { createdAt: 0, updatedAt: 0 })
  }

  async create(entity) {
    return await this.model.create(entity)
  }

  async update(id, entity) {
    return await this.model.findByIdAndUpdate(id, entity, { new: true })
  }

  async delete(id) {
    await this.model.findByIdAndDelete(id)
    return true
  }
}

export default BaseRepository
