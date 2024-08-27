import mongoose, { Schema } from 'mongoose'

const gameSchema = new Schema(
  {
    name: {
      type: String,
      maxlenght: 50,
      required: true
    },
    genres: {
      type: [Schema.Types.ObjectId],
      ref: 'Genre',
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'GameCategory',
      required: true
    },
    gameModes: {
      type: [Schema.Types.ObjectId],
      ref: 'GameMode',
      required: true
    },
    audioLanguages: {
      type: [Schema.Types.ObjectId],
      ref: 'Language',
      required: true
    },
    textLanguages: {
      type: [Schema.Types.ObjectId],
      ref: 'Language',
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

const GameModel = mongoose.model('Game', gameSchema)

export default GameModel
