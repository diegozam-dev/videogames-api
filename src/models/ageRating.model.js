import mongoose, { Schema } from 'mongoose'

const contentDescriptionSubSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true
    },
    description: {
      type: String,
      maxlenght: 255,
      required: true
    }
  },
  { versionKey: false }
)

const ageRatingSchema = new Schema(
  {
    category: {
      type: String,
      maxlenght: 20,
      required: true
    },
    rating: {
      type: String,
      maxlenght: 50,
      required: true
    },
    contentDescriptions: {
      type: [contentDescriptionSubSchema],
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
