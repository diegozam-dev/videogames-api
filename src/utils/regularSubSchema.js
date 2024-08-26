import { Schema } from 'mongoose'

const regularSubSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      maxlenght: 50,
      required: true
    }
  },
  { versionKey: false }
)

export default regularSubSchema
