import mongoose, { Schema } from 'mongoose'

const ageRatingSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'AgeRatingCategory',
      required: true
    },
    rating: {
      type: Schema.Types.ObjectId,
      ref: 'Rating',
      required: true
    },
    contentDescriptions: {
      type: [Schema.Types.ObjectId],
      ref: 'AgeRatingContDesc',
      required: true
    },
    coverUrl: {
      type: String,
      required: true
    }
  },
  { versionKey: false, timestamps: true }
)

const AgeRatingModel = mongoose.model('AgeRating', ageRatingSchema)

export default AgeRatingModel
