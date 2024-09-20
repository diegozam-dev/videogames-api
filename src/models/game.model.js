import mongoose, { Schema } from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import {
  GAME_CATEGORIES,
  GAME_GENRES,
  GAME_MODES,
  LANGUAGES
} from '../utils/enums.utils.js'

const gameSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: [50, 'Name cannot exceed 50 characters'],
      required: [true, 'Name is required']
    },
    genres: {
      type: [String],
      maxlength: [50, 'Genres cannot exceed 50 characters'],
      enum: {
        values: GAME_GENRES,
        message: '`{VALUE}` is not a valid genre for `{PATH}`.'
      },
      required: [true, 'Genres are required']
    },
    category: {
      type: String,
      maxlength: [50, 'Category cannot exceed 50 characters'],
      enum: {
        values: GAME_CATEGORIES,
        message: '`{VALUE}` is not a valid category for `{PATH}`.'
      },
      required: [true, 'Category is required']
    },
    gameModes: {
      type: [String],
      maxlength: [50, 'Game modes cannot exceed 50 characters'],
      enum: {
        values: GAME_MODES,
        message: '`{VALUE}` is not a valid game mode for `{PATH}`.'
      },
      required: [true, 'Game modes are required']
    },
    languages: {
      type: [String],
      maxlength: [50, 'Languages cannot exceed 50 characters'],
      enum: {
        values: LANGUAGES,
        message: '`{VALUE}` is not a valid language for `{PATH}`.'
      },
      required: [true, 'Languages are required']
    },
    releaseDate: {
      type: Date,
      required: [true, 'Release date is required']
    },
    publishers: {
      type: [Schema.Types.ObjectId],
      ref: 'Company',
      autopopulate: {
        maxDepth: 1,
        select: 'name country startDate developed published description'
      },
      required: [true, 'Publishers are required']
    },
    developers: {
      type: [Schema.Types.ObjectId],
      ref: 'Company',
      autopopulate: {
        maxDepth: 1,
        select: 'name country startDate developed published description'
      },
      required: [true, 'Developers are required']
    },
    platforms: {
      type: [Schema.Types.ObjectId],
      ref: 'Platform',
      autopopulate: {
        maxDepth: 1,
        select: 'name abbreviation launchDate company'
      },
      required: [true, 'Platforms are required']
    },
    similarGames: {
      type: [Schema.Types.ObjectId],
      ref: 'Game',
      autopopulate: {
        maxDepth: 1,
        select:
          'name genres category gameModes audioLanguages textLanguages realeaseDate publishers developers platforms similarGames'
      },
      default: []
    }
  },
  { versionKey: false, timestamps: true }
)

gameSchema.plugin(mongooseAutoPopulate)
const GameModel = mongoose.model('Game', gameSchema, 'Game')

export default GameModel
