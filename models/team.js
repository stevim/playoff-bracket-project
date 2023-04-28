import mongoose from "mongoose"

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId, 
    ref: 'Profile',
    required: true,
  }
}, {
  timestamps: true,
})

const teamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId, 
    ref: 'Profile',
    required: true,
  },
  comments: [commentSchema],
}, {
    timestamps: true
})


const Team = mongoose.model('Team', teamSchema)

export {
  Team
}