import mongoose, { Schema } from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'

const platformSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: [50, 'Name cannot exceed 50 characters'],
      required: [true, 'Name is required']
    },
    abbreviation: {
      type: String,
      maxlength: [20, 'Abbreviation cannot exceed 20 characters'],
      required: [true, 'Abbreviation is required']
    },
    launchDate: {
      type: Date,
      required: [true, 'Launch date is required']
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      autopopulate: { maxDepth: 1, select: 'name' },
      required: [true, 'Company is required']
    }
  },
  { versionKey: false, timestamps: true }
)

platformSchema.plugin(mongooseAutoPopulate)
const PlatformModel = mongoose.model('Platform', platformSchema, 'Platform')

export default PlatformModel
