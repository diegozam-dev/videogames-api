import mongoose, { Schema } from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import { COUNTRIES } from '../utils/enums.utils.js'

const companySchema = new Schema(
  {
    name: {
      type: String,
      maxlength: [50, 'Name cannot exceed 50 characters'],
      required: [true, 'Name is required']
    },
    country: {
      type: String,
      maxlength: [50, 'Country cannot exceed 50 characters'],
      enum: {
        values: COUNTRIES,
        message: '`{VALUE}` is not a valid country for `{PATH}`.'
      },
      required: [true, 'Country is required']
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    developed: {
      type: [Schema.Types.ObjectId],
      ref: 'Game',
      autopopulate: {
        maxDepth: 1,
        select:
          'name genres category gameModes audioLanguages textLanguages realeaseDate publishers developers platforms similarGames'
      },
      default: []
    },
    published: {
      type: [Schema.Types.ObjectId],
      ref: 'Game',
      autopopulate: {
        maxDepth: 1,
        select:
          'name genres category gameModes audioLanguages textLanguages realeaseDate publishers developers platforms similarGames'
      },
      default: []
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    }
  },
  { versionKey: false, timestamps: true }
)

companySchema.plugin(mongooseAutoPopulate)
const CompanyModel = mongoose.model('Company', companySchema, 'Company')

export default CompanyModel
