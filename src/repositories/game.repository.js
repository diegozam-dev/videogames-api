import BaseRepository from './base.repository.js'
import { GameModel } from '../models/index.js'

let _gameModel = null

class GameRepository extends BaseRepository {
  constructor() {
    super(GameModel)
    _gameModel = GameModel
  }
}

export default GameRepository
