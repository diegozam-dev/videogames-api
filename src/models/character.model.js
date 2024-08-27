import mongoose, { Schema } from 'mongoose'

const characterSchema = new Schema(
  {
    name: {
      type: String,
      maxlenght: 50,
      required: true
    },
    gender: {
      type: Schema.Types.ObjectId,
      ref: 'Gender',
      required: true
    },
    species: {
      type: Schema.Types.ObjectId,
      ref: 'Species',
      required: true
    },
    games: {
      type: [Schema.Types.ObjectId],
      ref: 'Game',
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
