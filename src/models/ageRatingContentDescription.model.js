import mongoose, { Schema } from 'mongoose'

const ageRatingContentDescriptionSchema = new Schema(
  {
    category: {
      type: String,
      maxlenght: 100,
      required: true
    },
    description: {
      type: String,
      maxlenght: 255,
      required: true
    }
  },
  { versionKey: false, timestamps: true }
)

const AgeRatingContentDescriptionModel = mongoose.model(
  'AgeRatingContentDescription',
  ageRatingContentDescriptionSchema
)

export default AgeRatingContentDescriptionModel
