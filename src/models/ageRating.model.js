import mongoose, { Schema } from 'mongoose'

const ageRatingSchema = new Schema(
  {
    category: {
      type: String,
      maxlenght: 50,
      required: true
    },
    rating: {
      type: String,
      maxlenght: 50,
      required: true
    },
    contentDescriptions: {
      type: [String],
      required: true
    },
    coverUrl: {
      type: String,
      required: true
    }
  },
  { versionKey: false, timestamps: true }
)

const AgeRatingModel = mongoose.model('AgeRating', ageRatingSchema, 'AgeRating')

export default AgeRatingModel
