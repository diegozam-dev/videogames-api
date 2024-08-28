import mongoose, { Schema } from 'mongoose'

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
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true
    }
  },
  { versionKey: false, timestamps: true }
)

const PlatformModel = mongoose.model('Platform', platformSchema, 'Platform')

export default PlatformModel
