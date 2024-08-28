import mongoose, { Schema } from 'mongoose'

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
      required: true
    },
    developers: {
      type: [Schema.Types.ObjectId],
      ref: 'Company',
      required: true
    },
    ageRating: {
      type: Schema.Types.ObjectId,
      ref: 'AgeRating',
      required: true
    },
    coverUrl: {
      type: String,
      required: true
    },
    platforms: {
      type: [Schema.Types.ObjectId],
      ref: 'Platform',
      required: true
    },
    similarGames: {
      type: [Schema.Types.ObjectId],
      ref: 'Game'
    }
  },
  { versionKey: false, timestamps: true }
)

const GameModel = mongoose.model('Game', gameSchema, 'Game')

export default GameModel
