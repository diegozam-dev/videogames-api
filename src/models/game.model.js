import mongoose, { Schema } from 'mongoose'
import regularSubSchema from '../utils/regularSubSchema.js'

const gameSchema = new Schema(
  {
    name: {
      type: String,
      maxlenght: 50,
      required: true
    },
    genres: {
      type: [String],
      required: true
    },
    category: {
      type: String,
      maxlenght: 50,
      required: true
    },
    gameModes: {
      type: [String],
      required: true
    },
    audioLanguages: {
      type: [String],
      required: true
    },
    textLanguages: {
      type: [String],
      required: true
    },
    releaseDate: {
      type: Date,
      required: true
    },
    publishers: {
      type: [regularSubSchema],
      required: true
    },
    developers: {
      type: [regularSubSchema],
      required: true
    },
    ageRating: {
      type: Schema.Types.ObjectId,
      required: true
    },
    coverUrl: {
      type: String,
      required: true
    },
    platforms: {
      type: [regularSubSchema],
      required: true
    },
    similarGames: {
      type: [regularSubSchema],
      required: true
    }
  },
  { versionKey: false, timestamps: true }
)

const GameModel = mongoose.model('Game', gameSchema)

export default GameModel
