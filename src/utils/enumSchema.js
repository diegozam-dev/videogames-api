import { Schema } from 'mongoose'

const enumSchema = new Schema(
  {
    name: {
      type: String,
      maxlenght: 50,
      required: true
    }
  },
  { versionKey: false, timestamps: true }
)

export default enumSchema
