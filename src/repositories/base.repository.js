class BaseRepository {
  constructor(Model) {
    this.model = Model
  }

  async create(entity) {
    return await this.model.create(entity)
  }
}

export default BaseRepository
