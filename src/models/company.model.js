import mongoose, { Schema } from 'mongoose'

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
      default: []
    },
    published: {
      type: [Schema.Types.ObjectId],
      ref: 'Game',
      default: []
    },
    description: {
      type: String,
      required: true
    }
  },
  { versionKey: false, timestamps: true }
)

const CompanyModel = mongoose.model('Company', companySchema, 'Company')

export default CompanyModel
