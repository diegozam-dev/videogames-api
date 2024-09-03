import mongoose, { Schema } from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'

const characterSchema = new Schema(
  {
    name: {
      type: String,
      maxlenght: 50,
      required: true
    },
    gender: {
      type: String,
      maxlenght: 50,
      required: true
    },
    species: {
      type: String,
      maxlenght: 50,
      required: true
    },
    games: {
      type: [Schema.Types.ObjectId],
      ref: 'Game',
      autopopulate: true,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  { versionKey: false, timestamps: true }
)

characterSchema.plugin(mongooseAutoPopulate)
const CharacterModel = mongoose.model('Character', characterSchema, 'Character')

export default CharacterModel
