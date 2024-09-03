import mongoose, { Schema } from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'

const platformSchema = new Schema(
  {
    name: {
      type: String,
      maxlenght: 50,
      required: true
    },
    abbreviation: {
      type: String,
      maxlenght: 20,
      required: true
    },
    launchDate: {
      type: Date,
      required: true
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      autopopulate: true,
      required: true
    }
  },
  { versionKey: false, timestamps: true }
)

platformSchema.plugin(mongooseAutoPopulate)
const PlatformModel = mongoose.model('Platform', platformSchema, 'Platform')

export default PlatformModel
