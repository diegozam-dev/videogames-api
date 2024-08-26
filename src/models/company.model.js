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
      maxlength: 50,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    developed: {
      type: [Schema.Types.ObjectId],
      ref: 'Game'
    },
    published: {
      type: [Schema.Types.ObjectId],
      ref: 'Game'
    },
    description: {
      type: String,
      maxlength: 255,
      required: true
    }
  },
  { versionKey: false, timestamps: true }
)

const CompanyModel = mongoose.model('Company', companySchema)

export default CompanyModel
