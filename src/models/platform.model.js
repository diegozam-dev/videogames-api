import mongoose, { Schema } from 'mongoose'
import regularSubSchema from '../utils/regularSubSchema.js'

const platformSchema = new Schema(
  {
    name: {
      type: String,
      maxlenght: 50,
      required: true
    },
    abbreviation: {
      type: String,
      maxlenght: 20
    },
    launchDate: {
      type: Date,
      required: true
    },
    company: {
      type: regularSubSchema,
      required: true
    }
  },
  { versionKey: false, timestamps: true }
)

const PlatformModel = mongoose.model('Platform', platformSchema)

export default PlatformModel
