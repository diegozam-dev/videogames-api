import mongoose, { Schema } from 'mongoose'
import regularSubSchema from '../utils/regularSubSchema.js'

const characterSchema = new Schema(
  {
    name: {
      type: String,
      maxlenght: 50,
      required: true
    },
    gender: {
      type: String,
      maxlenght: 20,
      required: true
    },
    species: {
      type: String,
      maxlenght: 20,
      required: true
    },
    games: {
      type: [regularSubSchema],
      required: true
    },
    description: {
      type: String,
      maxlenght: 255,
      required: true
    }
  },
  { versionKey: false, timestamps: true }
)

const CharacterModel = mongoose.model('Character', characterSchema)

export default CharacterModel
