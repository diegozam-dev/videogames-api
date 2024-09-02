import BaseRepository from './base.repository.js'
import { PlatformModel } from '../models/index.js'

let _platformModel = null

class PlatformRepository extends BaseRepository {
  constructor() {
    super(PlatformModel)
    _platformModel = PlatformModel
  }
}

export default PlatformRepository
