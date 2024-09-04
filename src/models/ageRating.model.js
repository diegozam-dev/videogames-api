import mongoose, { Schema } from 'mongoose'

const ageRatingSchema = new Schema(
  {
    category: {
      type: String,
      maxlength: [50, 'Category cannot exceed 50 characters'],
      required: [true, 'Category is required']
    },
    rating: {
      type: String,
      maxlength: [50, 'Rating cannot exceed 50 characters'],
      required: [true, 'Rating is required']
    },
    contentDescriptions: {
      type: [String],
      required: [true, 'Content descriptions are required']
    },
    coverUrl: {
      type: String,
      required: [true, 'Cover URL is required']
    }
  },
  { versionKey: false, timestamps: true }
)

const AgeRatingModel = mongoose.model('AgeRating', ageRatingSchema, 'AgeRating')

export default AgeRatingModel
