import mongoose from "mongoose"

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId, ref: 'Profile'
  }
}, {
  timestamps: true,
})

const athleteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId, ref: 'Profile'
  },
  comments: [commentSchema],
}, {
    timestamps: true
})


const Athlete = mongoose.model('Athlete', athleteSchema)

export {
  Athlete
}