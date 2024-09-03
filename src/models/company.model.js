import mongoose, { Schema } from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'

const companySchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      required: true
    },
    country: {
      type: String,
      maxlenght: 50,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    developed: {
      type: [Schema.Types.ObjectId],
      ref: 'Game',
      autopopulate: true,
      default: []
    },
    published: {
      type: [Schema.Types.ObjectId],
      ref: 'Game',
      autopopulate: true,
      default: []
    },
    description: {
      type: String,
      required: true
    }
  },
  { versionKey: false, timestamps: true }
)

companySchema.plugin(mongooseAutoPopulate)
const CompanyModel = mongoose.model('Company', companySchema, 'Company')

export default CompanyModel
