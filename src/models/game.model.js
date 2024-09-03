import mongoose, { Schema } from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'

const gameSchema = new Schema(
  {
    name: {
      type: String,
      maxlenght: 50,
      required: true
    },
    genres: {
      type: [String],
      maxlenght: 50,
      required: true
    },
    category: {
      type: String,
      maxlenght: 50,
      required: true
    },
    gameModes: {
      type: [String],
      maxlenght: 50,
      required: true
    },
    audioLanguages: {
      type: [String],
      maxlenght: 50,
      required: true
    },
    textLanguages: {
      type: [String],
      maxlenght: 50,
      required: true
    },
    releaseDate: {
      type: Date,
      required: true
    },
    publishers: {
      type: [Schema.Types.ObjectId],
      ref: 'Company',
      autopopulate: true,
      required: true
    },
    developers: {
      type: [Schema.Types.ObjectId],
      ref: 'Company',
      autopopulate: true,
      required: true
    },
    ageRating: {
      type: Schema.Types.ObjectId,
      ref: 'AgeRating',
      autopopulate: true,
      default: null
    },
    coverUrl: {
      type: String,
      required: true
    },
    platforms: {
      type: [Schema.Types.ObjectId],
      ref: 'Platform',
      autopopulate: true,
      required: true
    },
    similarGames: {
      type: [Schema.Types.ObjectId],
      ref: 'Game',
      autopopulate: true
    }
  },
  { versionKey: false, timestamps: true }
)

gameSchema.plugin(mongooseAutoPopulate)
const GameModel = mongoose.model('Game', gameSchema, 'Game')

export default GameModel
