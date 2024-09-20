import mongoose, { Schema } from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import { CHARACTER_GENDERS, CHARACTER_SPECIES } from '../utils/enums.utils.js'

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
      required: [true, 'Gender is required'],
      enum: {
        values: CHARACTER_GENDERS,
        message: '`{VALUE}` is not a valid gender for `{PATH}`.'
      },
      default: 'Unknown'
    },
    species: {
      type: String,
      maxlength: [50, 'Species cannot exceed 50 characters'],
      required: [true, 'Species is required'],
      enum: {
        values: CHARACTER_SPECIES,
        message: '`{VALUE}` is not a valid species for `{PATH}`.'
      },
      default: 'Unknown'
    },
    games: {
      type: [Schema.Types.ObjectId],
      ref: 'Game',
      autopopulate: {
        maxDepth: 1,
        select:
          'name genres category gameModes audioLanguages textLanguages realeaseDate publishers developers platforms similarGames'
      },
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
