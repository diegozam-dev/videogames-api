import mongoose, { Schema } from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'

const characterSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: [50, 'Name cannot exceed 50 characters'],
      required: [true, 'Name is required']
    },
    gender: {
      type: String,
      maxlength: [50, 'Gender cannot exceed 50 characters'],
      required: [true, 'Gender is required']
    },
    species: {
      type: String,
      maxlength: [50, 'Species cannot exceed 50 characters'],
      required: [true, 'Species is required']
    },
    games: {
      type: [Schema.Types.ObjectId],
      ref: 'Game',
      autopopulate: true,
      required: [true, 'Games are required']
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    }
  },
  { versionKey: false, timestamps: true }
)

characterSchema.plugin(mongooseAutoPopulate)
const CharacterModel = mongoose.model('Character', characterSchema, 'Character')

export default CharacterModel
