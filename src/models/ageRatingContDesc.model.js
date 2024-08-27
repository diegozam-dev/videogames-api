import mongoose, { Schema } from 'mongoose'

const ageRatingContDescSchema = new Schema(
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

const AgeRatingContDescModel = mongoose.model('AgeRatingContDesc', ageRatingContDescSchema)

export default AgeRatingContDescModel
